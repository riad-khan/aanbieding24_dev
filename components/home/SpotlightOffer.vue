<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, A11y, Autoplay } from 'swiper';
import { stripTrailingSlash, splitComma, readingTime, convertTime, generateSlug } from '../../helpers/helperFunctions';
// Import Swiper Vue.js components




const onSwiper = (swiper) => {

};
const onSlideChange = () => {

};
const modules = [Pagination, A11y, Autoplay];

const config = useRuntimeConfig();
const apiUrl = config.public.api;
const imageUrl = config.public.imageUrl

const props = defineProps(["product_id", "section_title", "section_id", "button_text", "offer_text"]);

const { data: spotLight } = await useAsyncData('get_spotlight', () => $fetch(`${apiUrl}/spotlight-products/${props.product_id}/${props.section_id}`));

let products = {};
products[props.section_title] = spotLight.value;

let lastproduct = products[props.section_title][products[props.section_title].length - 1];
function limitText(text, limit) {
    if (text.length <= limit) {
        return text;
    } else {
        return text.slice(0, limit) + '...';
    }
}

const productsArray = products[props.section_title];
const newArray = productsArray.slice(1, -1);
const midPoint = Math.ceil(newArray.length / 2);
const slider1Data = newArray.slice(0, midPoint);
const slider2Data = newArray.slice(midPoint);


</script>

<script>

export default {




};

</script> 
<style >
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

.spotlight-offer-area .swiper-button-prev {
    display: none;
}

.spotlight-offer-area .swiper-button-next {
    top: 25px;
    background: #112954;
    border: 1px solid #112954;
}

.spotlight-offer-area .swiper-button-next::after {
    color: #fff;
}

.spotlight-offer-area .swiper-button-next:hover {
    background: transparent;
}

.spotlight-offer-area .swiper-button-next:hover:after {
    color: #112954;
}
.offer-img img {
    float: right;
}
</style>
<template>
    <div class="spotlight-offer-area">
        <div class="grid gap-2 grid-cols-1 md:grid-cols-2 md:gap-4">
            <div class="single-offer-box relative h-[400px] rounded-md p-[30px]">
                <div class="product-offer-detail flex items-center justify-between mb-2">
                    <span class="font-normal text-sm text-[#F22222]">{{ offer_text }}</span><span
                        class="w-fit bg-[#EBF1FF] text-[#0052FE] text-xs font-bold p-2 rounded ">Computer & Laptop</span>
                </div>
                <div class="grid grid-cols-3 z-10 relative">
                    <div class="offer-details col-span-2">

                        <nuxt-link :to="'/products/' + generateSlug(products[section_title][0].product_title) + '-' + products[section_title][0].id"
                        class="flex items-center text-[#2B313B] font-bold text-base mb-1">{{
                            products[section_title][0].product_title }}
                    </nuxt-link>
                        
                        <p class="text-[#6C7A93] text-sm font-normal mb-4 w-[245px]">{{
                            products[section_title][0].short_description
                        }}</p>
                        <div class="button-area w-48">
                            <button
                                class="btn-translate-z bg-[#112954] w-full opacity-100 hover:opacity-90 transition text-white flex text-sm font-bold text-center justify-center items-center rounded-md py-[10px] px-2"><span
                                    class="flex items-center"> {{ button_text }} </span></button>
                        </div>

                    </div>
                </div>
                <div class="offer-img z-[1] w-auto pb-6 md:w-2/5 m-0">
                    <img :src="stripTrailingSlash(imageUrl) + products[section_title][0].url" alt="image">
                </div>
            </div>





            <div class="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
                <div class="grid grid-cols-1 gap-2 md:gap-4">
                    <div class="single-offer-box h-[192px] rounded-md p-4">
                        <swiper :modules="modules" :slides-per-view="1" :space-between="0" autoplay navigation :loop="true"
                            @swiper="onSwiper" @slideChange="onSlideChange">
                            <swiper-slide v-for="(sildeItem, i) in slider1Data" :key="i">
                                <div>
                                    <nuxt-link :to="'/products/' + generateSlug(sildeItem.product_title) + '-' + sildeItem.id"
                                        class="flex items-center text-[#2B313B] font-bold text-base mb-1">{{
                                            sildeItem.product_title }}
                                    </nuxt-link>
                                    <p class="tag-line text-[#6C7A93] text-xs font-normal mb-5">{{
                                        limitText(sildeItem.short_description, 30) }}</p>
                                    <div class="product-img flex items-center justify-center">
                                        <img :src="stripTrailingSlash(imageUrl) + sildeItem.url" alt="image">
                                    </div>
                                </div>
                            </swiper-slide>

                        </swiper>


                    </div>
                    <div class="single-offer-box h-[192px] rounded-md p-4">
                        <swiper :modules="modules" :slides-per-view="1" :space-between="0" autoplay navigation :loop="true"
                            @swiper="onSwiper" @slideChange="onSlideChange">
                            <swiper-slide v-for="(sildeItem, i) in slider2Data" :key="i">
                                <div>
                                    <nuxt-link :to="'/products/' + generateSlug(sildeItem.product_title) + '-' + sildeItem.id"
                                        class="flex items-center text-[#2B313B] font-bold text-base mb-1">{{
                                            sildeItem.product_title }}
                                    </nuxt-link>
                                    <p class="tag-line text-[#6C7A93] text-xs font-normal mb-5">{{
                                        limitText(sildeItem.short_description, 30) }}</p>
                                    <div class="product-img flex items-center justify-center">
                                        <img :src="stripTrailingSlash(imageUrl) + sildeItem.url" alt="image">
                                    </div>
                                </div>
                            </swiper-slide>

                        </swiper>

                    </div>
                </div>

                <div class="single-offer-box rounded-md p-4">
                    <nuxt-link :to="'/products/' + generateSlug(lastproduct.product_title) + '-' + lastproduct.id"
                        class="text-[#2B313B] font-black text-2xl italic leading-tight mb-4 flex">{{
                            lastproduct.product_title }}
                    </nuxt-link>

                    <p class="text-[#6C7A93] text-sm font-normal mb-2 w-auto lg:w-[245px]">
                        {{ limitText(lastproduct.short_description, 50) }}
                    </p>
                    <div class=" h-[187px] w-full overflow-hidden p-4">
                        <img :src="stripTrailingSlash(imageUrl) + lastproduct.url" class=" object-contain w-full h-full" alt="">
                    </div>
                    <div class="button-area mt-4">
                        <button
                            class="btn-translate-z bg-[#112954] w-full opacity-100 hover:opacity-90 transition text-white flex text-sm font-bold text-center justify-center items-center rounded-md py-[10px] px-2"><span
                                class="flex items-center"> {{ button_text }} </span></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>