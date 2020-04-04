import { createLocalVue, mount } from '@vue/test-utils'
import simulationPage from '@/components/pages/simulationPage'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'

const localVue = createLocalVue()

localVue.use(BootstrapVue)
localVue.use(VueI18n)

describe('All the simulation rules', () => {
  let wrapper

  beforeAll(() => {
    wrapper = mount(simulationPage, {
      localVue
    })
  })

  function checkOutput(outPut) {
    expect(wrapper.vm.salaryWithPrimes).toBe(outPut[0])
    expect(wrapper.vm.thirteenthMonth).toBe(outPut[1])
    expect(wrapper.vm.ifm).toBe(outPut[2])
    expect(wrapper.vm.cp).toBe(outPut[3])
    expect(wrapper.vm.salaryTotal).toBe(outPut[4])
  }

  it('works with the minimum rate', () => {
    const buttonMinimumWage = wrapper.find('#minimumWage')
    buttonMinimumWage.trigger('click')

    checkOutput([1140, 0, 114, 125, 1379])
  })

  it('works with rate set to 10', () => {
    const inputRate = wrapper.find('#rate')
    inputRate.element.value = 10
    inputRate.trigger('input')

    checkOutput([1168, 0, 117, 129, 1414])
  })

  it('works with weeklyHours set to 40', () => {
    const inputWeeklyHours = wrapper.find('#weeklyHours')
    inputWeeklyHours.element.value = 40
    inputWeeklyHours.trigger('input')

    checkOutput([1376, 0, 138, 151, 1665])
  })

  it('works with weeklyHoursThreshold set to 38 and weeklyHoursSurcharge set to 35', () => {
    const dropDownWeeklyHoursThreshold = wrapper.find('#option38')
    const dropDownWeeklyHoursSurcharge = wrapper.find('#option30')
    dropDownWeeklyHoursThreshold.trigger('click')
    dropDownWeeklyHoursSurcharge.trigger('click')

    checkOutput([1355, 0, 136, 149, 1640])
  })

  it('works with thirteenthMonth', () => {
    const switchIsThirteenthMonth = wrapper.find('#isThirteenthMonth')
    switchIsThirteenthMonth.trigger('click')

    checkOutput([1355, 111, 147, 161, 1774])
  })

  it('works with enabling tickets', () => {
    const switchIsTicket = wrapper.find('#isTicket')
    switchIsTicket.trigger('click')

    checkOutput([1355, 111, 147, 161, 1774])
  })

  it('works with set tickets to 8', () => {
    const inputTicketAmount = wrapper.find('#ticketAmount')
    inputTicketAmount.element.value = 8
    inputTicketAmount.trigger('input')

    checkOutput([1268, 111, 147, 161, 1687])
  })

  it('works with enabling primes', () => {
    const switchIsPrime = wrapper.find('#isPrime')
    switchIsPrime.trigger('click')

    checkOutput([1268, 111, 147, 161, 1687])
  })

  it('works with monthly prime of 20', () => {
    const inputPrime0 = wrapper.find('#primes-0')
    const radio02 = wrapper.find('#radio-0-2')
    radio02.trigger('click')
    inputPrime0.element.value = 20
    inputPrime0.trigger('input')

    checkOutput([1283, 111, 147, 161, 1702])
  })

  it('works with adding a dayly prime of 1', () => {
    const inputPrime1 = wrapper.find('#primes-1')
    inputPrime1.element.value = 1
    inputPrime1.trigger('input')

    checkOutput([1300, 111, 147, 161, 1719])
  })

  it('works with adding a prime', () => {
    const buttonAddItem = wrapper.find('#addItem')
    const primeNumber = wrapper.vm.userInputs.primes.length
    buttonAddItem.trigger('click')

    expect(wrapper.vm.userInputs.primes.length).toBe(primeNumber + 1)
  })
})
