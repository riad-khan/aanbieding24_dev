<script setup>
import { Pagination, A11y, Autoplay } from 'swiper';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const onSwiper = (swiper) => {
    console.log(swiper);
};
const onSlideChange = () => {
    console.log('slide change');
};
const modules = [Pagination, A11y, Autoplay];

let apiUrl;
let imageUrl;

//nav icon change start
const config = useRuntimeConfig();
apiUrl = config.public.api;
imageUrl = config.public.imageUrl;
const { data: Products } = await useAsyncData('flash_sale', () => $fetch(`${apiUrl}/flash-sale-products`));
onMounted(() => {
    refreshNuxtData('flash_sale');
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
const splitCommaFromCategory = (category) =>{
    return category.split(',');
}


</script>




<style>
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
        }" :modules="modules" :slides-per-view="4" :space-between="25" autoplay navigation :loop="true" @swiper="onSwiper"
            @slideChange="onSlideChange">



            <swiper-slide v-for="(featured, i) in Products" :key="i">
                <div class="items">

                    <nuxt-link :to="'/products/'+generateSlug(featured.product_title)+'-'+featured.id"
                        class="flex w-60 mb-3 p-2 flex-col transition-all border border-[#EBF1FF]  rounded-lg hover:shadow-md md:flex-col  bg-white">
                        <div class="img-box flex justify-center items-center relative h-[165px] w-full bg-[#F5F8FF]">
                            <div class="product-img">
                                <img class="object-cover w-auto rounded-t-lg h-auto mx-auto"
                                    :src="stripTrailingSlash() + featured.url" alt="image">
                            </div>
                            <div class="brand-logo">
                                <img src="@/assets/img/providers/bol.com.png" alt="icon">
                            </div>
                        </div>

                        
                        <div class="product-info mt-2 flex items-center justify-between">
                            <span v-for="category in splitCommaFromCategory(featured.category_name)"
                                class="w-fit bg-[#EBF1FF] text-[#0052FE] text-xs font-bold p-2 rounded ">{{ category }}</span>
                            <span class="product-status flex items-center text-[#1D9E54] font-normal text-xs"><img
                                    src="@/assets/img/icons/sell-arrow-green.svg" class="mr-1 w-4 h-4" alt="icon">
                                -24%</span>
                        </div>
                        <div class="product-title mt-2">
                            <h4 class="mb-2 text-base font-bold  text-[#2B313B]">{{ featured.product_title }}</h4>
                        </div>
                        <div class="product-price-info flex items-center justify-between">
                            <span class="price text-[#F22222] text-base font-black ">${{ featured.price }}</span> <span
                                class="original-price line-through text-[#D3D7DE] text-xs font-normal">$390</span> <span
                                class="saved-price bg-[#26BA65] text-white text-xs font-normal p-1 rounded">Saves
                                €45.00</span> <span class="rating-area flex items-top justify-between"><span
                                    class="icon mr-1"><svg width="14" height="13" viewBox="0 0 14 13" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M6.54652 0.976481C6.72572 0.590614 7.27429 0.590616 7.45348 0.976482L8.86602 4.01808C8.93887 4.17496 9.08763 4.28304 9.25934 4.30385L12.5886 4.70734C13.0109 4.75853 13.1804 5.28025 12.8688 5.56992L10.4126 7.85323C10.2859 7.97099 10.2291 8.14587 10.2624 8.31561L10.9074 11.6066C10.9892 12.0241 10.5454 12.3465 10.1737 12.1397L7.24309 10.5092C7.09194 10.4252 6.90806 10.4252 6.75691 10.5092L3.82634 12.1397C3.45456 12.3465 3.01076 12.0241 3.09259 11.6066L3.73763 8.31561C3.7709 8.14587 3.71408 7.97099 3.58739 7.85323L1.13116 5.56992C0.819553 5.28025 0.989072 4.75853 1.41143 4.70734L4.74066 4.30385C4.91237 4.28304 5.06113 4.17495 5.13398 4.01808L6.54652 0.976481Z"
                                            fill="#EFBC21" />
                                    </svg>
                                </span> <span class="rating-count text-[#6C7A93] text-xs font-normal">4.9 |
                                    230</span></span>
                        </div>
                        <div class="flex justify-between items-center mt-2">
                            <button
                                class="btn-translate-z bg-[#112954] opacity-100 hover:opacity-90 transition text-white flex text-sm font-bold text-center justify-center items-center rounded-md py-[10px] px-2 w-full"><span
                                    class="flex items-center"><img src="@/assets/img/icons/offer-arrow-24.svg"
                                        class="mr-2 h-4 w-4 float-right" alt="icon"> View Offer </span></button>
                        </div>
                    </nuxt-link>
                </div>
            </swiper-slide>



        </swiper>
    </div>
</template>
   
