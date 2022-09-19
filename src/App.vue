<template>
  <router-view />
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "App",

  methods: {
    ...mapActions("auth", ["readUser"]),
  },
  mounted() {
    this.readUser();
  },
};
</script>
