import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state: {
      params: {
        hoursPerMonth: 151.67,
        wageCosts: 0.23,
        weeklyHoursThresholdOptions: [35, 37.5, 38, 38.5, 39],
        weeklyHoursSurchargeOptions: [10, 15, 20, 25, 30, 35, 40, 45, 50],
        primeOptions: [
          "dayly",
          "weekly",
          "monthly"
        ]
      },
      userInputs: {
        rate: null,
        weeklyHours: 35,
        weeklyHoursThreshold: 35,
        weeklyHoursSurcharge: 25,
        isThirteenthMonth: false,
        isTicket: false,
        isPrime: false,
        primes: [
          {
            type: 0,
            amount: 0
          },
          {
            type: 0,
            amount: 0
          },
        ],
        ticketAmount: 0,
      }
    },
    mutations: {
      minimumWage: (state) => {
        console.log('process set rate to 9.76')
        state.userInputs.rate = 9.76
      },
      addItem: (state) => {
        console.log('process adding prime')
        state.userInputs.primes.push({
          type: 0,
          amount: 0
        })
      },
      toogleSwitch: (state, payload) => {
        console.log("process switch " + payload + " to " + !state.userInputs[payload])
        state.userInputs[payload] = !state.userInputs[payload]
      },
      updateInput: (state, payload) => {
        console.log("proceed update input " + payload[0] + " to " + payload[1])
        if (payload[0].includes("primes")) {
          var lastChart = payload[0].charAt(payload[0].length - 1)
          state.userInputs.primes[lastChart].amount = Number(payload[1])
        }
        else {
          state.userInputs[payload[0]] = Number(payload[1])
        }
      },
      selectOption: (state, payload) => {
        console.log("proceed select option " + payload[1] + " for " + payload[0])
        state.userInputs[payload[0]] = payload[1]
      },
      updateRadio: (state, payload) => {
        console.log("proceed update radio " + payload[0] + " for row " + payload[1] +
          " with option " + payload[2])
        if (payload[0] == "primes") {
          state.userInputs["primes"][payload[1]]['type'] = payload[2]
        }
        else {
          state.userInputs[payload[0]] = Number(payload[1])
        }
      }
    },
})
