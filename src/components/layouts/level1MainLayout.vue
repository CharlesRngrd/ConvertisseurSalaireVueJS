<template>
  <div>
    <b-container fluid>
      <select v-model="$root.$i18n.locale">
        <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
          {{ lang }}</option>
      </select>

      <b-row class="white fixed-top" id="title">
        <b-col sm="12">
          <h1>{{ $t("layout.title") }}</h1>
        </b-col>

        <b-col sm="4" offset-sm="2" lg="3" offset-lg="3">
          <router-link to="/" exact class="menu">
            {{ $t("layout.linkSimulation") }}
          </router-link>
        </b-col>

        <b-col sm="4" lg="3">
          <router-link to="/comprendre" exact class="menu">
            {{ $t("layout.linkUnderstanding") }}
          </router-link>
        </b-col>
      </b-row>

      <b-row class="position-relative" id="content">
        <b-col md="10" offset-md="1" lg="8" offset-lg="2">
          <b-row>
            <b-col>

              <b-row class="position-relative">
                <b-col>
                  <a href="https://github.com/CharlesRngrd/ConvertisseurSalaireVueJS/tree/Vue+Vuex"
                    class="link" target="blank">
                    <font-awesome-icon :icon="['fab', 'github']" class="icon-2x"/>
                    Fork me on Github
                  </a>
                </b-col>
              </b-row>

              <slot />

            </b-col>
          </b-row>

          <b-row class="position-relative" id="footer">
            <b-col>
              <router-link to="/mentions" exact class="link">
                {{ $t("layout.linkLegalNotice") }}
              </router-link>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return { langs: ['fr', 'en'] }
  },
}
</script>

<style scoped>
* {
  color: #2769d1;
  text-align: center;
}
h1 {
  font-size: 3rem;
  padding-top: .1em;
  padding-bottom: .1em;
}
select {
  position: fixed;
  top: 1rem;
  right: 2rem;
  z-index: 1001;
  outline: none;
  border: none;
  border-bottom: solid 1px;
  font-size: 120%;
}

.row {
  margin-top: 0;
  margin-bottom: 0;
}
.menu {
  display: inline-block;
  width: 230px;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 2px;
  padding-bottom: 3px;
  border-radius: 5px;
  background-color: #fff;
  font-size: 120%;
  color: #2769d1;
}
.menu:hover {
  background-color: #e0e0e0;
  color: #fff;
  text-decoration: none;
}
.menu.router-link-active {
  background-color: #2769d1;
  color: #fff;
  text-decoration: none;
}
.link {
  color: #6f6f6f;
  font-size: 120%;
  font-weight: bold;
  padding-bottom: 1rem;
}
.icon-2x {
  font-size: 180%;
  position: relative;
  top: 5px;
  margin-right: 5px;
  color: #6f6f6f !important;
}
path {
  fill: #6f6f6f;
}

#title {
  z-index: 1000;
  padding: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background: #fff;
  -moz-box-shadow: 5px 5px 12px #999;
  -webkit-box-shadow: 5px 5px 12px #999;
  box-shadow: 5px 5px 12px #999;
}
#content {
  z-index: 1;
  background: lightgrey;
  padding-top: 10rem;
  min-height: -webkit-fill-available;
}

@media screen and (max-width:992px) {
  h1 {
    font-size: 2.5rem;
  }
  .menu {
    font-size: 100%;
    width: 200px;
  }
}
@media(max-width:768px) {
  h1 {
    font-size: 2rem;
  }
}
@media(max-width:576px) {
  h1 {
    font-size: 1.5rem;
  }
  select {
    top: 3.5rem;
  }
}
</style>
