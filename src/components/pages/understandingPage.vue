<template>
  <div>
    <text-content :content="$t('understanding[0]')" appearance="white"></text-content>
    <text-content :content="$t('understanding[1]')" appearance="blue"></text-content>
    <text-content :content="$t('understanding[2]')" appearance="white"></text-content>
  </div>
</template>

<script>
import textContent from '../contents/textContent.vue'

export default {
  name: "understandingPage",
  components: {
    'text-content': textContent
  },
}
</script>
