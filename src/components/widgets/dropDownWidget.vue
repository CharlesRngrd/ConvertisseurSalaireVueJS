<template>
  <div>
    <b-dropdown :id="name" :text="variable[1].toString()">
      <b-dropdown-item
        v-for="(item, i) in options"
        :id="'option' + item"
        @click="selectOption([variable[0], item])" :key="`items${i}`" :value="item">
        {{ item }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import { bus } from '@/main'

export default {
  name: "dropDownWidget",
  props: {
    variable: {
      requiered: true,
      type: Array
    },
    options: {
      requiered: true,
      type: Array
    },
    name: {
      requiered: true,
      type: String
    }
  },
  methods: {
    selectOption(variable) {
      console.log("emit selectOption with " + variable)
      bus.$emit('selectOption', variable)
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
/deep/ .show > .btn-secondary.dropdown-toggle {
  background-color: #1b509f;
  border-color: #fff;
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
