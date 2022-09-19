<template>
  <q-layout view="lHh Lpr lFf">
    <Loading position="top" color="red-6" size="5px" />
    <q-page-container v-if="$q.platform.is.desktop">
      <div class="row">
        <div class="col shadow-10 login-background">
          <q-item class="fit row justify-center content-center">
            <q-item-section>
              <div
                class="text-h3 text-center text-uppercase shadow-10 q-pa-xl text-white bg-primary"
                style="opacity: 60%"
              >
                Boletines de Moodle
              </div>
            </q-item-section>
          </q-item>
        </div>
        <div class="col">
          <router-view />
        </div>
      </div>
    </q-page-container>
    <q-page-container v-else-if="$q.platform.is.mobile">
      <div class="login-background">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import Loading from "../components/Loading";
export default {
  name: "LoginLayout",
  components: {
    Loading,
  },
};
</script>
<style lang="scss" scoped>
.login-background {
  background: linear-gradient(
      180deg,
      rgba(84, 110, 122, 0.8) 0%,
      rgba(144, 164, 174, 0.7) 50%,
      rgba(207, 216, 220, 0.6) 100%
    ),
    url("~assets/login-background.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>