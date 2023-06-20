<script setup>
import { Pagination, A11y, Autoplay } from 'swiper';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
let apiUrl;
let imageUrl;
const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log('slide change');
};
const modules = [Pagination, A11y, Autoplay];


const config = useRuntimeConfig();
apiUrl = config.public.api;
imageUrl = config.public.imageUrl;
const props = defineProps(['product_id', 'category']);
const { data: relatedProducts } = await useAsyncData('related_products', () => $fetch(`${apiUrl}/related-products/${props.category}/${props.product_id}`));

onMounted(() => {
  refreshNuxtData('related_products');
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

</script>

<template>
  <div class="heading-area my-6">
    <h2 class="flex items-center text-[#2B313B] font-bold text-[20px] mb-1">Related products</h2>
    <p class="tag-line text-[#6C7A93] text-sm font-normal">Economical in consumption and on offer</p>
  </div>
  <div>
    <swiper :breakpoints="{
      '300': {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      '768': {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      '1024': {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    }" :modules="modules" :slides-per-view="4" :space-between="20" autoplay navigation :loop="true" @swiper="onSwiper"
      @slideChange="onSlideChange">
      <swiper-slide v-for="(product, i) in relatedProducts" :key="i">
        <div class="items">
          <nuxt-link :to="'/products/' + generateSlug(product.product_title) + '-' + product.id"
            class="flex w-[255px] mb-3 p-2 flex-col transition-all border border-[#EBF1FF]  rounded-lg hover:shadow-md md:flex-col  bg-white">
            <div class="img-box flex justify-center items-center relative h-[165px] w-full bg-[#F5F8FF]">
              <div class="product-img">
                <img class="object-cover w-auto rounded-t-lg h-auto mx-auto" :src="stripTrailingSlash() + product.url"
                  alt="image">
              </div>
              <div class="brand-logo">
                <img src="@/assets/img/providers/amazon-brand.png" alt="icon">
              </div>


            </div>
            <div class="product-info mt-2 flex items-center justify-between">
              <span class="w-fit bg-[#EBF1FF] text-[#0052FE] text-xs font-bold p-2 rounded ">{{ product.category_name
              }}</span>
              <!-- <span class="product-status flex items-center text-[#1D9E54] font-normal text-xs"><img src="@/assets/img/icons/sell-arrow-green.svg" class="mr-1 w-4 h-4" alt="icon"> -24%</span> -->
            </div>
            <div class="product-title mt-2">
              <h4 class="mb-2 text-base font-bold  text-[#2B313B]">{{ product.product_title }}</h4>
            </div>
            <div class="product-price-info flex items-center justify-between">
              <div class="flex items-center justify-start">
                <span class="text-[#2B313B] text-[8px] font-bold mr-1">Start from</span>
                <span class="price text-[#F22222] text-base font-black ">$277</span>
              </div>
              <!-- <span class="original-price line-through text-[#D3D7DE] text-xs font-normal">$390</span> <span class="saved-price bg-[#26BA65] text-white text-xs font-normal p-1 rounded">Saves €45.00</span>  -->
              <span class="rating-area flex items-top justify-between"><span class="icon mr-1"><svg width="14" height="13"
                    viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.54652 0.976481C6.72572 0.590614 7.27429 0.590616 7.45348 0.976482L8.86602 4.01808C8.93887 4.17496 9.08763 4.28304 9.25934 4.30385L12.5886 4.70734C13.0109 4.75853 13.1804 5.28025 12.8688 5.56992L10.4126 7.85323C10.2859 7.97099 10.2291 8.14587 10.2624 8.31561L10.9074 11.6066C10.9892 12.0241 10.5454 12.3465 10.1737 12.1397L7.24309 10.5092C7.09194 10.4252 6.90806 10.4252 6.75691 10.5092L3.82634 12.1397C3.45456 12.3465 3.01076 12.0241 3.09259 11.6066L3.73763 8.31561C3.7709 8.14587 3.71408 7.97099 3.58739 7.85323L1.13116 5.56992C0.819553 5.28025 0.989072 4.75853 1.41143 4.70734L4.74066 4.30385C4.91237 4.28304 5.06113 4.17495 5.13398 4.01808L6.54652 0.976481Z"
                      fill="#EFBC21" />
                  </svg>
                </span> <span class="rating-count text-[#6C7A93] text-xs font-normal">4.9 |
                  230</span></span>
            </div>
            <div class="flex justify-between items-center mt-2">
              <button
                class="btn-translate-z bg-[#112954] w-full opacity-100 hover:opacity-90 transition text-white flex text-sm font-bold text-center justify-center items-center rounded-md py-[10px] px-2"><span
                  class="flex items-center"><img src="@/assets/img/icons/offer-arrow-24.svg"
                    class="mr-2 h-4 w-4 float-right" alt="icon"> View Offer </span></button> <button
                class="view-icon py-2.5 px-2.5 ml-2 border transition-all border-[#112954] rounded-md"><svg width="16"
                  height="16" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 " xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.00001 9.5999C8.88366 9.5999 9.60001 8.88356 9.60001 7.9999C9.60001 7.11625 8.88366 6.3999 8.00001 6.3999C7.11635 6.3999 6.40001 7.11625 6.40001 7.9999C6.40001 8.88356 7.11635 9.5999 8.00001 9.5999Z"
                    fill-rule="evenodd" fill="currentColor" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M0.366211 7.99993C1.38561 4.75423 4.41785 2.3999 7.99998 2.3999C11.5821 2.3999 14.6143 4.75421 15.6337 7.99987C14.6143 11.2456 11.5821 13.5999 7.99996 13.5999C4.41786 13.5999 1.38563 11.2456 0.366211 7.99993ZM11.2 7.9999C11.2 9.76721 9.76732 11.1999 8.00001 11.1999C6.2327 11.1999 4.80001 9.76721 4.80001 7.9999C4.80001 6.23259 6.2327 4.7999 8.00001 4.7999C9.76732 4.7999 11.2 6.23259 11.2 7.9999Z"
                    fill="currentColor" />
                </svg>
              </button>
            </div>
          </nuxt-link>
        </div>
      </swiper-slide>


    </swiper>
  </div>
</template>

<style>
.switch-btn {
  width: 100%;
  align-items: center;
  display: flex;
  padding: 15px;
  border: 1px solid #F5F8FF;
  border-radius: 5px;
  cursor: pointer;
}

.more-filter label:last-child {
  margin-left: 10px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #DCE4F4;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked+.slider {
  background-color: #0051FF;
}

input:focus+.slider {
  box-shadow: 0 0 1px #0051FF;
}

input:checked+.slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.switch-btn .switch-text {
  white-space: nowrap;
  margin-right: 10px;
  color: #2B313B;
  font-size: 14px;
  font-weight: 400;
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.offer-list-inner {
  border: 1px solid #F5F8FF;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}

.offer-list-inner thead th {
  text-align: left;
  color: #2B313B;
  font-size: 12px;
  font-weight: 700;
  padding: 10px 0px 10px 0px;
}

.offer-list-inner thead {
  border-bottom: 1px solid #F5F8FF;
}

.offer-list-inner thead th:first-child {
  padding-left: 10px;
}

.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 14px;
  color: #2B313B;
  font-weight: bold;
  transition: 250ms;
}

.swiper-button-next,
.swiper-button-prev {
  background: #fff;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  transition: 250ms;
}

.swiper-button-next:hover:after,
.swiper-button-prev:hover:after {
  color: #fff;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background: #112954;
}

.swiper-button-next {
  right: 0;
}

.swiper-button-prev {
  left: 0;
}
</style>