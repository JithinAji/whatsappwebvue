<template>
  <div class="flex content-center w-full h-screen">
    <app-background class="-z-10"></app-background>
    <whatsapp-container></whatsapp-container>
  </div>
</template>

<script>
import background from "./components/background.vue";
import msgcontainer from "./components/msgcontainer.vue";

export default {
  components: {
    "app-background": background,
    "whatsapp-container": msgcontainer,
  },
};
</script>

<style>
</style>