import { ref, provide, computed } from 'vue';
import { getToken } from "@/request/request";
import { defineStore } from 'pinia';
import MatrixTicker from "@/MatrixTicker";
import { ManageWebsocketResponse } from "@/request/manageResponse";

export const useTickerStore = defineStore('tickers', () => {
  const wssToken = ref("");
  let ticker: MatrixTicker | null = null;
  let wsStatus = false;
  const lastPrices = ref<Record<string, any>>({}); 
  const tickerList = ref([256265, 260105, 265]);

  const token = computed(() => getToken());

  const channel = new BroadcastChannel('my-channel');
  channel.addEventListener('message', (event) => {
    const message = event.data;
    if (message.type === 'logout') {
      stopWebSocket();
    }
  });

  function updateTickerList(data: number[]) {
    for (let i = 0; i < data.length; i++) {
      if (!(data[i] in tickerList.value)) {
        tickerList.value.push(data[i]);
      }
    }
    if (token.value && ticker !== null) {
      const items = tickerList.value;
      ticker.subscribe(items);
      ticker.setMode(ticker.modeFull, items);
    }
  }

  const onTicks = (ticks: string) => {
    const tick = JSON.parse(ticks);
    try {
      ManageWebsocketResponse(tick);
    } catch (error) {
      // Handle the error
    }
    if ("Token" in tick) {
      updateLastPrice(tick);
    }
  };

  const startWebSocket = (loggedinToken: string) => {
    if (!wsStatus) {
      console.log("Starting WebSocket connection");
      ticker = new MatrixTicker({
        token: loggedinToken,
      });
      ticker.connect();
      ticker.on("ticks", onTicks);
      ticker.on("connect", subscribe);
      wsStatus = true;
    }
  };

  const stopWebSocket = () => {
    if (ticker !== null) {
      ticker.close();
      ticker = null;
      wsStatus = false;
    }
  };

  const subscribe = () => {
    if (token.value) {
      const items = tickerList.value;
      ticker!.subscribe(items);
      ticker!.subscribe_notification({
        "type": "update",
        "channels": ["updates"]
      });
      ticker!.setMode(ticker!.modeFull, items);
    }
  };

  function updateLastPrice(data: { Token: string }) {
    const instrumentToken = data.Token;
    lastPrices.value[instrumentToken] = data;
    return lastPrices.value;
  }

  function getLastPrice(instrumentToken: string) {
    if (instrumentToken in lastPrices.value) {
      return lastPrices.value[instrumentToken].LTP;
    }
    return undefined;
  }

  provide('lastPriceStore', {
    updateLastPrice,
    getLastPrice,
    startWebSocket,
    stopWebSocket
  });

  return {
    updateLastPrice,
    getLastPrice,
    startWebSocket,
    stopWebSocket,
    updateTickerList,
    tickerList
  };
});
