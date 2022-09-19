<template>
  <div>
    <q-ajax-bar :position="position" :color="color" :size="size" />
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    position: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
