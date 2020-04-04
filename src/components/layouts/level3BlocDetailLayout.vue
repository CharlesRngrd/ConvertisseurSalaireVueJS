<template>
  <div>
    <div class="arrow-up"></div>
    <div class="darkBlue">

      <slot/>

    </div>
  </div>
</template>

<script>
export default {
  name: "blocDetailLayout",
}
</script>

<style>
.arrow-up {
  width: 0;
  height: 0;
  border-left: 1rem solid transparent;
  border-right: 1rem solid transparent;
  border-bottom: 1rem solid;
  border-bottom-color: #1b509f;
  position: relative;
  left: 3rem
}
.collapse .row {
  margin-top: 0;
  margin-bottom: 0;
}
.collapse label {
  margin-top: 1.5rem;
}
.darkBlue {
  background: #1b509f;
  padding: 1rem;
  border-radius: 7px;
}

@media(max-width:576px) {
  .collapse label {
    margin-top: 1rem;
  }
}
</style>
