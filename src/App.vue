<template>
  <div id="app">
    <component :is="this.$route.meta.layout || 'div'">
      <router-view />
    </component>
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style>
* {
  font-family: 'Dosis', sans-serif;
}
.xtall {
  font-size: 2.5rem;
}
.tall {
  font-size: 1.5rem;
  margin: 0;
}
</style>
