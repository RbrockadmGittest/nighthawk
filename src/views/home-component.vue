<template>
  <div class="page">
    <h1>NIGHTHAWK</h1>

    <div class="content-container">
      <h3 class="subtitle">The easiest way to send a card.</h3>
      <div class="cards-container">
        <div class="card-container">
          <div class="card">
            <img
              :src="require(`@/assets/images/card-1.jpg`)"
              alt
              class="card-img"
            />
          </div>
          <button v-on:click="chooseCard(1)" class="button primary-button">
            choose
          </button>
        </div>

        <div class="card-container">
          <div class="card">
            <img
              :src="require(`@/assets/images/card-2.jpg`)"
              alt
              class="card-img"
            />
          </div>
          <button v-on:click="chooseCard(2)" class="button primary-button">
            choose
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String,
  },
})
export default class HomeComponent extends Vue {
  msg!: string;

  chooseCard(cardNumber: number) {
    this.$router.replace({ name: "CardCreation", params: { id: cardNumber } });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-container {
  text-align: center;
}

.card-container {
  display: flex;
  flex-direction: column;
  margin-left: 100px;
}
</style>