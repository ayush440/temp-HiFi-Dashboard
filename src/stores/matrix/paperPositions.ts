import { ref ,watchEffect} from 'vue'
import { storeToRefs } from 'pinia'
import { defineStore } from 'pinia'
import { makeRequest, state } from '@/request/request'
import { useTickerStore } from "@/stores/matrix/ticker/ticker"
import { useStrategiesStore } from '@/stores/matrix/strategy'

export const usePaperPositionsStore = defineStore('paperPositions', () => {
  const strategiesStore = useStrategiesStore()
  const { strategies } = storeToRefs(strategiesStore)
  const endpoint = 'positionsPaper'
  let wait= 0
  const paperPositions: any = ref([])
  const mainPaperPositions = ref<any>([])

  const tickerStore = useTickerStore();
const mockdata = {
  "status": "success",
  "message": "The requested data is successfully retrieved",
  "data": [
      {
          "id": 287,
          "domain_id": 1,
          "strategy_id": 6,
          "tradingsymbol": "NIFTY24JUL23100CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16667906,
          "product": "MIS",
          "quantity": 25,
          "side": "BUY",
          "last_price": 1706.7,
          "buy_price": 1706.7,
          "sell_price": 1712,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 289,
          "domain_id": 1,
          "strategy_id": 6,
          "tradingsymbol": "NIFTY24JUL23100CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16667906,
          "product": "MIS",
          "quantity": 25,
          "side": "BUY",
          "last_price": 1706.7,
          "buy_price": 1706.7,
          "sell_price": 1700,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 291,
          "domain_id": 1,
          "strategy_id": 6,
          "tradingsymbol": "NIFTY24JUL23100CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16667906,
          "product": "MIS",
          "quantity": 25,
          "side": "BUY",
          "last_price": 1706.7,
          "buy_price": 1706.7,
          "sell_price": 1710,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 273,
          "domain_id": 1,
          "strategy_id": 5,
          "tradingsymbol": "NIFTY24JUL23100CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16667906,
          "product": "MIS",
          "quantity": 25,
          "side": "BUY",
          "last_price": 1706.7,
          "buy_price": 1706.7,
          "sell_price": 1706.7,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 274,
          "domain_id": 1,
          "strategy_id": 5,
          "tradingsymbol": "NIFTY24JUL23400CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16692482,
          "product": "MIS",
          "quantity": 25,
          "side": "SELL",
          "last_price": 1412,
          "buy_price": 1412,
          "sell_price": 1412,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 275,
          "domain_id": 1,
          "strategy_id": 5,
          "tradingsymbol": "NIFTY24JUL23100CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16667906,
          "product": "MIS",
          "quantity": 25,
          "side": "BUY",
          "last_price": 1706.7,
          "buy_price": 1706.7,
          "sell_price": 1706.7,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 286,
          "domain_id": 1,
          "strategy_id": 8,
          "tradingsymbol": "NIFTY24JUL23400CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16692482,
          "product": "MIS",
          "quantity": 25,
          "side": "SELL",
          "last_price": 1412,
          "buy_price": 1412,
          "sell_price": 1416,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 281,
          "domain_id": 1,
          "strategy_id": 11,
          "tradingsymbol": "NIFTY24JUL23100CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16667906,
          "product": "MIS",
          "quantity": 25,
          "side": "BUY",
          "last_price": 1706.7,
          "buy_price": 1706.7,
          "sell_price": 1706.7,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 282,
          "domain_id": 1,
          "strategy_id": 11,
          "tradingsymbol": "NIFTY24JUL23400CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16692482,
          "product": "MIS",
          "quantity": 25,
          "side": "SELL",
          "last_price": 1412,
          "buy_price": 1412,
          "sell_price": 1412,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 283,
          "domain_id": 1,
          "strategy_id": 11,
          "tradingsymbol": "NIFTY24JUL23100CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16667906,
          "product": "MIS",
          "quantity": 25,
          "side": "BUY",
          "last_price": 1706.7,
          "buy_price": 1706.7,
          "sell_price": 1720,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 284,
          "domain_id": 1,
          "strategy_id": 11,
          "tradingsymbol": "NIFTY24JUL23400CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16692482,
          "product": "MIS",
          "quantity": 25,
          "side": "SELL",
          "last_price": 1412,
          "buy_price": 1412,
          "sell_price": 1410,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 285,
          "domain_id": 1,
          "strategy_id": 11,
          "tradingsymbol": "NIFTY24JUL23100CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16667906,
          "product": "MIS",
          "quantity": 25,
          "side": "BUY",
          "last_price": 1706.7,
          "buy_price": 1706.7,
          "sell_price": 1706.7,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 367,
          "domain_id": 1,
          "strategy_id": 11,
          "tradingsymbol": "NIFTY24JUL23100CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16667906,
          "product": "MIS",
          "quantity": 25,
          "side": "BUY",
          "last_price": 1706.7,
          "buy_price": 1706.7,
          "sell_price": 1726.7,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 369,
          "domain_id": 1,
          "strategy_id": 11,
          "tradingsymbol": "NIFTY24JUL23100CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16667906,
          "product": "MIS",
          "quantity": 25,
          "side": "BUY",
          "last_price": 1706.7,
          "buy_price": 1706.7,
          "sell_price": 2706.7,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 267,
          "domain_id": 1,
          "strategy_id": 4,
          "tradingsymbol": "NIFTY24JUL23100CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16667906,
          "product": "MIS",
          "quantity": 25,
          "side": "BUY",
          "last_price": 1706.7,
          "buy_price": 1706.7,
          "sell_price": 1706.7,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 268,
          "domain_id": 1,
          "strategy_id": 4,
          "tradingsymbol": "NIFTY24JUL23400CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16692482,
          "product": "MIS",
          "quantity": 25,
          "side": "SELL",
          "last_price": 1412,
          "buy_price": 1412,
          "sell_price": 1412,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 269,
          "domain_id": 1,
          "strategy_id": 4,
          "tradingsymbol": "NIFTY24JUL23100CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16667906,
          "product": "MIS",
          "quantity": 25,
          "side": "BUY",
          "last_price": 1706.7,
          "buy_price": 1706.7,
          "sell_price": 1706.7,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 270,
          "domain_id": 1,
          "strategy_id": 4,
          "tradingsymbol": "NIFTY24JUL23400CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16692482,
          "product": "MIS",
          "quantity": 25,
          "side": "SELL",
          "last_price": 1412,
          "buy_price": 1412,
          "sell_price": 1412,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:49:35Z"
      },
      {
          "id": 271,
          "domain_id": 1,
          "strategy_id": 4,
          "tradingsymbol": "NIFTY24JUL23100CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16667906,
          "product": "MIS",
          "quantity": 25,
          "side": "BUY",
          "last_price": 1706.7,
          "buy_price": 1706.7,
          "sell_price": 1706.7,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 272,
          "domain_id": 1,
          "strategy_id": 4,
          "tradingsymbol": "NIFTY24JUL23400CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16692482,
          "product": "MIS",
          "quantity": 25,
          "side": "SELL",
          "last_price": 1412,
          "buy_price": 1412,
          "sell_price": 1412,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 276,
          "domain_id": 1,
          "strategy_id": 15,
          "tradingsymbol": "NIFTY24JUL23400CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16692482,
          "product": "MIS",
          "quantity": 25,
          "side": "SELL",
          "last_price": 1412,
          "buy_price": 1412,
          "sell_price": 1412,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 277,
          "domain_id": 1,
          "strategy_id": 15,
          "tradingsymbol": "NIFTY24JUL23100CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16667906,
          "product": "MIS",
          "quantity": 25,
          "side": "BUY",
          "last_price": 1706.7,
          "buy_price": 1706.7,
          "sell_price": 1706.7,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 278,
          "domain_id": 1,
          "strategy_id": 15,
          "tradingsymbol": "NIFTY24JUL23400CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16692482,
          "product": "MIS",
          "quantity": 25,
          "side": "SELL",
          "last_price": 1412,
          "buy_price": 1412,
          "sell_price": 1412,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 279,
          "domain_id": 1,
          "strategy_id": 15,
          "tradingsymbol": "NIFTY24JUL23100CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16667906,
          "product": "MIS",
          "quantity": 25,
          "side": "BUY",
          "last_price": 1706.7,
          "buy_price": 1706.7,
          "sell_price": 1706.7,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 280,
          "domain_id": 1,
          "strategy_id": 15,
          "tradingsymbol": "NIFTY24JUL23400CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16692482,
          "product": "MIS",
          "quantity": 25,
          "side": "SELL",
          "last_price": 1412,
          "buy_price": 1412,
          "sell_price": 1412,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 288,
          "domain_id": 1,
          "strategy_id": 10,
          "tradingsymbol": "NIFTY24JUL23400CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16692482,
          "product": "MIS",
          "quantity": 25,
          "side": "SELL",
          "last_price": 1412,
          "buy_price": 1412,
          "sell_price": 1400,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 290,
          "domain_id": 1,
          "strategy_id": 10,
          "tradingsymbol": "NIFTY24JUL28400CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16692482,
          "product": "MIS",
          "quantity": 25,
          "side": "SELL",
          "last_price": 1412,
          "buy_price": 1412,
          "sell_price": 1414,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 292,
          "domain_id": 1,
          "strategy_id": 10,
          "tradingsymbol": "NIFTY24JUL23400CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16692482,
          "product": "MIS",
          "quantity": 25,
          "side": "SELL",
          "last_price": 1412,
          "buy_price": 0,
          "sell_price": 1412,
          "status": "OPEN",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 368,
          "domain_id": 1,
          "strategy_id": 10,
          "tradingsymbol": "NIFTY24JUL23400CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16692482,
          "product": "MIS",
          "quantity": 25,
          "side": "SELL",
          "last_price": 1412,
          "buy_price": 1412,
          "sell_price": 1412,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      },
      {
          "id": 370,
          "domain_id": 1,
          "strategy_id": 10,
          "tradingsymbol": "NIFTY24JUL23400CE",
          "strategy_type": 0,
          "exchange": "NFO",
          "instrument_token": 16692482,
          "product": "MIS",
          "quantity": 25,
          "side": "SELL",
          "last_price": 1412,
          "buy_price": 1412,
          "sell_price": 1412,
          "status": "CLOSED",
          "message": "",
          "is_visible": false,
          "created_at": "2024-08-30T17:39:29Z",
          "updated_at": "2024-08-30T16:50:05Z"
      }
  ]
}
  const getPaperPositions = async () => {
    try {
      const response = await mockdata
      if (response.data) {
        paperPositions.value = response.data
        mainPaperPositions.value = paperPositions.value
        
        let tokensList=[]
        if(paperPositions.value && paperPositions.value.length){
          for(let i=0;i<paperPositions.value.length;i++){
            tokensList.push(paperPositions.value[i].instrument_token)
          }
          tickerStore.updateTickerList(tokensList)
        }
      } else {
        paperPositions.value = {}
      }
    } catch (error) {
      
    }
  }

  interface GroupedPositions {
    [key: string]: { color: string, color2: string, pnl: number, name: string, image_url: string, script: string, positions: any }; // or [key: number]: Position[] if strategy_id is a number
  }

  function groupPositionsByStrategyId(positions: any, strategies: any) {
    const groupedPositions = {} as GroupedPositions;
  
    positions.forEach((position: any) => {
      
      const { strategy_id } = position;
      const strategy = strategies.find((s: any) => s.id === strategy_id);

      position.last_price = updatePaperPositionLastPrice(position) || 0;
  
      let pnl =
        position.status === "CLOSED"
          ? (position.sell_price - position.buy_price) * position.quantity
          : position.status === "OPEN"
          ? position.side === "BUY"
            ? (position.last_price - position.buy_price) * position.quantity
            : (position.sell_price - position.last_price) * position.quantity
          : 0;
      position.pnl = pnl  
          
      if (!groupedPositions[strategy_id]) {
        let color = strategy.color.replace(/,[\s\d.]+[)]$/, ", 0.8)");
        groupedPositions[strategy_id] = {
          color: color,
          color2: strategy.color2,
          pnl: pnl,
          name: strategy.name,
          image_url: strategy.image_url,
          script: strategy.script,
          positions: [],
        };
      } else {
        groupedPositions[strategy_id].pnl += pnl;
      }
      
      groupedPositions[strategy_id].positions.push(position);
    });
  
    return groupedPositions;
  }

  function computeStrategiesPositions() {
    
    if (Object.keys(paperPositions.value).length && strategies.value.length) {

      let data = groupPositionsByStrategyId(
        paperPositions.value,
        strategies.value
      );
      const chartDataArray = [];
      for (const id in data) {
        chartDataArray.push({
          label: data[id].name,
          value: data[id].pnl,
        });
      }

      return data; // Assuming the intention was to return 'data'. If you intended to return 'chartDataArray', adjust accordingly.
    } else {
      return [];
    }
  }

  watchEffect(() => {
    mainPaperPositions.value = computeStrategiesPositions();
  });

  watchEffect(() => {
    if(paperPositions.value && paperPositions.value.length > 0 && strategies.value.length > 0) {
      for (let i = 0; i < paperPositions.value.length; i++) {
        const strgy = strategies.value.find(
          (s:any) => s.id === paperPositions.value[i].strategy_id
        );

        paperPositions.value[i].strategy = strgy;
      }
    }
  })


  // Other store actions and properties here...
  function updatePaperPositionLastPrice (data: any) {
    // paperPositions.value.forEach((position: any) => {
    //   if (position.instrument_token === data.instrument_token) {
    //     position.last_price = data.last_price;
    //   }
    // });
    // return
    const newTick = tickerStore.getLastPrice(data.instrument_token);
    return newTick || data.last_price;
  };

  getPaperPositions()
  return {
    wait,
    state,
    endpoint,
    paperPositions,
    mainPaperPositions,
    getPaperPositions,
    updatePaperPositionLastPrice
  }
})