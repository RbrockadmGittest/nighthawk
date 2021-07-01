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
          <Carousel :settings="carouselSettings">
            <Slide v-for="(page, index) in carouselPages" :key="page">
              <div class="carousel__item">
                <img
                  :src="page"
                  alt="card img"
                  class="card-img"
                  v-bind:class="{
                    'last-page': index == carouselPages.length - 1,
                  }"
                />
              </div>
            </Slide>

            <template #addons>
              <Pagination />
              <Navigation />
            </template>
          </Carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

@Options({
  props: {
    msg: String,
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
})
export default class SignCardComponent extends Vue {
  msg!: string;
  currentCard: any;
  name: string = "";
  message: string = "";
  finishedSigning: boolean = false;
  errors: string[] = [];

  carouselPages: string[] = [];

  carouselSettings = {
    itemsToShow: 1,
    snapAlign: "center",
  };

  created() {
    this.currentCard = this.$route.params.id;

    this.carouselPages = [
      require(`@/assets/images/card-${this.currentCard}.jpg`),
      require("@/assets/images/blank-page.jpg"),
    ];
  }

  checkForm(e: Event) {
    if (this.name && this.message) {
      // sign the card
      this.signCard();
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

  signCard() {}
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

.carousel {
  width: 500px;
}
</style>