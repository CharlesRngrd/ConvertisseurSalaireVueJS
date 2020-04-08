<template>
  <div>
    <b-dropdown :id="variable" :text="this.$store.state.userInputs[variable].toString()">
      <b-dropdown-item
        v-for="(item, i) in options"
        :id="'option' + item"
        @click="selectOption(variable, item)" :key="`items${i}`" :value="item">
        {{ item }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  name: "dropDownWidget",
  props: {
    variable: {
      requiered: true,
      type: String
    },
    options: {
      requiered: true,
      type: Array
    }
  },
  methods: {
    selectOption(variable, item) {
      console.log("emit select option " + item + " for " + variable)
      this.$store.commit('selectOption', [variable, item]);
    }
  },
}
</script>

<style scoped>
/deep/ .dropdown.b-dropdown.btn-group {
  margin: 1rem;
}
/deep/ .btn-secondary.dropdown-toggle,
/deep/ .btn-secondary.dropdown-toggle:hover,
/deep/ .btn-secondary.dropdown-toggle:focus,
/deep/ .btn-secondary.dropdown-toggle:active,
/deep/ .show > .btn-secondary.dropdown-toggle {
  background-color: #1b509f !important;
  border-color: #fff !important;
  border: solid 2px;
  color: #fff;
  outline: none;
  box-shadow: unset !important;
  min-width: 5rem;
}
/deep/ .dropdown-menu.show {
  border: solid 2px #1b509f;
  width: -webkit-fill-available;
  min-width: 0;
}
/deep/ .dropdown-item {
  color: #1b509f;
}
/deep/ .dropdown-item:hover {
  color: #fff;
  background-color: #1b509f;
}
</style>
