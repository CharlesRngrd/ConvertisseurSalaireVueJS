<template>
  <div>
    <text-content :content="$t('legalNotice')" appearance="white"></text-content>
  </div>
</template>

<script>
import textContent from '../contents/textContent.vue'

export default {
  name: "legalNoticePage",
  components: {
    'text-content': textContent
  },
}
</script>
