<template>
  <div class="page">
    <h1>NIGHTHAWK</h1>
    <div class="content-container">
      <h3 class="subtitle">HAPPY BIRTHDAY {{ recipientName }}!</h3>
      <div class="signing-section">
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
export default class ViewCardComponent extends Vue {
  greetingCardId: any = "";
  currentCard: any;
  name: string = "";
  recipientName: string = "";
  message: string = "";
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
    this.showMessages();
  }

  showMessages() {

    GreetingCardData.get(this.greetingCardId)
      .then((response) => {
        console.log(response.data);
        this.message = response.data.greetingMessage;
        this.name = response.data.senderName;
        this.recipientName = response.data.recipientName;
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

        // this.goToLastPage();
      })
      .catch((e) => {
        console.log(e);
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