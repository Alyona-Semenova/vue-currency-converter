<template>
  <v-app>
    <marquee class="white--text" direction="right" scrollamount="3"
      ><span>{{ $t("message.eur") }}: {{ mainView("EUR") }}</span
      ><span> {{ $t("message.usd") }}: {{ mainView("USD") }}</span></marquee
    >
    <v-container>
      <Preloader v-if="showPreloader" />

      <v-row v-else>
        <v-col cols="10" md="12" lg="9" xl="6" class="bg--light mx-auto">
          <h1 class="text-center mb-4">{{ $t("message.currValutes") }}</h1>
          <v-row no-gutters>
            <v-col cols="12" md="5">
              <v-row no-gutters>
                <v-col class="px-1" cols="12">
                  <v-list dense>
                    <v-list-item-group>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{
                            $t("message.eur")
                          }}</v-list-item-title>
                          <span>{{ mainView("EUR") }}</span>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title>{{
                            $t("message.usd")
                          }}</v-list-item-title>
                          <span>{{ mainView("USD") }}</span>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>

                  <v-autocomplete
                    v-model="selected[0]"
                    :items="countries"
                    :label="$t('message.base')"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-col>
            <v-row no-gutters class="bg--light mx-auto">
              <v-col>
                <v-list flat>
                  <v-subheader>{{ $t("message.courses") }}</v-subheader>
                  <v-list-item-group color="primary">
                    <v-list-item v-for="item in valutes" :key="item.id">
                      <v-list-item-content>
                        <v-list-item>
                          <p class="font-weight-black mr-2">
                            {{ item.CharCode }}
                          </p>
                          <p class="mr-10">
                            {{ $t(`message.${item.CharCode}`) }}
                          </p>
                          <v-spacer></v-spacer>
                          <p>{{ view(item.Value) }}</p>
                        </v-list-item>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Preloader from "@/components/Preloader";
const axios = require("axios").default;
export default {
  name: "App",
  components: {
    Preloader,
  },

  data() {
    return {
      searchTerm: null,
      showPreloader: false,
      defaultValute: {
        CharCode: "RUB",
        Name: "Российский рубль",
        Value: 1,
        Nominal: 1,
      },
      valutes: {},
      selected: ["RUB"],
      inputed: "",
      result: null,
      countries: ["RUB"],
      rules: {
        onlyNumbers: (value) => {
          const pattern = /^\d+$/.test(value);
          if (!pattern) this.inputed = this.inputed.replace(/\D/g, "");
          return true;
        },
      },
    };
  },

  methods: {
    view(value) {
      let baseValute = this.valutes[this.selected[0]] ?? this.defaultValute;
      return Math.floor((baseValute.Value / value) * 1000) / 1000;
    },
    mainView(string) {
      let baseValute = this.valutes[this.selected[0]] ?? this.defaultValute;

      for (let valute in this.valutes) {
        if (string === this.valutes[valute].CharCode) {
          return (
            Math.floor(
              (baseValute.Value /
                baseValute.Nominal /
                (this.valutes[valute].Value / this.valutes[valute].Nominal)) *
                10000
            ) / 10000
          );
        }
      }
    },
  },

  mounted() {
    this.showPreloader = true;
    axios
      .get("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((response) => {
        this.valutes = response.data.Valute;
        for (let code in this.valutes) {
          this.countries.push(code);
        }
        this.showPreloader = false;
      })
      .catch((error) => {
        this.showPreloader = false;
        alert(error);
        console.log(error);
      });
  },
};
</script>
