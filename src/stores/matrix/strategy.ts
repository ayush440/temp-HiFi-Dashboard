import { ref } from 'vue'
import { defineStore } from 'pinia'
import { makeRequest, state } from '@/request/request'

export const useStrategiesStore = defineStore('strategies', () => {
  const endpoint = 'plan_strategy'
  const wait =0
  const strategies = ref<any>([])
  const plans = ref<any>([])
  const stratgyJoinedPlans = ref([]) 
  const showMessage = ref<boolean>(false)
  const message = ref<string>('')
  
  const strategyName =ref<any[]>([]) 


  const getStrategies = async () => {
    // const response = await makeRequest(endpoint, 'GET', {}, {}, { }, wait)
    const response = {
      "status": "success",
      "message": "Plans fetched successfully",
      "data": {
          "strategies": [
              {
                  "id": 4,
                  "name": "DOMAIN PRICE ACTION",
                  "position_status": 0,
                  "image_url": "CodesandboxIcon",
                  "script": "BANKNIFTY",
                  "capital_required": "15K",
                  "risk": "HIGH",
                  "message": "The Domain Price Action strategy is a dynamic approach centred around time and price crossovers, leveraging price patterns within specific time periods.",
                  "data_url": "/strategies/info/4",
                  "color": "rgba(103, 173, 46, 0.9)",
                  "expiry_date": "2024-12-28",
                  "created_at": "2023-11-01T12:00:00Z",
                  "updated_at": "2024-08-20T09:42:13Z"
              },
              {
                  "id": 5,
                  "name": "DOMAIN TREND",
                  "position_status": 1,
                  "image_url": "CodesandboxIcon",
                  "script": "NIFTY",
                  "capital_required": "15K",
                  "risk": "HIGH",
                  "message": "The Domain Trend strategy is a specialised approach designed to capitalise on trending market conditions.",
                  "data_url": "/strategies/info/5",
                  "color": "rgba(103, 173, 122, 0.9)",
                  "expiry_date": "2024-12-28",
                  "created_at": "2023-11-01T12:00:00Z",
                  "updated_at": "2024-07-16T12:00:33Z"
              },
              {
                  "id": 6,
                  "name": "DOMAIN TREND",
                  "position_status": 0,
                  "image_url": "CodesandboxIcon",
                  "script": "BANKNIFTY",
                  "capital_required": "15K",
                  "risk": "HIGH",
                  "message": "The Domain Trend strategy is a specialised approach designed to capitalise on trending market conditions.",
                  "data_url": "/strategies/info/6",
                  "color": "rgba(103, 74, 122, 0.67)",
                  "expiry_date": "2024-12-28",
                  "created_at": "2023-11-01T12:00:00Z",
                  "updated_at": "2024-07-16T11:59:46Z"
              },
              {
                  "id": 7,
                  "name": "DOMAIN RANGE BREAKOUT",
                  "position_status": 1,
                  "image_url": "CodesandboxIcon",
                  "script": "NIFTY",
                  "capital_required": "15K",
                  "risk": "HIGH",
                  "message": "The Domain Range Breakout strategy is a dynamic trading approach that combines trend identification with strategic entry points based on significant market levels.",
                  "data_url": "/strategies/info/7",
                  "color": "rgba(234, 74, 122, 0.67)",
                  "expiry_date": "2024-12-28",
                  "created_at": "2023-11-01T12:00:00Z",
                  "updated_at": "2024-07-31T14:49:10Z"
              },
              {
                  "id": 8,
                  "name": "DOMAIN RANGE BREAKOUT",
                  "position_status": 1,
                  "image_url": "CodesandboxIcon",
                  "script": "BANKNIFTY",
                  "capital_required": "15K",
                  "risk": "HIGH",
                  "message": "The Domain Range Breakout strategy is a dynamic trading approach that combines trend identification with strategic entry points based on significant market levels.",
                  "data_url": "/strategies/info/8",
                  "color": "rgba(90, 273, 146, 0.9)",
                  "expiry_date": "2024-12-28",
                  "created_at": "2023-11-01T12:00:00Z",
                  "updated_at": "2024-04-22T17:00:07Z"
              },
              {
                  "id": 9,
                  "name": "DOMAIN OCILLATOR",
                  "position_status": 0,
                  "image_url": "CodesandboxIcon",
                  "script": "NIFTY",
                  "capital_required": "15K",
                  "risk": "HIGH",
                  "message": "The Domain Range Breakout strategy is a dynamic trading approach that combines trend identification with strategic entry points based on significant market levels.",
                  "data_url": "/strategies/info/7",
                  "color": "rgba(234, 74, 122, 0.67)",
                  "expiry_date": "2024-12-28",
                  "created_at": "2023-11-01T12:00:00Z",
                  "updated_at": "2024-04-22T17:00:07Z"
              },
              {
                  "id": 10,
                  "name": "DOMAIN OCILLATOR",
                  "position_status": 1,
                  "image_url": "CodesandboxIcon",
                  "script": "BANKNIFTY",
                  "capital_required": "15K",
                  "risk": "HIGH",
                  "message": "The Domain Range Breakout strategy is a dynamic trading approach that combines trend identification with strategic entry points based on significant market levels.",
                  "data_url": "/strategies/info/8",
                  "color": "rgba(90, 273, 146, 0.9)",
                  "expiry_date": "2024-12-28",
                  "created_at": "2023-11-01T12:00:00Z",
                  "updated_at": "2024-07-08T11:52:45Z"
              },
              {
                  "id": 11,
                  "name": "Example Strategy",
                  "position_status": 0,
                  "image_url": "CodesandboxIcon",
                  "script": "BANKNIFTY",
                  "capital_required": "15K",
                  "risk": "HIGH",
                  "message": "OK",
                  "data_url": "",
                  "color": "rgba(167, 93, 106, 0.8)",
                  "expiry_date": "2024-12-28",
                  "created_at": "2024-04-10T10:17:32Z",
                  "updated_at": "2024-04-22T17:00:07Z"
              },
              {
                  "id": 12,
                  "name": "Example Strategy",
                  "position_status": 0,
                  "image_url": "CodesandboxIcon",
                  "script": "BANKNIFTY",
                  "capital_required": "15K",
                  "risk": "HIGH",
                  "message": "OK",
                  "data_url": "",
                  "color": "rgba(159, 219, 247, 0.8)",
                  "expiry_date": "2024-12-28",
                  "created_at": "2024-04-10T10:19:15Z",
                  "updated_at": "2024-04-22T17:00:07Z"
              },
              {
                  "id": 13,
                  "name": "kuldeep 3144",
                  "position_status": 0,
                  "image_url": "FilesIcon",
                  "script": "NIFTY",
                  "capital_required": "15K",
                  "risk": "HIGH",
                  "message": "OK",
                  "data_url": "",
                  "color": "rgba(183, 183, 252, 0.8)",
                  "expiry_date": "2024-12-28",
                  "created_at": "2024-04-10T13:34:57Z",
                  "updated_at": "2024-08-23T13:56:23Z"
              },
              {
                  "id": 14,
                  "name": "Example Strategy12",
                  "position_status": 0,
                  "image_url": "MasterOrderIcon",
                  "script": "NIFTY",
                  "capital_required": "15K",
                  "risk": "HIGH",
                  "message": "OK",
                  "data_url": "",
                  "color": "rgba(102, 235, 178, 0.8)",
                  "expiry_date": "2024-12-28",
                  "created_at": "2024-04-11T16:17:11Z",
                  "updated_at": "2024-06-27T16:47:57Z"
              },
              {
                  "id": 15,
                  "name": "kuldeepmnewe we",
                  "position_status": 0,
                  "image_url": "ActiveAlertIcon",
                  "script": "NIFTY",
                  "capital_required": "15K",
                  "risk": "HIGH",
                  "message": "OK",
                  "data_url": "",
                  "color": "rgba(194, 108, 106, 0.8)",
                  "expiry_date": "2024-12-28",
                  "created_at": "2024-04-13T10:13:28Z",
                  "updated_at": "2024-06-27T16:47:53Z"
              },
              {
                  "id": 16,
                  "name": "New Strg",
                  "position_status": 0,
                  "image_url": "MasterOrderIcon",
                  "script": "BANKNIFTY",
                  "capital_required": "15K",
                  "risk": "HIGH",
                  "message": "OK",
                  "data_url": "",
                  "color": "rgba(137, 137, 216, 0.8)",
                  "expiry_date": "2024-06-27",
                  "created_at": "2024-06-21T12:59:06Z",
                  "updated_at": "2024-06-27T16:46:24Z"
              },
              {
                  "id": 17,
                  "name": "kuldeepsawr",
                  "position_status": 0,
                  "image_url": "AlertTriangleIcon",
                  "script": "NIFTY",
                  "capital_required": "33k",
                  "risk": "HIGH",
                  "message": "OK",
                  "data_url": "",
                  "color": "rgba(235, 118, 137, 0.8)",
                  "expiry_date": "2024-06-18",
                  "created_at": "2024-06-21T13:18:25Z",
                  "updated_at": "2024-06-27T16:47:40Z"
              },
              {
                  "id": 18,
                  "name": "kuldeepsawrdr",
                  "position_status": 0,
                  "image_url": "CreditCardIcon",
                  "script": "BANKNIFTY",
                  "capital_required": "33k",
                  "risk": "HIGH",
                  "message": "OK",
                  "data_url": "",
                  "color": "rgba(227, 144, 53, 0.8)",
                  "expiry_date": "2024-07-06",
                  "created_at": "2024-06-21T13:19:20Z",
                  "updated_at": "2024-06-27T16:47:37Z"
              },
              {
                  "id": 19,
                  "name": "kuldeepsawrdr",
                  "position_status": 0,
                  "image_url": "AlertTriangleIcon",
                  "script": "NIFTY",
                  "capital_required": "33k",
                  "risk": "HIGH",
                  "message": "OK",
                  "data_url": "",
                  "color": "rgba(147, 77, 196, 0.8)",
                  "expiry_date": "2024-06-18",
                  "created_at": "2024-06-21T13:22:47Z",
                  "updated_at": "2024-07-08T09:53:23Z"
              }
          ],
          "plans": [
              {
                  "id": 1,
                  "domain_id": 0,
                  "name": "Essential Nifty",
                  "max_qty": 50,
                  "max_sl_tgt": 0,
                  "max_deployment": 5,
                  "max_indicator_access": 5,
                  "type": "public",
                  "max_brokers": 1,
                  "icon": "SunIcon",
                  "strategies": {
                      "10": {
                          "max_lots": 5
                      },
                      "12": {
                          "max_lots": 400
                      },
                      "13": {
                          "max_lots": 21
                      },
                      "15": {
                          "max_lots": 21
                      },
                      "18": {
                          "max_lots": 22
                      },
                      "4": {
                          "max_lots": 500
                      },
                      "5": {
                          "max_lots": 0
                      },
                      "6": {
                          "max_lots": 1
                      },
                      "7": {
                          "max_lots": 1
                      },
                      "8": {
                          "max_lots": 430
                      }
                  },
                  "invoice_item": null,
                  "offers": null
              },
              {
                  "id": 2,
                  "domain_id": 0,
                  "name": "Essential Banknifty",
                  "max_qty": 50,
                  "max_sl_tgt": 0,
                  "max_deployment": 5,
                  "max_indicator_access": 5,
                  "type": "public",
                  "max_brokers": 1,
                  "icon": "TagIcon",
                  "strategies": {
                      "6": {
                          "max_lots": 500
                      }
                  },
                  "invoice_item": null,
                  "offers": {
                      "offer": {
                          "created_at": "2024-01-03T13:03:24Z",
                          "created_by": 1,
                          "discount_amount": 646,
                          "discount_percent": 46,
                          "domain_id": 1,
                          "id": 1,
                          "message": "46",
                          "offer_uuid": "LZGBRIRG",
                          "plan_id": 2,
                          "updated_at": "2024-07-18T13:32:02Z",
                          "valid_till": "2024-11-07T00:00:00Z"
                      },
                      "type": "general"
                  }
              },
              {
                  "id": 5,
                  "domain_id": 0,
                  "name": "Monthly",
                  "max_qty": 900,
                  "max_sl_tgt": 0,
                  "max_deployment": 20,
                  "max_indicator_access": 20,
                  "type": "public",
                  "max_brokers": 20,
                  "icon": "LoaderIcon",
                  "strategies": {
                      "12": {
                          "max_lots": 1
                      },
                      "13": {
                          "max_lots": 500
                      },
                      "14": {
                          "max_lots": 500
                      },
                      "6": {
                          "max_lots": 500
                      },
                      "7": {
                          "max_lots": 500
                      },
                      "8": {
                          "max_lots": 500
                      }
                  },
                  "invoice_item": [
                      {
                          "id": 2,
                          "domain_id": 1,
                          "plan_id": 5,
                          "item_name": "plan 5 item",
                          "item_description": "Plan 5 me",
                          "quantity": 42,
                          "rate": 12,
                          "amount": 504,
                          "created_at": "2024-04-08T14:51:37Z",
                          "updated_at": "2024-04-08T14:51:37Z"
                      },
                      {
                          "id": 4,
                          "domain_id": 1,
                          "plan_id": 5,
                          "item_name": "plan 6 itemdssget",
                          "item_description": "33",
                          "quantity": 3,
                          "rate": 32,
                          "amount": 96,
                          "created_at": "2024-06-21T13:16:36Z",
                          "updated_at": "2024-06-21T13:16:36Z"
                      }
                  ],
                  "offers": {
                      "offer": {
                          "created_at": "2024-06-21T13:16:51Z",
                          "created_by": 1,
                          "discount_amount": 3,
                          "discount_percent": 3,
                          "domain_id": 1,
                          "id": 5,
                          "message": "OK",
                          "offer_uuid": "QPEMBFBT",
                          "plan_id": 5,
                          "updated_at": "2024-07-18T13:35:05Z",
                          "valid_till": "2024-09-04T00:00:00Z"
                      },
                      "type": "general"
                  }
              },
              {
                  "id": 6,
                  "domain_id": 0,
                  "name": "Half Yearly",
                  "max_qty": 900,
                  "max_sl_tgt": 0,
                  "max_deployment": 20,
                  "max_indicator_access": 20,
                  "type": "public",
                  "max_brokers": 20,
                  "icon": "LoaderIcon",
                  "strategies": {
                      "11": {
                          "max_lots": 1
                      },
                      "13": {
                          "max_lots": 1
                      },
                      "5": {
                          "max_lots": 1
                      },
                      "7": {
                          "max_lots": 1
                      }
                  },
                  "invoice_item": [
                      {
                          "id": 1,
                          "domain_id": 1,
                          "plan_id": 6,
                          "item_name": "plan 6 item",
                          "item_description": "Plan 6 me",
                          "quantity": 42,
                          "rate": 12,
                          "amount": 504,
                          "created_at": "2024-04-08T14:51:21Z",
                          "updated_at": "2024-04-08T14:51:21Z"
                      }
                  ],
                  "offers": {
                      "offer": {
                          "created_at": "2024-05-25T11:40:05Z",
                          "created_by": 1,
                          "discount_amount": 21,
                          "discount_percent": 12,
                          "domain_id": 1,
                          "id": 3,
                          "message": "tdhc v",
                          "offer_uuid": "7ECAL19C",
                          "plan_id": 6,
                          "updated_at": "2024-08-14T13:56:41Z",
                          "valid_till": "2024-10-18T00:00:00Z"
                      },
                      "type": "general"
                  }
              },
              {
                  "id": 8,
                  "domain_id": 0,
                  "name": "testpa",
                  "max_qty": 2,
                  "max_sl_tgt": 0,
                  "max_deployment": 3,
                  "max_indicator_access": 0,
                  "type": "public",
                  "max_brokers": 10,
                  "icon": "SunIcon",
                  "strategies": {},
                  "invoice_item": null,
                  "offers": {
                      "offer": {
                          "created_at": "2024-06-07T10:11:46Z",
                          "created_by": 1,
                          "discount_amount": 1,
                          "discount_percent": 1,
                          "domain_id": 1,
                          "id": 4,
                          "message": "1",
                          "offer_uuid": "07FOI8T9",
                          "plan_id": 8,
                          "updated_at": "2024-06-07T10:11:46Z",
                          "valid_till": "2024-06-14T00:00:00Z"
                      },
                      "type": "general"
                  }
              },
              {
                  "id": 10,
                  "domain_id": 0,
                  "name": "Example Plan",
                  "max_qty": 1,
                  "max_sl_tgt": 1,
                  "max_deployment": 1,
                  "max_indicator_access": 1,
                  "type": "public",
                  "max_brokers": 1,
                  "icon": "ClockIcon",
                  "strategies": {},
                  "invoice_item": [
                      {
                          "id": 3,
                          "domain_id": 1,
                          "plan_id": 10,
                          "item_name": "card365 exp",
                          "item_description": "card exp",
                          "quantity": 2,
                          "rate": 11,
                          "amount": 22,
                          "created_at": "2024-06-13T11:23:30Z",
                          "updated_at": "2024-06-13T11:23:30Z"
                      }
                  ],
                  "offers": null
              },
              {
                  "id": 11,
                  "domain_id": 0,
                  "name": "new plan",
                  "max_qty": 33,
                  "max_sl_tgt": 0,
                  "max_deployment": 3,
                  "max_indicator_access": 0,
                  "type": "public",
                  "max_brokers": 3,
                  "icon": "GoogleIcon",
                  "strategies": {},
                  "invoice_item": null,
                  "offers": null
              },
              {
                  "id": 12,
                  "domain_id": 0,
                  "name": "kuldeep plan  w",
                  "max_qty": 1,
                  "max_sl_tgt": 0,
                  "max_deployment": 2,
                  "max_indicator_access": 0,
                  "type": "public",
                  "max_brokers": 1,
                  "icon": "GoogleColorIcon",
                  "strategies": {},
                  "invoice_item": [
                      {
                          "id": 5,
                          "domain_id": 1,
                          "plan_id": 12,
                          "item_name": "Plan 12 Item",
                          "item_description": "Not to much",
                          "quantity": 2,
                          "rate": 3244,
                          "amount": 6488,
                          "created_at": "2024-07-18T13:37:48Z",
                          "updated_at": "2024-07-18T13:37:48Z"
                      },
                      {
                          "id": 7,
                          "domain_id": 1,
                          "plan_id": 12,
                          "item_name": "Plan 12 Item",
                          "item_description": "Not to much",
                          "quantity": 2,
                          "rate": 3244,
                          "amount": 6488,
                          "created_at": "2024-07-31T17:42:07Z",
                          "updated_at": "2024-07-31T17:42:07Z"
                      },
                      {
                          "id": 8,
                          "domain_id": 1,
                          "plan_id": 12,
                          "item_name": "Plan 12 Item",
                          "item_description": "Not to much",
                          "quantity": 2,
                          "rate": 3244,
                          "amount": 6488,
                          "created_at": "2024-08-20T09:45:18Z",
                          "updated_at": "2024-08-20T09:45:18Z"
                      },
                      {
                          "id": 9,
                          "domain_id": 1,
                          "plan_id": 12,
                          "item_name": "Item 11",
                          "item_description": "Plan 11 Invoice Item",
                          "quantity": 2,
                          "rate": 12,
                          "amount": 2421,
                          "created_at": "2024-08-28T10:57:02Z",
                          "updated_at": "2024-08-28T10:57:02Z"
                      }
                  ],
                  "offers": {
                      "offer": {
                          "created_at": "2024-07-18T13:36:51Z",
                          "created_by": 1,
                          "discount_amount": 340,
                          "discount_percent": 23,
                          "domain_id": 1,
                          "id": 6,
                          "message": "Happy",
                          "offer_uuid": "EUMFUX48",
                          "plan_id": 12,
                          "updated_at": "2024-08-28T10:51:40Z",
                          "valid_till": "2024-10-11T00:00:00Z"
                      },
                      "type": "general"
                  }
              },
              {
                  "id": 13,
                  "domain_id": 0,
                  "name": "kuldeep plan  w2",
                  "max_qty": 10,
                  "max_sl_tgt": 0,
                  "max_deployment": 4,
                  "max_indicator_access": 0,
                  "type": "public",
                  "max_brokers": 1,
                  "icon": "FilesIcon",
                  "strategies": {},
                  "invoice_item": null,
                  "offers": null
              },
              {
                  "id": 15,
                  "domain_id": 0,
                  "name": "Hello Test",
                  "max_qty": 2,
                  "max_sl_tgt": 0,
                  "max_deployment": 2,
                  "max_indicator_access": 0,
                  "type": "public",
                  "max_brokers": 1,
                  "icon": "EyeOffIcon",
                  "strategies": {},
                  "invoice_item": [
                      {
                          "id": 6,
                          "domain_id": 1,
                          "plan_id": 15,
                          "item_name": "Plan 15 Hello Test",
                          "item_description": "Not to much",
                          "quantity": 5,
                          "rate": 1231,
                          "amount": 6155,
                          "created_at": "2024-07-18T13:41:02Z",
                          "updated_at": "2024-07-18T13:41:02Z"
                      }
                  ],
                  "offers": null
              },
              {
                  "id": 4,
                  "domain_id": 0,
                  "name": "Elite",
                  "max_qty": 900,
                  "max_sl_tgt": 0,
                  "max_deployment": 20,
                  "max_indicator_access": 20,
                  "type": "private",
                  "max_brokers": 10,
                  "icon": "SunriseIcon",
                  "strategies": {
                      "10": {
                          "max_lots": 1
                      },
                      "11": {
                          "max_lots": 0
                      },
                      "12": {
                          "max_lots": 1
                      },
                      "15": {
                          "max_lots": 1
                      },
                      "4": {
                          "max_lots": 0
                      },
                      "5": {
                          "max_lots": 100
                      },
                      "6": {
                          "max_lots": 500
                      },
                      "7": {
                          "max_lots": 500
                      },
                      "8": {
                          "max_lots": 50
                      }
                  },
                  "invoice_item": null,
                  "offers": null
              }
          ],
          "strategy_joined": [
              {
                  "id": 106,
                  "broker_id": 2,
                  "strategy_id": 12,
                  "domain_id": 1,
                  "lots": 2,
                  "re_entry": 2,
                  "re_entry_triggered": 0,
                  "is_active": true,
                  "created_at": "2024-08-30T09:13:54Z",
                  "updated_at": "2024-08-30T09:13:54Z"
              },
              {
                  "id": 110,
                  "broker_id": 7,
                  "strategy_id": 12,
                  "domain_id": 1,
                  "lots": 1,
                  "re_entry": 1,
                  "re_entry_triggered": 0,
                  "is_active": false,
                  "created_at": "2024-08-30T09:13:54Z",
                  "updated_at": "2024-08-30T09:13:54Z"
              },
              {
                  "id": 113,
                  "broker_id": 34,
                  "strategy_id": 12,
                  "domain_id": 1,
                  "lots": 1,
                  "re_entry": 1,
                  "re_entry_triggered": 0,
                  "is_active": false,
                  "created_at": "2024-08-30T09:13:54Z",
                  "updated_at": "2024-08-30T09:13:54Z"
              },
              {
                  "id": 114,
                  "broker_id": 37,
                  "strategy_id": 12,
                  "domain_id": 1,
                  "lots": 1,
                  "re_entry": 1,
                  "re_entry_triggered": 0,
                  "is_active": false,
                  "created_at": "2024-08-30T09:13:54Z",
                  "updated_at": "2024-08-30T09:13:54Z"
              },
              {
                  "id": 115,
                  "broker_id": 2,
                  "strategy_id": 7,
                  "domain_id": 1,
                  "lots": 1,
                  "re_entry": 1,
                  "re_entry_triggered": 0,
                  "is_active": false,
                  "created_at": "2024-08-30T09:13:54Z",
                  "updated_at": "2024-08-30T09:13:54Z"
              },
              {
                  "id": 116,
                  "broker_id": 3,
                  "strategy_id": 7,
                  "domain_id": 1,
                  "lots": 1,
                  "re_entry": 1,
                  "re_entry_triggered": 0,
                  "is_active": false,
                  "created_at": "2024-08-30T09:13:54Z",
                  "updated_at": "2024-08-30T09:13:54Z"
              },
              {
                  "id": 118,
                  "broker_id": 6,
                  "strategy_id": 7,
                  "domain_id": 1,
                  "lots": 1,
                  "re_entry": 1,
                  "re_entry_triggered": 0,
                  "is_active": true,
                  "created_at": "2024-08-30T09:13:54Z",
                  "updated_at": "2024-08-30T09:13:54Z"
              },
              {
                  "id": 119,
                  "broker_id": 7,
                  "strategy_id": 7,
                  "domain_id": 1,
                  "lots": 1,
                  "re_entry": 1,
                  "re_entry_triggered": 0,
                  "is_active": false,
                  "created_at": "2024-08-30T09:13:54Z",
                  "updated_at": "2024-08-30T09:13:54Z"
              },
              {
                  "id": 120,
                  "broker_id": 25,
                  "strategy_id": 7,
                  "domain_id": 1,
                  "lots": 1,
                  "re_entry": 1,
                  "re_entry_triggered": 0,
                  "is_active": false,
                  "created_at": "2024-08-30T09:13:54Z",
                  "updated_at": "2024-08-30T09:13:54Z"
              },
              {
                  "id": 121,
                  "broker_id": 34,
                  "strategy_id": 7,
                  "domain_id": 1,
                  "lots": 1,
                  "re_entry": 1,
                  "re_entry_triggered": 0,
                  "is_active": false,
                  "created_at": "2024-08-30T09:13:54Z",
                  "updated_at": "2024-08-30T09:13:54Z"
              },
              {
                  "id": 122,
                  "broker_id": 37,
                  "strategy_id": 7,
                  "domain_id": 1,
                  "lots": 1,
                  "re_entry": 1,
                  "re_entry_triggered": 0,
                  "is_active": false,
                  "created_at": "2024-08-30T09:13:54Z",
                  "updated_at": "2024-08-30T09:13:54Z"
              }
          ]
      }
  }



    try {
      if(response.data) {
        strategies.value = response.data.strategies.sort((a: any, b: any) => b.id - a.id) || []
        plans.value = response.data.plans || []
        stratgyJoinedPlans.value = response.data.strategy_joined || []
      }
    } catch (error) {
      throw error
    }
  }

  const getStrategiesById = async (id: number) => {
    return strategies.value.find((strategy: any) => strategy.id === id); 
  }

  const findStrategyById = (id: number) => {
    return strategies.value.find((strategy: any) => strategy.id === id);
};
  
  getStrategies()

  return {
    strategies,
    state,
    plans,
    stratgyJoinedPlans,
    getStrategies,
    getStrategiesById,
    findStrategyById,
    endpoint,
    showMessage,
    message,
    strategyName
        
  }
})
