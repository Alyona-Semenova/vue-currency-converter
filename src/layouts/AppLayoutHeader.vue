<template>
  <div>
    <div>
      <v-app-bar class="navbar" color="#360069" elevation="4">
        <router-link :to="{ path: '/' }">
          <v-toolbar-title class="white--text">{{
            $t("message.home")
          }}</v-toolbar-title>
        </router-link>

        <v-spacer></v-spacer>
        <router-link class="white--text" to="/">{{
          $t("message.courses")
        }}</router-link>
        <v-spacer></v-spacer>
        <router-link class="white--text" to="/converter">{{
          $t("message.converter")
        }}</router-link>
        <v-spacer></v-spacer>
        <v-btn color="yellow" @click="changeLocale()">
          {{ currentLocale }}</v-btn
        >
      </v-app-bar>
    </div>
    <slot />
  </div>
</template>

<script>
import { i18n } from "@/main.js";

export default {
  name: "AppLayoutHeader",
  computed: {
    currentLocale: function () {
      return i18n.locale;
    },
  },
  methods: {
    changeLocale() {
      i18n.locale == "en" ? (i18n.locale = "ru") : (i18n.locale = "en");
    },
  },
};
</script>
