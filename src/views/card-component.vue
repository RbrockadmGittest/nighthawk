<template>
  <div class="page">
    <h1>NIGHTHAWK</h1>
    <div class="content-container">
      <h3 class="subtitle">Here is your card: {{ currentCard }}</h3>
      <div class="signing-section">
        <div class="input-container">
          <div class="input-group">
            <label class="input-label">Recipient Name:</label>
            <input
              class="input"
              v-model="recipientName"
              placeholder="The person behind you :)"
            />
          </div>

          <div class="input-group">
            <label class="input-label">Recipient Email:</label>
            <input
              class="input"
              v-model="recipientEmail"
              placeholder="The email its going to"
            />
          </div>

          <div class="input-group">
            <input type="checkbox" id="checkbox" v-model="finishedSigning" />
            <label for="checkbox"> Finished Signing?</label>
          </div>
        </div>
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
  recipientName!: string;
  recipientEmail!: string;
  finishedSigning: boolean = false;

  created() {
    console.log(this.$route.params.id);
    this.currentCard = this.$route.params.id;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-container {
  flex: 1;
}

.input-container {
  flex: 2;
}
</style>