<script setup>
import { v4 as uuidv4 } from 'uuid';
import {Pagination, A11y, Autoplay } from 'swiper';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';


const onSwiper = (swiper) => {
    
};
const onSlideChange = () => {
   
};
const modules = [Pagination, A11y, Autoplay];
let apiUrl;
let imageUrl;
//nav icon change start

const props = defineProps(["products","section_title"]);

const config = useRuntimeConfig();
apiUrl = config.public.api;
imageUrl = config.public.imageUrl;




onMounted(() => {
    refreshNuxtData('featured_products');
})

const stripTrailingSlash = () => {
    return imageUrl.endsWith('/') ?
        imageUrl.slice(0, -1) :
        imageUrl;
};

const generateSlug = (title) => {
    return title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}
const splitCommaFromCategory = (category) => {
    return category.split(',');
}


</script>


<style  >
.swiper-button-next:after, .swiper-button-prev:after {
    font-size: 14px;
    color: #2B313B;
    font-weight: bold;
    transition: 250ms;
}

.swiper-button-next, .swiper-button-prev {
    background: #fff;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    transition: 250ms;
}

.swiper-button-next:hover:after, .swiper-button-prev:hover:after {
    color: #fff;
}

.swiper-button-next:hover, .swiper-button-prev:hover {
    background: #112954;
}
.swiper-button-next {
    right: 0;
}

.swiper-button-prev {
    left: 0;
}
</style>


<script>
export default {
  data() {
    return {
      isModalOpen: false,
      currentProduct: null,
        products:[],
    };
  },
  methods: {
    openModal(product) {
      this.isModalOpen = true;
      this.currentProduct = product;
    },
    closeModal() {
      this.isModalOpen = false;
      this.currentProduct = null;
    }
  }
};
</script>
<style>
.modal {
  width: 400px;
  max-width: 90%;
}
</style>
<template>

    <div>

        <swiper :breakpoints="{
            '300': {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            '768': {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            '1024': {
                slidesPerView: 4,
                spaceBetween: 25,
            },
        }" :modules="modules" :slides-per-view="4" :space-between="25" navigation autoplay   :loop="true" @swiper="onSwiper"
            @slideChange="onSlideChange">



            <swiper-slide v-for="(product,index) in props.products[props.section_title]" :key="index">
                <HomeSilderItems :product="product" @openModal="openModal(product)" />
            </swiper-slide>
         



        </swiper>

        <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" @click.self="closeModal">
      <div class="modal bg-white rounded-lg p-6">
        <button @click="closeModal" class="absolute top-0 right-0 m-4">
          <svg class="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h2 class="text-xl mb-4">Product {{ currentProduct.id }}</h2>
        <p>{{ currentProduct.description }}</p>
      </div>
    </div>
   

    </div>
</template>
   
