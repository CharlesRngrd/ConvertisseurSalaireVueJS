<template>
  <div class="onoffswitch">
    <input  type="checkbox" name="onoffswitch" class="onoffswitch-checkbox"
      :id="variable[0]"
      v-model="variable[1]"
      @click="toogle(variable)"/>
      <label class="onoffswitch-label" :for="variable[0]">
        <span class="onoffswitch-inner-on">{{ $t('common.yes') }}</span>
        <span class="onoffswitch-inner-off">{{ $t('common.no') }}</span>
        <span class="onoffswitch-switch"></span>
      </label>
  </div>
</template>

<script>
import { bus } from '@/main'

export default {
  name: "switchWidget",
  props: {
    variable: {
      required: true,
      type: Array
    }
  },
  methods: {
    toogle(variable) {
      console.log("emit switch with " + variable)
      bus.$emit('switch', variable)
    }
  },
}
</script>

<style scoped>
.onoffswitch {
  position: relative;
  display: inline-block;
  width: 90px;
  top: 1rem;
  text-align: initial;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none
}
.onoffswitch-checkbox {
  display: none
}
.onoffswitch-label {
  display: block;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid #fff;
  border-radius: 20px;
  background-color: #2769d1;
  height: 30px
}
.onoffswitch-inner-on, .onoffswitch-inner-off {
  width: 100%;
  transition: margin 0.3s ease-in 0s;
  position: relative;
  top: 1px;
}
.onoffswitch-inner-on {
  display: none;
  background-color: #FFF;
  color: #2769d1;
  margin-left: 50px;
}
.onoffswitch-inner-off {
  display: inline;
  width: 100%;
  background-color: #2769d1;
  color: #FFF;
  margin-left: 10px;
}
.onoffswitch-switch {
  display: block;
  width: 18px;
  height: 18px;
  margin: 6px;
  background: #FFF;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0px;
  border: 2px solid #2769d1;
  border-radius: 20px;
  transition: all 0.3s ease-in 0s
}
.onoffswitch-checkbox:checked+.onoffswitch-label .onoffswitch-inner-on {
  display: inline;
}
.onoffswitch-checkbox:checked+.onoffswitch-label .onoffswitch-inner-off {
  display: none;
}
.onoffswitch-checkbox:checked+.onoffswitch-label {
  background-color: #fff
}
.onoffswitch-checkbox:checked+.onoffswitch-label .onoffswitch-switch {
  right: 56px;
}

@media(max-width:576px) {
  .onoffswitch {
    top: 0.5rem;
  }
}
</style>
