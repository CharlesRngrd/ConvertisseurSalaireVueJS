<template>
  <div>
    <input type="radio"
      :id="rowIndex.toString() + '-' + optionIndex.toString()"
      :value="optionIndex.toString()">
    <label
      :class="isChecked(optionIndex.toString(),this.$store.state.userInputs[variable][rowIndex]['type'])"
      :id="'radio' + '-' + rowIndex.toString() + '-' + optionIndex.toString()"
      :for="rowIndex.toString() + '-' + optionIndex.toString()"
      @click="updateRadio(variable, rowIndex, optionIndex)"
    ></label>
  </div>
</template>

<script>
export default {
  name: "radioWidget",
  props: {
    rowIndex: {
      requiered: true,
      type: Number
    },
    optionIndex: {
      requiered: true,
      type: Number
    },
    variable: {
      requiered: true,
      type: String
    }
  },
  methods: {
    isChecked(item, selected) {
      if (item == selected) {
        return "selected"
      }
    },
    updateRadio(variable, rowIndex, optionIndex) {
      console.log("emit update radio " + variable + " for row " + rowIndex +
        " with option " + optionIndex)
      this.$store.commit("updateRadio", [variable, rowIndex, optionIndex])
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
