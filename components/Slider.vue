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
    data(){
        return{
            products:[],
        }
    }
}

</script>

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
               <HomeSilderItems :product="product"  />
            </swiper-slide>
         



        </swiper>


   

    </div>
</template>
   
