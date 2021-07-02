<template>
  <div class="page">
    <h1>NIGHTHAWK</h1>

    <div class="content-container">
      <h3 class="subtitle">
        Thanks for signing!
      </h3>
      <h3 class="subtitle">
          Share this link with anyone who would like to sign the card:
        <router-link :to="`/signcard/${greetingCardId}/${currentCard}`" target="_blank">
          http://localhost:8080/signcard/{{ greetingCardId }}/{{currentCard}}
        </router-link>
       </h3>
       <h3 class="subtitle">
          Share this link with the recipient once eveyone has signed the card:
        <router-link :to="`/card/${greetingCardId}/${currentCard}`" target="_blank">
          http://localhost:8080/card/{{ greetingCardId }}/{{currentCard}}
        </router-link>
       </h3>
      <div class="cards-container">
        <div class="card-container">
          <div class="card">
            <img
              :src="require(`@/assets/images/card-${currentCard}.jpg`)"
              alt
              class="card-img"
            />
          </div>
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
export default class ConfirmationComponent extends Vue {
  msg!: string;
  greetingCardId: any;
  currentCard: any;

  created() {
    this.greetingCardId = this.$route.params.id;
    this.currentCard = this.$route.params.template;
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
  justify-content: center;
  margin-left: 100px;
}
</style>