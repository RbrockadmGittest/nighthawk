<template>
  <div class="page">
    <h1>NIGHTHAWK</h1>
    <div class="content-container">
      <h3 class="subtitle">Here is your card: {{ currentCard }}</h3>
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
              <button type="submit" class="button primary-button">
                Create Card
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
export default class CardCreationComponent extends Vue {
  msg!: string;
  currentCard: any;
  recipientName: string = "";
  recipientEmail: string = "";
  finishedSigning: boolean = false;

  errors: string[] = [];

  created() {
    console.log(this.$route.params.id);
    this.currentCard = this.$route.params.id;
  }

  checkForm(e: Event) {
    if (this.recipientName && this.recipientEmail) {
      this.$router.replace({
        name: "SignCard",
        params: { id: this.currentCard },
      });
      return true;
    }

    this.errors = [];

    if (!this.recipientName) {
      this.errors.push("Name required.");
    }
    if (!this.recipientEmail) {
      this.errors.push("Email required.");
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