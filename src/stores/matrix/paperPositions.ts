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

  const getPaperPositions = async () => {
    try {
      const response = await makeRequest(endpoint, 'GET', {}, {}, {},0)
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