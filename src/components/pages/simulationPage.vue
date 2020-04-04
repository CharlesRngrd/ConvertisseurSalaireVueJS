<template>
  <div>
    <bloc-layout appearance="blue">

      <b-row>
        <b-col cols="8">
          <label class="tall">{{ $t('simulation.rate') }}</label>
          <span id="minimumWage" @click="minimumWage()">
            {{ $t('simulation.minimumWage') }}
          </span>
        </b-col>
        <b-col cols="4" class="right">
          <input-widget :variable="['rate', userInputs.rate]"></input-widget>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="8">
          <label class="tall">{{ $t('simulation.weeklyHours') }}</label>
        </b-col>
        <b-col cols="4" class="right">
          <input-widget
            :variable="['weeklyHours', userInputs.weeklyHours]">
          </input-widget>
        </b-col>
      </b-row>

      <b-collapse id="overtime" :visible="displayOvertime">
        <bloc-detail-layout>
          <b-row>
            <b-col cols="7">
              <label>{{ $t('simulation.weeklyHoursThreshold') }}</label>
            </b-col>
            <b-col cols="5" class="right">
              <drop-down-widget name="weeklyHoursThreshold"
                :options="params.weeklyHoursThresholdOptions"
                :variable="['weeklyHoursThreshold', userInputs.weeklyHoursThreshold]">
              </drop-down-widget>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="7">
              <label>{{ $t('simulation.weeklyHoursSurcharge') }}</label>
            </b-col>
            <b-col cols="5" class="right">
              <drop-down-widget name="weeklyHoursSurcharge"
                :options="params.weeklyHoursSurchargeOptions"
                :variable="['weeklyHoursSurcharge', userInputs.weeklyHoursSurcharge]">
              </drop-down-widget>
            </b-col>
          </b-row>
        </bloc-detail-layout>
      </b-collapse>

      <b-row>
        <b-col cols="8">
          <label class="tall">{{ $t('simulation.thirteenthMonth') }}</label>
        </b-col>
        <b-col cols="4" class="right">
          <switch-widget :variable="['isThirteenthMonth', userInputs.isThirteenthMonth]">
          </switch-widget>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="8">
          <label class="tall">{{ $t('simulation.ticket') }}</label>
        </b-col>
        <b-col cols="4" class="right">
          <switch-widget :variable="['isTicket', userInputs.isTicket]"></switch-widget>
        </b-col>
      </b-row>

      <b-collapse id="tickets" :visible="userInputs.isTicket">
        <bloc-detail-layout>
          <b-row>
            <b-col cols="7">
              <label>{{ $t('simulation.ticketAmount') }}</label>
            </b-col>
            <b-col cols="4" class="right">
              <input-widget appearance="darkBlue"
                :variable="['ticketAmount', userInputs.ticketAmount]">
              </input-widget>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p>
                <font-awesome-icon icon="exclamation-circle" class="icon-2x"/>
                {{ $t('simulation.ticketDetail') }}
              </p>
            </b-col>
          </b-row>
        </bloc-detail-layout>
      </b-collapse>

      <b-row>
        <b-col cols="8">
          <label class="tall">{{ $t('simulation.primes') }}</label>
        </b-col>
        <b-col cols="4" class="right">
          <switch-widget :variable="['isPrime', userInputs.isPrime]"></switch-widget>
        </b-col>
      </b-row>

      <b-collapse id="primes" :visible="userInputs.isPrime">
        <bloc-detail-layout>
          <b-row>
            <b-col>

              <table>
                <tr>
                  <th v-for="(option, optionIndex) in params.primeOptions"
                    :key="optionIndex + '-label'">
                    <label>{{ $t('simulation.primeOptions')[option] }}</label>
                  </th>
                </tr>

                <tr v-for="(prime, primeIndex) in userInputs.primes" :key="primeIndex">
                  <td v-for="(option, optionIndex) in params.primeOptions"
                    :key="optionIndex + '-type'">
                    <radio-widget
                      :primeIndex="primeIndex"
                      :optionIndex="optionIndex"
                      :variable="[
                        'primes' + '-' + primeIndex,
                        userInputs.primes[primeIndex]['type']
                      ]"
                    ></radio-widget>
                  </td>
                  <td>
                    <input-widget appearance="darkBlue"
                      :variable="[
                        'primes' + '-' + primeIndex,
                        userInputs.primes[primeIndex]['amount']
                      ]"
                    ></input-widget>
                  </td>
                </tr>
              </table>

            </b-col>
          </b-row>
          <b-row>
            <b-col @click="addItem()" id="addItem">
              <font-awesome-icon icon="plus-circle" class="icon-3x"/>
              <span>{{ $t('simulation.addPrime') }}</span>
            </b-col>
          </b-row>
        </bloc-detail-layout>
      </b-collapse>

    </bloc-layout>

    <bloc-layout appearance="white">

      <result-content
        :label="$t('simulation.baseSalary')"
        :value="$n(salaryWithPrimes)"
        :tip="$t('simulation.baseSalaryTip')"
      ></result-content>

      <result-content
        :label="$t('simulation.thirteenthMonth')"
        :value="$n(thirteenthMonth)"
      ></result-content>

      <result-content
        :label="$t('simulation.endMission')"
        :value="$n(ifm)"
      ></result-content>

      <result-content
        :label="$t('simulation.payedHolidays')"
        :value="$n(cp)"
      ></result-content>

      <result-content
        :label="$t('simulation.totalSalary')"
        :value="$n(salaryTotal)"
        :tip="$t('simulation.totalSalaryTip')"
        :underline="true"
      ></result-content>

    </bloc-layout>
  </div>
</template>

<script>
import { bus } from '@/main'
import resultContent from '../contents/resultContent.vue'
import level2BlocLayout from '../layouts/level2BlocLayout.vue'
import level3BlocDetailLayout from '../layouts/level3BlocDetailLayout.vue'
import dropDownWidget from '../widgets/dropDownWidget.vue'
import inputWidget from '../widgets/inputWidget.vue'
import radioWidget from '../widgets/radioWidget.vue'
import switchWidget from '../widgets/switchWidget.vue'

export default {
  name: "simulationPage",
  components: {
    'result-content': resultContent,
    'bloc-layout': level2BlocLayout,
    'bloc-detail-layout': level3BlocDetailLayout,
    'drop-down-widget': dropDownWidget,
    'input-widget': inputWidget,
    'radio-widget': radioWidget,
    'switch-widget': switchWidget
  },
  data() {
    return {
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
      },
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
      }
    }
  },
  computed: {
    displayOvertime() {
      return this.userInputs.weeklyHours > 35 ? true : false
    },
    wage() {
      return (
        this.userInputs.rate *
        this.params.hoursPerMonth *
        (1 - this.params.wageCosts) *
        (this.userInputs.weeklyHours / 35)
      )
    },
    wageOvertime() {
      if (this.userInputs.weeklyHours > this.userInputs.weeklyHoursThreshold) {
        return (
          this.userInputs.rate *
          (this.params.hoursPerMonth / 35) *
          (1 - this.params.wageCosts) *
          (this.userInputs.weeklyHours - this.userInputs.weeklyHoursThreshold) *
          (this.userInputs.weeklyHoursSurcharge / 100)
        )
      }
      else {
        return 0
      }
    },
    wageTicket() {
      if (this.userInputs.isTicket) {
        return (
          this.userInputs.ticketAmount * this.params.hoursPerMonth / 7 * 0.5
        )
      }
      else {
        return 0
      }
    },
    wagePrime() {
      var wagePrimeTotal = 0
      for(var i = 0; i < this.userInputs.primes.length; i++) {
        // Compute the base prime amount
        var wagePrimeCurrent = (
          this.userInputs.primes[i].amount *
          (1 - this.params.wageCosts)
        )

        // Apply the frequency of the given prime
        switch(this.userInputs.primes[i].type) {
          case 0:
            wagePrimeCurrent = wagePrimeCurrent * this.params.hoursPerMonth / 7
            break
          case 1:
            wagePrimeCurrent = wagePrimeCurrent * this.params.hoursPerMonth / 35
            break
          case 2:
            wagePrimeCurrent = wagePrimeCurrent * 1
            break
        }

        wagePrimeTotal += wagePrimeCurrent
      }

      if (!this.userInputs.isPrime) {
        wagePrimeTotal = 0
      }

      return wagePrimeTotal
    },
    salary() {
      return Math.round(this.wage + this.wageOvertime)
    },
    salaryWithPrimes() {
      return Math.round(this.wage + this.wageOvertime - this.wageTicket + this.wagePrime)
    },
    thirteenthMonth(){
      return Math.round(this.userInputs.isThirteenthMonth ? (this.wage / 12) : 0)
    },
    ifm() {
      return Math.round((this.salary + this.thirteenthMonth) / 10)
    },
    cp() {
      return Math.round((this.salary + this.thirteenthMonth + this.ifm) / 10)
    },
    salaryTotal() {
      return Math.round(this.salaryWithPrimes + this.thirteenthMonth + this.ifm + this.cp)
    }
  },
  methods: {
    minimumWage() {
      console.log('set rate to 9.76')
      this.userInputs.rate = 9.76
    },
    addItem() {
      console.log('adding prime')
      this.userInputs.primes.push({
        type: 0,
        amount: 0
      })
    }
  },
  created() {
    bus.$on('updateInput', (data) => {
      console.log("updateInput " + data[0] + " set to " + data[1].toString())
      // Cas particulier pour les primes qui est une liste
      if (data[0].includes("prime")) {
        this.userInputs.primes[data[0].charAt(data[0].length - 1)].amount = Number(data[1])
      }
      else {
        this.userInputs[data[0]] = Number(data[1])
      }
    })
    bus.$on('switch', (data) => {
      console.log("switch" + data[0] + " to " + !data[1])
      this.userInputs[data[0]] = !data[1]
    })
    bus.$on('selectOption', (data) => {
      console.log("select option for " + data[0] + ", value is " + data[1])
      this.userInputs[data[0]] = data[1]
    })
    bus.$on('updateRadio', (data) => {
      console.log("updateRadio " + data[0] + " set to " + data[1].toString())
      // Cas particulier pour les primes qui est une liste
      if (data[0].includes("prime")) {
        this.userInputs.primes[data[0].charAt(data[0].length - 1)].type = data[1]
      }
      else {
        this.userInputs[data[0]] = data[1]
      }
    })
  },
}
</script>

<style>
th, tr {
  text-align: center;
  width: 15rem;
}

.right {
  text-align: end !important;
}
.tall {
  margin-top: 0.5rem;
}
.row {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.icon-2x {
  font-size: 120%;
}
.icon-3x {
  font-size: 200%;
}
.fa-exclamation-circle, .fa-plus-circle {
  margin-right: 0.5rem;
}
.fa-question-circle {
  margin-left: 0.5rem;
}

#minimumWage {
  margin-left: 1rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: #2769d1;
  background-color: #fff;
  border-radius: 5px;
}
#addItem {
  padding-top: 2rem;
  text-align: center;
}

@media(max-width:576px) {
  .tall {
    margin-top: 0rem;
  }
  #minimumWage {
    margin-left: 0rem;
  }
  table {
    margin-top: 1rem;
  }
  th {
    transform: rotate(-35deg);
    max-width: 3rem;
  }
}
</style>
