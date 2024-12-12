import { ref ,watchEffect} from 'vue'
import { storeToRefs } from 'pinia'
import { defineStore } from 'pinia'
import { makeRequest, state } from '@/request/request'
import { useTickerStore } from "@/stores/matrix/ticker/ticker"
import { useStrategiesStore } from '@/stores/matrix/strategy'

export const useCardPositionsStore = defineStore('cardPositions', () => {
  const strategiesStore = useStrategiesStore()
  const { strategies } = storeToRefs(strategiesStore)
  const endpoint = 'cardPosition'
  let wait= 0
  const cardPositions: any = ref([])
  const mainCardPositions = ref<any>([])

  const tickerStore = useTickerStore();

  const getCardPositions = async () => {
    try {
      const response = await makeRequest(endpoint, 'GET', {}, {}, {},0)
      if (response.data) {
        cardPositions.value = response.data
        mainCardPositions.value = cardPositions.value
      } else {
        cardPositions.value = {}
      }
    } catch (error) {
      
    } 
    // dummy data after implment delete it 
    finally{
      cardPositions.value =   [
        {
            "month": "2024-06",
            "strategy_id": 1,
            "strategy_name": "testlocal",
            "pnl": 700
        },
        {
            "month": "2024-07",
            "strategy_id": 1,
            "strategy_name": "testlocal",
            "pnl": 100
        },
        {
            "month": "2024-07",
            "strategy_id": 6,
            "strategy_name": "delete",
            "pnl": -87.5
        }
    ]
        mainCardPositions.value = cardPositions.value
    }

  }

  interface GroupedPositions {
    [key: string]: { color: string, color2: string, pnl: number, name: string, image_url: string, script: string,date: string, positions: any }; // or [key: number]: Position[] if strategy_id is a number
  }

  function groupPositionsByStrategyId(positions: any, strategies: any) {
    const groupedPositions = {} as GroupedPositions;
  
    positions.forEach((position: any) => {
      
      const { strategy_id } = position;
      const strategy = strategies.find((s: any) => s.id === strategy_id);
                    
      
      if (!groupedPositions[strategy_id]) {
        let color = strategy.color.replace(/,[\s\d.]+[)]$/, ", 0.8)");
        groupedPositions[strategy_id] = {
          color: color,
          color2: strategy.color2,
          pnl: position.pnl,
          name: strategy.name,
          image_url: strategy.image_url,
          script: strategy.script,
          date: position.month,
          positions: [],
        };
      } else {
        groupedPositions[strategy_id].pnl += position.pnl;
      }
    //   console.log("print pnl,", position.pnl, groupedPositions[strategy_id])
      
      groupedPositions[strategy_id].positions.push(position);
    });
  
    return groupedPositions;
  }

  function computeStrategiesPositions() {
    
    if (Object.keys(cardPositions.value).length && strategies.value.length) {

      let data = groupPositionsByStrategyId(
        cardPositions.value,
        strategies.value
      );

      return data;
    } else {
      return [];
    }
  }

  watchEffect(() => {
    mainCardPositions.value = computeStrategiesPositions();
  });

  watchEffect(() => {
    if(cardPositions.value && cardPositions.value.length > 0 && strategies.value.length > 0) {
      for (let i = 0; i < cardPositions.value.length; i++) {
        const strgy = strategies.value.find(
          (s:any) => s.id === cardPositions.value[i].strategy_id
        );

        cardPositions.value[i].strategy = strgy;
      }
    }
  })

  getCardPositions()
  return {
    wait,
    state,
    endpoint,
    cardPositions,
    mainCardPositions,
    getCardPositions,
  }
})