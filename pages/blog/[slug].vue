<script setup>
import CategoryHotNews from '../../components/blog/CategoryHotNews.vue';
import { stripTrailingSlash, splitComma, readingTime, convertTime,translatedText } from '../../helpers/helperFunctions'
const route = useRoute();


const config = useRuntimeConfig();
let apiUrl = config.public.api;
let imageUrl = config.public.imageUrl;

const id = route.params.slug;
const idArray = id.split('-');
const finalId = idArray.pop();

const {$wordsArray} = useNuxtApp();


const { data: blog_details } = await useAsyncData('blog_details', () => $fetch(`${apiUrl}/blog-details/${finalId}`));

onMounted(() => {
    refreshNuxtData('blog_details');
})



</script>
<script>

</script>
<style></style>
<template>
    <section class="bg-white w-full p-4 md:p-12">
        <div class="container mx-auto max-w-screen-xl flex-none md:flex md:flex-row"><!-- container start -->
            <div class="main-area basis-full p-2 md:p-3 lg:p-0 md:basis-3/5 lg:w-[668px]">
                <div class="post-detail">

                    <img class="rounded-[5px] my-3" :src="stripTrailingSlash(imageUrl) + blog_details[0].url" alt="image">

                    <h1 class="font-bold text-[32px] text-[#2B313B] leading-none mb-6">{{ blog_details[0].blog_title }}</h1>
                    <div class="post-info flex-none md:flex md:justify-between">
                        <span class="publish-date-time  text-[#6C7A93] font-normal text-xs">{{
                            convertTime(blog_details[0].created_at) }} • {{ translatedText($wordsArray,'Read') }}: {{ readingTime(blog_details[0].content) }}
                            min</span>

                        <span class="social-shear flex items-center">
                           
                            <ul class="flex flex-row justify-end">
                                <li class="flex ml-2"> 
                                    <ShareNetwork
                                     network="facebook" 
                                    :title="blog_details[0].blog_title"
                                    :url="currentUrl"
                                     class=" ml-2"><span class="flex relative">
                                            <span
                                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span><img
                                                class=" h-5 w-5" src="@/assets/img/social/facebook24.svg" alt="">
                                        </span>
                                    
                                    </ShareNetwork>
                                    </li>
                                <li class="flex ml-2">
                                    <ShareNetwork  network="twitter" 
                                    :title="blog_details[0].blog_title"
                                    :url="currentUrl"
                                   ><img
                                            class="blob infinity rounded-full h-5 w-5"
                                            src="@/assets/img/social/twitter24.svg" alt="">
                                        </ShareNetwork ></li>
                           
                            </ul>
                        </span>
                    </div>
                    <p class="text-[#2B313B] font-normal text-xs mb-6 leading-6">{{ blog_details[0].short_description }}
                    </p>


                    <div class="info-area py-4">
                        <!-- info area start -->
                        <div class="single-info">

                            <p v-html="blog_details[0].content"></p>

                            <!-- <div class="more-about bg-[#F3F7FF] p-8 rounded-[10px]">
                                        <h3 class="text-[#2B313B] text-xl mb-4">Inhoud</h3>
                                        <ul class=" list-inside list-decimal">
                                            <li><a href="" class="text-[#0052FE] text-lg font-normal">Black Friday discounts up to 250 euros at Rowenta</a></li>
                                            <li><a href="" class="text-[#0052FE] text-lg font-normal">The best Black Friday promotions of 2022 from Tefal</a></li>
                                            <li><a href="" class="text-[#0052FE] text-lg font-normal">Black Friday deals at VitalFarma</a></li>
                                            <li><a href="" class="text-[#0052FE] text-lg font-normal">World Cup 2022 starts on Sunday: These are the best</a></li>
                                            <li><a href="" class="text-[#0052FE] text-lg font-normal">Option discount at Welkoop until 30 October</a></li>
                                            <li><a href="" class="text-[#0052FE] text-lg font-normal">The best 65 inch TV deals of October 2022</a></li>
                                            <li><a href="" class="text-[#0052FE] text-lg font-normal">Slow cooker: What is it and what are its benefits?</a></li>
                                            <li><a href="" class="text-[#0052FE] text-lg font-normal">Black Friday comes early: VPN offer with 59% discount at NordVPN</a></li>
                                        </ul>
                                        
                                    </div>
                                <p class="text-[#2B313B] font-normal text-xs mb-6 leading-6">Buy your favourite Tefal products now during Black Friday and benefit from attractive discounts of up to €150. Tefal is known for its high-quality cookware and appliances, so don't miss this opportunity to complement your kitchen with their latest innovations. Whether you're looking for a new pan set, fridge or kettle, Tefal offers everything you need in the kitchen at a competitive price. Be quick, because the offers are only valid for a limited time.</p>
                                    <h2 class="text-[#2B313B] text-base font-bold mb-3">What is Rowenta's most popular Black Friday offer?</h2>
                                <p class="text-[#2B313B] font-normal text-xs mb-6 leading-6">Tefal's Black Friday offers are valid until 28 November. Tefal offers discounts of up to €150 euros on hot air fryers, multicookers, grills, ironing products, pans and more. Whether you want to upgrade products in your kitchen yourself, or are looking for a nice gift for the holidays, Tefal has you covered. When you add a product to your shopping cart on tefal's official website, the discount is immediately visible and is reflected in the price of the product. Any cashback you get on products will be added to this.</p> -->
                        </div>
                    </div>
                </div>
                <div class="bottom-part flex-none lg:flex lg:justify-between">
                    <div class="w-full lg:w-auto more-links">
                        <h5 class=" font-bold text-xs text-black mb-2">{{ translatedText($wordsArray,'tags') }}</h5>
                        <div class="flex-wrap flex md:flex-none items-center">




                            <span class="w-fit bg-[#EBF1FF] text-[#0051FF] ml-1 text-xs font-bold px-2.5 py-1.5 rounded"
                                v-for="tag in splitComma(blog_details[0].tag_name)">{{ tag }}</span>





                        </div>
                    </div>
                    <div class="w-full mt-4 lg:mt-0 lg:w-auto social-links text-left">
                        <h5 class="font-bold text-xs text-black mb-2">{{ translatedText($wordsArray,'share this article') }}</h5>
                        <ul class="flex flex-row justify-start">
                            <li class="flex mr-2"> <a href="#" class=" mr-2"><span class="flex relative">
                                        <span
                                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span><img
                                            class=" h-5 w-5" src="@/assets/img/social/facebook24.svg" alt=""> </span></a>
                            </li>
                            <li class="flex mr-2"><a href="#" class=" mr-2"><img class="blob infinity rounded-full h-5 w-5"
                                        src="@/assets/img/social/twitter24.svg" alt=""> </a></li>
                            <li class="flex mr-2"> <a href="#" class=" mr-2"><span class="flex relative">
                                        <span
                                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span><img
                                            class="h-5 w-5" src="@/assets/img/social/instagram24.svg" alt=""></span> </a>
                            </li>
                            <li class="flex mr-2"><a href="#" class=" mr-2"><img class="blob infinity rounded-full h-5 w-5"
                                        src="@/assets/img/social/youtube24.svg" alt=""> </a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="side-bar basis-full md:basis-2/5 lg:w-[392px]">
                <div class="inner-area ml-0 lg:ml-4 p-2 md:p-0">
                    <div class="accordion mb-3">

                </div>

                <CategoryHotNews :product_id="finalId" :category_id="blog_details[0].category_id" />

            </div>
        </div>


    </div><!-- container end -->
</section>
<section class="bg-white w-full p-4 md:p-12">
    <div class="container mx-auto max-w-screen-xl flex-none"><!-- container start -->
        <BlogProducts :product_category="blog_details[0].product_category" />
    </div>
</section>
</template>

<script>
export default{
    data(){
        return{
            currentUrl:''
        }
    },
    created() {
        if (typeof window !== "undefined") {
      this.currentUrl = window.location.href;

     
      
      
    }
    },
}
</script>