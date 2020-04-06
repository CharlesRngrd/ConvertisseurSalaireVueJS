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
          <input-widget variable="rate"></input-widget>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="8">
          <label class="tall">{{ $t('simulation.weeklyHours') }}</label>
        </b-col>
        <b-col cols="4" class="right">
          <input-widget variable="weeklyHours"></input-widget>
        </b-col>
      </b-row>

      <b-collapse id="overtime" :visible="displayOvertime">
        <bloc-detail-layout>
          <b-row>
            <b-col cols="7">
              <label>{{ $t('simulation.weeklyHoursThreshold') }}</label>
            </b-col>
            <b-col cols="5" class="right">
              <drop-down-widget
                :options="$store.state.params.weeklyHoursThresholdOptions"
                variable="weeklyHoursThreshold">
              </drop-down-widget>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="7">
              <label>{{ $t('simulation.weeklyHoursSurcharge') }}</label>
            </b-col>
            <b-col cols="5" class="right">
              <drop-down-widget
                :options="$store.state.params.weeklyHoursSurchargeOptions"
                variable="weeklyHoursSurcharge">
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
          <switch-widget variable="isThirteenthMonth"></switch-widget>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="8">
          <label class="tall">{{ $t('simulation.ticket') }}</label>
        </b-col>
        <b-col cols="4" class="right">
          <switch-widget variable="isTicket"></switch-widget>
        </b-col>
      </b-row>

      <b-collapse id="tickets" :visible="$store.state.userInputs.isTicket">
        <bloc-detail-layout>
          <b-row>
            <b-col cols="7">
              <label>{{ $t('simulation.ticketAmount') }}</label>
            </b-col>
            <b-col cols="4" class="right">
              <input-widget appearance="darkBlue" variable="ticketAmount"></input-widget>
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
          <switch-widget variable="isPrime"></switch-widget>
        </b-col>
      </b-row>

      <b-collapse id="primes" :visible="$store.state.userInputs.isPrime">
        <bloc-detail-layout>
          <b-row>
            <b-col>

              <table>
                <tr>
                  <th v-for="(option, optionIndex) in $store.state.params.primeOptions"
                    :key="optionIndex + '-label'">
                    <label>{{ $t('simulation.primeOptions')[option] }}</label>
                  </th>
                </tr>

                <tr v-for="(prime, primeIndex) in $store.state.userInputs.primes" :key="primeIndex">
                  <td v-for="(option, optionIndex) in $store.state.params.primeOptions"
                    :key="optionIndex + '-type'">
                    <radio-widget
                      :rowIndex="primeIndex"
                      :optionIndex="optionIndex"
                      variable="primes"
                    ></radio-widget>
                  </td>
                  <td>
                    <input-widget appearance="darkBlue"
                      :variable="'primes' + '-' + primeIndex"
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
import resultContent from '../contents/resultContent.vue'
import level2BlocLayout from '../layouts/level2BlocLayout.vue'
import level3BlocDetailLayout from '../layouts/level3BlocDetailLayout.vue'
import dropDownWidget from '../widgets/dropDownWidget.vue'
import inputWidget from '../widgets/inputWidget.vue'
import radioWidget from '../widgets/radioWidget.vue'
import switchWidget from '../widgets/switchWidget.vue'

import {mapGetters} from 'vuex';

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
  computed: {
    displayOvertime() {
      return this.$store.state.userInputs.weeklyHours > 35 ? true : false
    },
    ...mapGetters([
      'wage',
      'wageOvertime',
      'wageTicket',
      'wagePrime',
      'salary',
      'salaryWithPrimes',
      'thirteenthMonth',
      'ifm',
      'cp',
      'salaryTotal'
    ]),
  },
  methods: {
    minimumWage() {
      console.log('emit set rate to 9.76')
      this.$store.commit('minimumWage')
    },
    addItem() {
      console.log('emit adding prime')
      this.$store.commit('addItem')
    }
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
