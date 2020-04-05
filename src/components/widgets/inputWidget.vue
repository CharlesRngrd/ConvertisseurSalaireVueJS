<template>
  <div class="input-container"
    :class="[appearance == 'darkBlue' ? 'darkBlue' : 'blue']">
    <div class="input-group">
      <input type="text" class="form-control"
        v-model="inputValue"
        :name="inputValue"
        :id="variable"/>
      <span class="input-group-addon right">€</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "inputWidget",
  props: {
    variable: {
      required: true,
      type: String
    },
    appearance: {
      required: false,
      type: String
    }
  },
  methods: {
    updateInput(variable, val) {
      console.log("emit update input " + variable + " to " + val)
      this.$store.commit('updateInput', [variable, val]);
    }
  },
  computed: {
    inputValue: {
      get: function() {
        return this.$store.state.userInputs[this.variable]
      },
      set: function(val) {
        this.updateInput(this.variable, val)
      }
    }
  },
}
</script>

<style scoped>
.input-container {
  display: inline-block;
}
.input-group {
  color: #fff;
  border: solid 2px;
  border-radius: 4px;
  border-color: #fff;
  width: 10rem !important;
}
.form-control {
  color: #fff !important;
  width: 10rem;
  padding-top: 3px;
  padding-bottom: 3px;
  border: none !important;
  border-radius: 0 !important;
  background-color: #2769d1 !important;
}
.form-control:hover, .form-control:active, .form-control:focus {
  background-color: #fff !important;
  color: #2769d1 !important;
}
.input-group-addon {
  display: flex;
  color: #fff;
  border: none;
  width: 35px;
  position: relative;
  right: 0;
  padding-left: 10px;
  padding-top: 7px;
  background-color: #2769d1 !important;
}
.darkBlue .form-control, .darkBlue .input-group-addon {
  background-color: #1b509f !important;
}
.darkBlue .form-control:hover,
.darkBlue .form-control:active,
.darkBlue .form-control:focus {
  background-color: #fff !important;
  color: #1b509f !important;
}

@media(max-width:768px) {
  .form-control {
    width: 8rem;
  }
  .input-group {
    width: 8rem !important;
  }
}
@media(max-width:576px) {
  .form-control {
    width: 5rem;
  }
  .input-group {
    width: 5rem !important;
  }
  .input-group-addon[data-v-dab5fb24] {
    width: 25px;
  }
}
</style>
