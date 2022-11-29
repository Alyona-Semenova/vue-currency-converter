<template>
  <v-app>
    <v-container>
      
      <Preloader v-if="showPreloader" />

      <v-row align="center" justify="center" style="height: 70vh" v-else>
        <v-col cols="10" md="12" lg="9" xl="6" class="bg--light mx-auto">
          <h1 class="text-center mb-4">{{ $t("message.currConverter") }}</h1>
          <v-row justify="space-between" no-gutters>
            <v-col cols="12" md="5">
              <v-row no-gutters>
                <v-col class="px-1" cols="3">
                  <v-autocomplete
                    @change="convert"
                    v-model="selected[0]"
                    :items="countries"
                    :label="$t('message.have')"
                  ></v-autocomplete>
                </v-col>

                <v-col class="px-1" cols="9">
                  <v-text-field
                    @input="convert"
                    v-model="inputed"
                    :rules="[rules.onlyNumbers]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" md="5">
              <v-row no-gutters>
                <v-col class="px-1" cols="9">
                  <v-text-field
                    v-model="result"
                    type="number"
                    readonly
                  ></v-text-field>
                </v-col>

                <v-col class="px-1" cols="3">
                  <v-autocomplete
                    @change="convert"
                    v-model="selected[1]"
                    :items="countries"
                    :label="$t('message.want')"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-col>
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
      showPreloader: true,
      defaultValute: {
        CharCode: "RUB",
        Name: "Российский рубль",
        Value: 1,
        Nominal: 1,
      },
      valutes: {},
      selected: ["RUB", "USD"],
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
    convert() {
      let firstValute = this.valutes[this.selected[0]] ?? this.defaultValute,
        firstValuteValue = firstValute.Value * Number(this.inputed),
        firstValuteNominal = firstValute.Nominal;
      let secondValute = this.valutes[this.selected[1]] ?? this.defaultValute,
        secondValuteValue = secondValute.Value,
        secondValuteNominal = secondValute.Nominal;
      let result =
        firstValuteValue /
        firstValuteNominal /
        (secondValuteValue / secondValuteNominal);

      this.result = result ? Math.floor(result * 10000) / 10000 : null;
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
