<template>
  <q-page class="fit row justify-center content-center">
    <transition-group
      appear
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutUp"
    >
      <q-card
        key="login-form"
        square
        class="shadow-20"
        :style="$q.platform.is.desktop ? 'height: auto; width: 65%' : 'height: auto; width: 85%'"
      >
        <q-card-section class="bg-primary">
          <div class="text-h5 text-center">
            <q-img src="~assets/logo-inverted.png" width="128px" />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-form class="q-gutter-lg q-pt-lg" @submit.prevent="loginAction(user)">
            <q-input
              ref="username"
              square
              label="Usuario"
              placeholder="usuario de moodle"
              type="username"
              v-model.trim="user.username"
              :rules="[required]"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>

            <q-input
              ref="password"
              square
              label="Contraseña"
              :type="passwordFieldType"
              placeholder="contraseña de moodle"
              v-model="user.password"
              :rules="[this.required]"
              autocomplete="on"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="visibilityIcon"
                  @click="switchVisibility"
                  class="cursor-pointer"
                />
              </template>
            </q-input>

            <div>
              <q-btn
                flat
                label="Acceder"
                icon="account_circle"
                color="primary"
                class="full-width"
                type="submit"
              />
              <q-btn
                flat
                label="Limpiar"
                icon="restart_alt"
                @click="resetForm"
                color="negative"
                class="full-width q-mt-md"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </transition-group>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",

  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      passwordFieldType: "password",
      visibilityIcon: "visibility",
      visibility: false,
      version: this.$version,
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    switchVisibility() {
      this.visibility = !this.visibility;
      this.passwordFieldType = this.visibility ? "text" : "password";
      this.visibilityIcon = this.visibility ? "visibility_off" : "visibility";
    },
    required(val) {
      return (val && val.length > 0) || "Este campo no puede estar vacío";
    },
    async loginAction(user) {
      await this.login(user).then(() => {
        this.$router.push({ name: "profile" });
      });
    },
    resetForm() {
      this.user.username = "";
      this.user.password = "";
    },
  },
};
</script>
