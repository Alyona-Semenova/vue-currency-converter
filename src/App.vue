<template>
  <v-app>
    <AppLayout>
      <router-view />
    </AppLayout>
  </v-app>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";

export default {
  name: "App",

  components: {
    AppLayout,
  },
};
</script>

<style lang="scss">
#app {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
}

a {
  text-decoration: none;
}

.bg--light {
  background: #fcfcfc;
}
.exchange {
  max-width: 50px;
}
</style>
