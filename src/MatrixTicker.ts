import config from '../matrixcnfg';


interface MatrixTickerParams {
    root?: string;
    token: string;
    reconnect?: boolean;
    max_retry?: number;
    max_delay?: number;
}

interface CustomWebSocket extends WebSocket {
    last_reconnect_interval: number | 0;
    current_reconnection_count: number;
    current_ws_url: string | '';
    read_timer: NodeJS.Timeout | 0;
    last_read: number;
    reconnect_timer: NodeJS.Timeout | 0;
    auto_reconnect: boolean;
    triggerDisconnect: () => void;
}

class MatrixTicker {
    public readonly modeFull: string;
    private readonly modeQuote: string;
    private readonly modeLTP: string;
    private ws: CustomWebSocket | 0 = 0;
    private triggers: { [key: string]: Function[] } = {
        'connect': [],
        'ticks': [],
        'disconnect': [],
        'error': [],
        'close': [],
        'reconnect': [],
        'noreconnect': [],
        'message': [],
        'order_update': []
    };
    private read_timer: NodeJS.Timeout | 0 = 0;
    private last_read: Date = new Date();
    private reconnect_timer: NodeJS.Timeout | 0 = 0;;
    private auto_reconnect: boolean = false;
    private last_reconnect_interval: number | 0 = 0;;
    private current_reconnection_count: number = 0;
    private current_ws_url: string | 0 = 0;
    private token_modes: { [key: string]: string } = {};
    private defaultReconnectMaxDelay: number = 60;
    private defaultReconnectMaxRetries: number = 50;
    private maximumReconnectMaxRetries: number = 300;
    private minimumReconnectMaxDelay: number = 5;
	private root: string;
    private params: MatrixTickerParams;
	private read_timeout: number = 2; // Change the value as needed
	private reconnect_max_tries: number = 0; // Change the value as needed
    private reconnect_max_delay: number = 0; // Change the value as needed
	

    constructor(params: MatrixTickerParams) {
        const currentRootUrl = window.location.origin;
        const modifiedOrigin = currentRootUrl.replace(/^https?:\/\//, '');
		this.root = (params as MatrixTickerParams).root || 'wss://' + modifiedOrigin + '/websocket/ws';
        this.params = params as MatrixTickerParams;
        this.modeFull = 'full';
        this.modeQuote = 'quote';
        this.modeLTP = 'ltp';
        this.autoReconnect(params.reconnect || true, params.max_retry, params.max_delay);
        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.connected = this.connected.bind(this);
        this.on = this.on.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
        this.setMode = this.setMode.bind(this);
        this.subscribe_notification = this.subscribe_notification.bind(this);
        this.close = this.close.bind(this);
        this.ws = 0;
    }

    

    public connect(): void {
		// Skip if it's already connected
		if (this.ws && (this.ws.readyState == this.ws.CONNECTING || this.ws.readyState == this.ws.OPEN)) return;
		let url;
		if (config.env == "production") {
			url = this.root + '?token=' + this.params.token;
		} else {
			url = "ws://localhost:8086/websocket/ws" + '?token=' + this.params.token;
		}
		this.ws = new WebSocket(url) as CustomWebSocket;
	
		this.ws.binaryType = 'arraybuffer';
	
		this.ws.onopen = () => {
			if (this.ws) {
				this.last_reconnect_interval = 0;
				this.current_reconnection_count = 0;
				if (!this.current_ws_url) this.current_ws_url = this.ws.url;
				this.trigger('connect');
			}
			
			if (this.read_timer) {
				clearInterval(this.read_timer);
			}
	
			this.last_read = new Date();
			this.read_timer = setInterval(() => {
				try {
					if (this.ws) {
						this.ws.send("ping");
					}
					this.last_read = new Date();
				} catch (e) {
					// Handle the error, e.g., log it or trigger an error event.
				}
				if ((new Date().getTime() - this.last_read.getTime()) / 1000 >= this.read_timeout) {

					this.current_ws_url = 0;
					if (this.ws) this.ws.close();
					if (this.read_timer) {
						clearInterval(this.read_timer);
					}
					this.triggerDisconnect();
				}
			}, (this.read_timeout) * 1000);
		};

        this.ws.onmessage = (e) => {
            this.trigger('ticks', [e.data]);
            this.last_read = new Date();
        };

        this.ws.onerror = (e) => {
            this.trigger('error', [e]);

            // Force close to avoid ghost connections
            if (this.ws && this.ws.readyState == this.ws.OPEN) this.ws.close();
        };

        this.ws.onclose = (e) => {
            this.trigger('close', [e]);

            if (this.current_ws_url && this.ws && (this.ws.url != this.current_ws_url)) return;

            this.triggerDisconnect(e);
        };
    }

	

    public disconnect(): void {
        if (this.ws && this.ws.readyState != this.ws.CLOSING && this.ws.readyState != this.ws.CLOSED) {
            this.ws.close();
        }
    }

    public connected(): boolean {
        return !!this.ws && this.ws.readyState == this.ws.OPEN;
    }

    public on(e: string, callback: Function): void {
        if (this.triggers.hasOwnProperty(e)) {
            this.triggers[e].push(callback);
        }
    }

    public subscribe(tokens: number[]): number[] {
        let tokensd = [...new Set(tokens)];
        tokensd = tokensd.slice(0, 90);
        if (tokensd.length > 0) {
            this.send({
                "type": "subscribe",
                "channels": tokensd
            });
        }
        return tokensd;
    }

    public unsubscribe(tokens: number[]): number[] {
        // if (tokens.length > 0) {
        //     this.send({'a': mUnSubscribe, 'v': tokens});
        // }
        return tokens;
    }

    public setMode(mode: string, tokens: number[]): number[] {
        // if (tokens.length > 0) {
        //     this.send({'a': mSetMode, 'v': [mode, tokens]});
        // }
        return tokens;
    }


	private autoReconnect(t: boolean, max_retry?: number, max_delay?: number): void {
        this.auto_reconnect = (t == true);
        max_retry = max_retry || this.defaultReconnectMaxRetries;
        max_delay = max_delay || this.defaultReconnectMaxDelay;

		// Set reconnect constraints
		this.reconnect_max_tries = max_retry >= this.maximumReconnectMaxRetries ? this.maximumReconnectMaxRetries : max_retry
		this.reconnect_max_delay = max_delay <= this.minimumReconnectMaxDelay ? this.minimumReconnectMaxDelay : max_delay

        // this.reconnect_max_tries = Math.min(
        //     this.defaultReconnectMaxRetries,
        //     this.maximumReconnectMaxRetries
        // );
        // this.reconnect_max_delay = Math.max(
        //     this.defaultReconnectMaxDelay,
        //     this.minimumReconnectMaxDelay
        // );
    }

	private triggerDisconnect(e?: any): void {
        this.ws = 0;
        this.trigger('disconnect', [e]);
        if (this.auto_reconnect) this.attemptReconnection();
    }


    public close(): void {
        if (this.ws && this.ws.readyState != this.ws.CLOSING && this.ws.readyState != this.ws.CLOSED) {
            this.ws.close();
            this.auto_reconnect = false;
        }
    }

    public subscribe_notification(message: string | object): void {
        try {
            if (typeof (message) === 'object') {
                message = JSON.stringify(message);
            }
            // if (this.ws && this.ws.readyState == this.ws.OPEN) {
            //     this.ws.send(message);
            // }

			 if (this.ws) {
                this.ws.send(message);
            }
			
        } catch (e) {
            if (this.ws) {
				this.ws.close();
			}
        }
    }

    // send a message via the socket
    // automatically encodes json if possible
    private send(message: any): void {
        if (!this.ws || this.ws.readyState != this.ws.OPEN) return;

        try {
            if (typeof (message) === 'object') {
                message = JSON.stringify(message);
            }
            this.ws.send(message);
        } catch (e) {
            this.ws.close();
        }
    }

    // trigger event callbacks
    private trigger(e: string, args?: any[]): void {
        if (!this.triggers[e]) return;
        for (let n = 0; n < this.triggers[e].length; n++) {
            this.triggers[e][n].apply(this.triggers[e][n], args || []);
        }
    }

    // split one long binary message into individual tick packets

    private attemptReconnection(): void {
        // Try reconnecting only so many times.
        if (this.current_reconnection_count > this.reconnect_max_tries) {
            this.trigger('noreconnect');
            process.exit(1);
        }

        if (this.current_reconnection_count > 0) {
            this.last_reconnect_interval = Math.pow(2, this.current_reconnection_count);
        } else if (!this.last_reconnect_interval) {
            this.last_reconnect_interval = 1;
        }

        if (this.last_reconnect_interval > this.reconnect_max_delay) {
            this.last_reconnect_interval = this.reconnect_max_delay;
        }

        this.current_reconnection_count++;

        this.trigger('reconnect', [this.current_reconnection_count, this.last_reconnect_interval]);

        this.reconnect_timer = setTimeout(() => {
            this.connect();
        }, this.last_reconnect_interval * 1000);
    }

	private cancelReconnection(): void {
		if (this.reconnect_timer !== 0) {
			clearTimeout(this.reconnect_timer);
			this.reconnect_timer = 0;
		}
	}

   
}

export default MatrixTicker;
