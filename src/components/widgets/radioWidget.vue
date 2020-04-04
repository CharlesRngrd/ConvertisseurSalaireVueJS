<template>
  <div>
    <input type="radio"
      :id="primeIndex.toString()+'-'+optionIndex.toString()"
      :value="optionIndex.toString()">
    <label
      :class="isChecked(optionIndex.toString(), variable[1])"
      :id="'radio' + '-' + primeIndex.toString()+'-'+optionIndex.toString()"
      :for="primeIndex.toString()+'-'+ optionIndex.toString()"
      @click="updateRadio(variable, optionIndex)"
    ></label>
  </div>
</template>

<script>
import { bus } from '@/main'

export default {
  name: "radioWidget",
  props: {
    primeIndex: {
      requiered: true,
      type: Number
    },
    optionIndex: {
      requiered: true,
      type: Number
    },
    variable: {
      requiered: true,
      type: Array
    }
  },
  methods: {
    isChecked(item, selected) {
      if (item == selected) {
        return "selected"
      }
    },
    updateRadio(variable, value) {
      console.log("emit updateRadio with " + [this.variable[0], value])
      bus.$emit("updateRadio", [this.variable[0], value])
    }
  }
}
</script>

<style scoped>
input[type=radio] {
  visibility: hidden
}
label {
  height: 20px;
  width: 20px;
  font-size: 0;
  color: #1b509f;
  background-color: #1b509f;
  border: solid 3px #fff;
  padding: 2px;
  border-radius: 50%;
  cursor: pointer;
}
label.selected::after {;
  content: '';
  display: block;
  position: relative;
  border-radius: 50%;
  height: 8px;
  width: 8px;
  top: 1px;
  margin: auto;
  background: #fff;
}
</style>
