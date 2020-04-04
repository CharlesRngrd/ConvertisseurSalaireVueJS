<template>
  <b-row :class="[underline == true ? 'underline' : '']">
    <b-col cols="9">
      <div v-if="tip">
        <b-tooltip :target="label" triggers="hover">
          {{ tip }}
        </b-tooltip>
      </div>
      <p class="tall">
        {{ label }}
        <font-awesome-icon icon="question-circle" class="icon-2x"
          v-if="tip" :id="label"/>
      </p>
    </b-col>
    <b-col cols="3" class="right">
      <p class="tall" :id="label + '-result'">{{ value }} €</p>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "resultContent",
  props: {
    label: {
      required: true,
      type: String
    },
    value: {
      required: true,
      type: String
    },
    tip: {
      required: false,
      type: String
    },
    underline: {
      required: false,
      type: Boolean
    }
  },
}
</script>

<style scoped>
.underline {
  text-decoration: underline;
}
.right {
  padding-left: 0;
}
</style>
