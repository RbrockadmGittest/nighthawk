<template>
  <div class="page">
    <h1>NIGHTHAWK</h1>
    <div class="content-container">
      <h3 class="subtitle">Here is your card: {{ currentCard }}</h3>
      <div class="cards-container">
        <div class="card-container">
          <div class="card"></div>
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
export default class CardComponent extends Vue {
  msg!: string;
  currentCard: any;

  created() {
    console.log(this.$route.params.id);
    this.currentCard = this.$route.params.id;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style scoped></style>-->