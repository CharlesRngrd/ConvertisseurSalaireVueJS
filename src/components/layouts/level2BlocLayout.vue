<template>
  <div class="content">
    <b-row class="bloc" :class="[appearance == 'white' ? 'white' : 'blue']">
      <b-col sm="10" offset-sm="1">

        <slot/>

      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "blocLayout",
  props: {
    appearance: {
      required: true,
      type: String
    }
  },
}
</script>

<style scoped>
.white {
  background-color: #fff;
  color: #2769d1;
}
.blue {
  background-color: #2769d1;
  color: #fff;
}
.blue .text {
  color: #fff;
}
.bloc {
  margin-bottom: 2em;
  padding-top: 2em;
  padding-bottom: 2em;
  padding-left: 0;
  padding-right: 0;
  margin-left: 0;
  margin-right: 0;
  border: 2px solid;
  border-color: #2769d1;
  text-align: left;
  -moz-box-shadow: 5px 5px 12px #999;
  -webkit-box-shadow: 5px 5px 12px #999;
  box-shadow: 5px 5px 12px #999;
}
.text {
  color: #5c5c5c;
  font-size: 110%;
  font-family: arial;
  text-align: justify;
  margin: 0;
}
</style>
