<template>
  <div
    class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Oops. Nada por aquí...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        elevated
        label="Regresar"
        @click="$router.go(-1)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Error404",
};
</script>
