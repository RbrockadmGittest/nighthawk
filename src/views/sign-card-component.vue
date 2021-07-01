<template>
  <div class="page">
    <h1>NIGHTHAWK</h1>
    <div class="content-container">
      <h3 class="subtitle">GET SIGNING PUNK!</h3>
      <div class="signing-section">
        <div class="input-container">
          <form @submit="checkForm">
            <div class="form-errors" v-if="errors.length">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
              </ul>
            </div>

            <div class="input-group">
              <label class="input-label">Your Name:</label>
              <input class="input" v-model="name" placeholder="Who are you?" />
            </div>

            <div class="input-group">
              <label class="input-label">Your Message</label>
              <textarea
                class="input textarea"
                v-model="message"
                placeholder="Share the love"
              />
            </div>

            <div class="input-group">
              <button type="submit" class="primary-button">
                Sign the Card
              </button>
            </div>
          </form>
        </div>
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
export default class SignCardComponent extends Vue {
  msg!: string;
  currentCard: any;
  name: string = "";
  message: string = "";
  finishedSigning: boolean = false;

  errors: string[] = [];

  created() {
    console.log(this.$route.params.id);
    this.currentCard = this.$route.params.id;
  }

  checkForm(e: Event) {
    if (this.name && this.message) {
      return true;
    }

    this.errors = [];

    if (!this.name) {
      this.errors.push("Name required.");
    }
    if (!this.message) {
      this.errors.push("message required.");
    }

    e.preventDefault();
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