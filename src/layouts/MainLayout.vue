<template>
  <q-layout view="lHh Lpr lFf">
    <Loading position="top" color="red-6" size="5px" />
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleDrawer"
        />
        <q-toolbar-title>
          <q-avatar>
            <img src="~assets/logo-inverted.png" />
          </q-avatar>
        </q-toolbar-title>

        <q-space />
        <div class="q-mr-sm" v-if="$q.platform.is.desktop">
          MdlBol v{{ version }}
        </div>
        <div class="q-mr-sm" v-else>v{{ version }}</div>

        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-btn
            flat
            round
            :icon="$q.dark.isActive ? 'dark_mode' : 'light_mode'"
            @click="$q.dark.toggle"
          />
        </transition>

        <div v-if="user.token">
          <q-btn flat round icon="logout" @click="logout" />
        </div>

        <TopMenu />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above behavior="mobile">
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px">
        <q-list>
          <LeftMenu />
        </q-list>
      </q-scroll-area>
      <q-img
        class="absolute-top"
        src="~assets/drawer-image.jpg"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent text-center">
          <q-avatar size="80px">
            <img src="~assets/logo.png" />
          </q-avatar>
          <div
            class="q-mt-sm bg-primary text-white shadow-20"
            style="opacity: 80%"
          >
            <div v-if="user.data">
              {{ user.data.firstname + " " + user.data.lastname }}
            </div>
            <div v-if="user.data">
              {{ user.data.profile.role }} de
              {{ user.data.profile.campus }}
            </div>
          </div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { useQuasar } from "quasar";
import Loading from "../components/Loading";
import TopMenu from "../components/TopMenu";
import LeftMenu from "../components/LeftMenu";
export default {
  name: "MainLayout",
  components: {
    Loading,
    TopMenu,
    LeftMenu,
  },

  data() {
    const linksList = [
      {
        title: "Perfil",
        icon: "face",
        link: "/",
      },
      {
        title: "Administración",
        icon: "admin_panel_settings",
        link: "/admin",
      },
    ];

    const $q = useQuasar();

    return {
      drawer: false,
      links: linksList,
      version: this.$version
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    ...mapActions("auth", ["logout", "refresh"]),
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  },
  /*created() {
    let self = this;
    window.addEventListener("unload", () => {
      self.logout();
    });

    if (this.user.token != null) {
      window.setInterval(function () {
        self.refresh();
      }, 1000 * 60 * 55);
    }
  },*/
};
</script>
