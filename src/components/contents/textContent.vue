<template>
  <div>
    <bloc-layout :appearance="appearance">
      <h2 v-if="content.title !== null" class="xtall">
        {{ content.title }}<br><br>
      </h2>

      <div v-for="(item, index) in content.content" :key="index">
        <p v-if="item.label !== null" class="tall">{{ item.label }}</p>
        <div v-for="(text, index) in item.text" :key="index">
          <p class="text">{{ text }}<br></p>
        </div>
        <br/>
      </div>
    </bloc-layout>
  </div>
</template>

<script>
// WARNING : The content prop is already translated !

import level2BlocLayout from '../layouts/level2BlocLayout.vue'

export default {
  name: "textContent",
  components: {
    'blocLayout': level2BlocLayout
  },
  props: {
    content: {
      required: true,
      type: String
    },
    appearance: {
      required: true,
      type: String
    }
  },
}
</script>
