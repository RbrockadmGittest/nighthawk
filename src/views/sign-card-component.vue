<template>
  <div class="page">
    <h1>NIGHTHAWK</h1>
    <div class="content-container">
      <h3 class="subtitle">GET SIGNING PUNK!</h3>
      <h3 class="subtitle">
        You unique greeting card URL:
        <router-link :to="`/card/${greetingCardId}/${currentCard}`">
          http://localhost:8080/card/{{ greetingCardId }}/{{currentCard}}
        </router-link>
      </h3>
      <div class="signing-section">
        <div class="input-container">
          <form @submit="submitForm">
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

            <div class="button-group">
              <button @click="signCard" class="button secondary-button">
                Sign Me
              </button>

              <button
                @click="confirmation"
                :disabled="!signed"
                class="button primary-button"
              >
                Save Me
              </button>
            </div>
          </form>
        </div>
        <div class="card-container">
          <Carousel id="carousel" :settings="carouselSettings">
            <Slide v-for="(page, index) in carouselPages" :key="page">
              <div
                class="carousel__item"
                v-bind:class="{
                  'last-page': index == carouselPages.length - 1,
                }"
              >
                <img :src="page" alt="card img" class="card-img" />
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

import GreetingCardData from "../services/greeting-card-data";

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
  greetingCardId: any = "";
  msg!: string;
  currentCard: any;
  name: string = "";
  message: string = "";
  finishedSigning: boolean = false;
  errors: string[] = [];
  signed = false;

  carouselPages: string[] = [];

  carouselSettings = {
    itemsToShow: 1,
    snapAlign: "center",
  };

  created() {
    this.greetingCardId = this.$route.params.id;
    this.currentCard = this.$route.params.template;
    this.carouselPages = [
      require(`@/assets/images/card-${this.currentCard}.jpg`),
      require("@/assets/images/blank-page.jpg"),
    ];
  }

  submitForm(e: Event) {
    e.preventDefault();

    if (!this.checkForm()) {
      return;
    }

    // TODO: Submit data to backend
  }

  checkForm() {
    this.errors = [];

    if (this.name && this.message) {
      return true;
    }

    if (!this.name) {
      this.errors.push("Name required.");
    }
    if (!this.message) {
      this.errors.push("message required.");
    }

    return false;
  }

  signCard() {
    if (!this.checkForm()) {
      return;
    }

    let data = {
      senderName: this.name,
      greetingMessage: this.message,
    };

    GreetingCardData.update(this.greetingCardId, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    const lastPageDiv = document.getElementsByClassName("last-page")[0];
    const previousText = document.getElementById("dynamically-added-text");

    if (previousText) {
      previousText.remove();
    }

    const spanElement = document.createElement("span");
    spanElement.setAttribute("id", "dynamically-added-text");
    spanElement.setAttribute("class", "dynamically-added-text");

    const messageNode = document.createTextNode(this.message);
    const nameNode = document.createTextNode(this.name);
    const linebreak = document.createElement("br");

    lastPageDiv.appendChild(spanElement);
    spanElement.appendChild(messageNode);
    spanElement.appendChild(linebreak);
    spanElement.appendChild(nameNode);

    this.goToLastPage();

    this.signed = true;
  }

  confirmation() {
    this.$router.replace({
      name: "Confirmation",
      params: { id: this.greetingCardId, template: this.currentCard }
    });
  }

  goToLastPage() {
    const paginationIdenitier = "carousel__pagination-button";
    const paginationItems =
      document.getElementsByClassName(paginationIdenitier);
    const lastPaginationItem = paginationItems[paginationItems.length - 1];

    lastPaginationItem.dispatchEvent(new Event("click"));
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

.carousel {
  width: 500px;
}

.carousel__item {
  position: relative;
}
</style>