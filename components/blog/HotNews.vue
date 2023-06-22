<script setup>
import { Pagination, A11y, Autoplay } from 'swiper';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import {readingTime,stripTrailingSlash,generateSlug,splitComma,convertTime,translatedText} from '../../helpers/helperFunctions'


const onSwiper = (swiper) => {
    console.log(swiper);
};
const onSlideChange = () => {
    console.log('slide change');
};
const modules = [Pagination, A11y, Autoplay];




// swiper slider module ends here

let apiUrl;
let imageUrl;

const props = defineProps(["category_id"]);

console.log(props.category_id);

const config = useRuntimeConfig();
apiUrl = config.public.api;
imageUrl = config.public.imageUrl;
const hotNewsArray = ref([]);

if(props.category_id){
    console.log('from cat');
    
    const { data: hotNews } = await useAsyncData('hot_news', () => $fetch(`${apiUrl}/blog-categories-filter/${props.category_id}`));   
    hotNewsArray.value = hotNews.value
     
}else{
    console.log('without cat');
    
    const { data: hotNews } = await useAsyncData('hot_news', () => $fetch(`${apiUrl}/highlighted-blogs`));
    hotNewsArray.value = hotNews.value

}


const {$wordsArray} = useNuxtApp();








onMounted(() => {
    refreshNuxtData('hot_news');
})

</script>



<style>
.blog-news {
    background: url("@/assets/img/background/blog-news-bg.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #F5F8FF;
}

.blog-news-slider .swiper-slide:after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(to bottom, #020C2E00 0%, #000212 100%);
    z-index: 1;
}

.blog-news-slider .swiper-slide {
    border-radius: 5px;
    overflow: hidden;
}

span.swiper-pagination-bullet {
    background: #BDCFF9;
    opacity: .9;
    height: 6px;
    width: 6px;
}

span.swiper-pagination-bullet.swiper-pagination-bullet-active:after {
    content: "";
    width: 14px;
    height: 14px;
    position: absolute;
    background: transparent;
    left: -4px;
    top: -4px;
    border-radius: 50%;
    border: 1px solid #0052FE;
}

span.swiper-pagination-bullet.swiper-pagination-bullet-active {
    position: relative;

    border-radius: 6px;
    background: #0052FE;
}

.blog-news-slider .swiper-wrapper {
    /* width: 668px !important; ; */
}

.blog-news-slider .swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets.swiper-pagination-horizontal {
    top: 0;
    left: auto;
    right: 10px;
    width: auto;
}

@media only screen and (max-width: 769px) {

    /* .swiper-horizontal>.swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction {
        display: none;
    } */
    .swiper {
        margin-top: 0;
    }
}
</style>



<template>
    <div class="heading-area mt-6 mb-4">
        <h3 class="flex items-center text-[#2B313B] font-bold text-[20px] mb-1">{{ translatedText($wordsArray,'Hot News') }} <img
                src="@/assets/img/promo/fire-icon.png" class="ml-1" alt="icon"></h3>
        <p class="tag-line text-[#6C7A93] text-sm font-normal">{{ translatedText($wordsArray,'Popular offers with high discounts') }}</p>
    </div>


    <div class="blog-news-slider flex flex-col md:flex-row items-stretch justify-between">
        <div class="h-[307px] md:h-[362px] w-full md:w-[72vw] lg:w-[668px]">
            <swiper :modules="modules" :slides-per-view="1" :space-between="0" autoplay :pagination="true"
                :loop="true" @swiper="onSwiper" @slideChange="onSlideChange">
                <swiper-slide v-for="(news, i) in hotNewsArray">
                    <!-- slider-area start -->
                    <div class="slider-area">

                        <div class="h-[307px] md:h-[362px] w-full lg:w-[668px] relative overflow-hidden rounded-[5px]">
                            <span class="overlay"></span>
                            <span
                                class="fixed-size overflow-hidden h-[307px] md:h-[362px] w-[96vw] md:w-[60vw] lg:w-[668px]">
                                <img class="object-cover absolute flex -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-auto h-auto mb-0"
                                    :src="stripTrailingSlash(imageUrl) + news.url" alt="icon">
                            </span>
                            <!-- <img src="@/assets/img/slider/001.jpg" class="absolute h-[362px] lg:h-auto w-full flex -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."> -->
                            <div
                                class="inner-content w-full z-20 grid grid-cols-1 gap-1 sm:gap-4 items-end h-[307px] md:h-[362px]">
                                <div class="bottom-content text-left flex flex-col">
                                    <nuxt-link :to="'/blog/'+generateSlug(news.blog_title)+'-'+news.id"><h2
                                        class="text-2xl md:text-[32px] font-bold text-white w-[290px] sm:w-[488px] leading-9 mb-3">
                                       {{ news.blog_title }}</h2>

                                    </nuxt-link>
                                    <div class="flex flex-nowrap items-center justify-between mt-2">
                                        <div class="news-tags flex flex-nowrap items-center">
                                           <span v-for="tag in splitComma(news.tags)"
                                                    class="w-fit bg-[#EBF1FF] text-[#0051FF] text-xs font-semibold mr-1 px-2.5 py-1.5 rounded whitespace-nowrap">{{ tag }}</span>
                                              
                                            
                                            
                                        </div>

                                        <div class="post-date text-xs font-normal text-white flex flex-row items-center">
                                            {{ convertTime(news.created_at) }} <svg class="ml-4 mr-1" width="10" height="10"
                                                viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M5 9C7.20914 9 9 7.20914 9 5C9 2.79086 7.20914 1 5 1C2.79086 1 1 2.79086 1 5C1 7.20914 2.79086 9 5 9ZM5.5 3C5.5 2.72386 5.27614 2.5 5 2.5C4.72386 2.5 4.5 2.72386 4.5 3V5C4.5 5.13261 4.55268 5.25979 4.64645 5.35355L6.06066 6.76777C6.25592 6.96303 6.5725 6.96303 6.76777 6.76777C6.96303 6.5725 6.96303 6.25592 6.76777 6.06066L5.5 4.79289V3Z"
                                                    fill="white" />
                                            </svg> {{ readingTime(news.content) }} Min {{ translatedText($wordsArray,'Read') }} 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <!-- slider-area end -->

                </swiper-slide>

             
        </swiper>
    </div>
    <div
        class="adds-area blog-news p-8 ml-0 mt-4 md:mt-0 md:ml-5 flex flex-col w-full md:w-[392px] bg-[#F5F8FF] rounded-[5px] mb-3 md:mb-0">
        <img src="@/assets/img/promo/top-img-1.png" class="w-[272px] h-auto mx-auto" alt="image">
        <h3 class="text-[32px] text-[#2B313B] font-black text-center my-2 mx-auto">Black Friday Gadgets</h3>
        <p class="text-[#6C7A93] font-normal mb-4 text-sm text-center mx-auto">Real offers with high discounts for Black
            Friday</p>
        <a href="#"
            class="p-3 text-center outline-btn btn-translate-z flex items-center justify-center bg-[#0052FE] hover:bg-[#1345b1] transition text-white text-xs font-bold rounded-[5px]">Join
            Black Friday
            <svg width="17" height="17" viewBox="0 0 17 17" class="ml-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8.73392 3.13422C9.04634 2.8218 9.55288 2.8218 9.8653 3.13422L14.6653 7.93422C14.9777 8.24664 14.9777 8.75317 14.6653 9.06559L9.8653 13.8656C9.55288 14.178 9.04634 14.178 8.73392 13.8656C8.42151 13.5532 8.42151 13.0466 8.73392 12.7342L12.1682 9.2999L2.89961 9.2999C2.45778 9.2999 2.09961 8.94173 2.09961 8.4999C2.09961 8.05807 2.45778 7.6999 2.89961 7.6999H12.1682L8.73392 4.26559C8.42151 3.95317 8.42151 3.44664 8.73392 3.13422Z"
                    fill="white" />
            </svg>
        </a>
    </div>
</div></template>
