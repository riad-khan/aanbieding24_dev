<script setup>
import {stripTrailingSlash,translatedText} from '../../helpers/helperFunctions'
    const config = useRuntimeConfig();
    const apiUrl = config.public.api;
    const props = defineProps(['product_id',"product_image"]);
    const imageUrl = config.public.imageUrl;

    const {data : reviews} = await useLazyAsyncData('fetch_reviews',()=>$fetch(`${apiUrl}/products-reviews/${props.product_id}`));

   
    

    onMounted(()=>{
        refreshNuxtData('fetch_reviews');
    })
</script>

<template>
    <div class="heading-area my-6">
        <h2 class="flex items-center text-[#2B313B] font-bold text-[20px] mb-1">Reviews</h2>
        <p class="tag-line text-[#6C7A93] text-sm font-normal">Read popular reviews of the Nintendo Switch - OLED model from
            real consumers.</p>
    </div>
    <div class="reviews table-auto overflow-x-auto">
        <div class="flex flex-row items-center justify-between">

            <div class="single-review" v-for="(review,i) in reviews">
                <a href="#"
                    class="flex w-[200px] p-2 flex-col transition-all border border-[#EBF1FF]  rounded-lg hover:shadow-md md:flex-col  bg-white">
                    <div class="img-box flex justify-center items-center relative h-[168px] w-auto bg-[#F5F8FF]">
                        <div class="product-img">
                            <img class="object-cover w-auto rounded-t-lg h-[85px] mx-auto"
                                :src="stripTrailingSlash(imageUrl)+product_image" alt="image">
                        </div>
                        <div class="brand-logo" v-if="provider_image">
                            <img src="" alt="icon">
                        </div>
                    </div>
                    <div class="product-title mt-2">
                        <h4 class="mb-2 text-xl font-bold text-[#2B313B]">{{ review.review }}</h4>
                    </div>
                    <div class="rating-wrapper flex items-center justify-start" >

                        <svg v-for="(star,i) in review.ratings" width="14" height="13" viewBox="0 0 14 13" class="mr-1" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.13024 0.533004C6.51342 -0.142371 7.48658 -0.142373 7.86976 0.533002L9.32447 3.09699C9.46691 3.34805 9.71089 3.52532 9.99368 3.58321L12.8817 4.17439C13.6424 4.33012 13.9432 5.25565 13.4193 5.82878L11.4303 8.0046C11.2355 8.21766 11.1423 8.50447 11.1747 8.79132L11.5049 11.7207C11.5918 12.4923 10.8045 13.0643 10.0976 12.7431L7.4136 11.5239C7.15079 11.4045 6.84921 11.4045 6.5864 11.5239L3.90245 12.7431C3.19547 13.0643 2.40816 12.4923 2.49514 11.7207L2.82534 8.79132C2.85767 8.50448 2.76447 8.21766 2.56972 8.0046L0.580749 5.82878C0.0568383 5.25565 0.357563 4.33012 1.11829 4.17439L4.00631 3.58321C4.28911 3.52532 4.53309 3.34805 4.67553 3.09699L6.13024 0.533004Z"
                                fill="#EFBC21" />
                        </svg>
                     
                      
                       

                    </div>
                    <div class="reviewer-name mt-2 text-xs font-bold text-[#2B313B]">
                        {{ review.name }}
                    </div>
                    <div class="publish-date text-xs font-bold text-[#6C7A93]">
                        {{ review.date }}
                    </div>
                    <button target="_blank"
                        class="flex items-center justify-center border w-full border-[#0052FE] mt-5 p-1 text-[#0052FE] hover:text-white hover:bg-[#0052FE] transition rounded font-bold text-xs">
                        View Source <svg width="13" height="13" viewBox="0 0 13 13" class="mx-2" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.6875 2.5625H2.5625V10.4375H10.4375V6.3125M10.4375 2.5625L6.3125 6.6875M8.5625 1.8125H11.1875V4.4375"
                                stroke="#0052FE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg></button>
                </a>
            </div>
           
    </div>
</div>
</template>
<style>.reviews a button:hover svg path {
    stroke: #fff;
}

.single-review {
    margin-right: 20px;
}

.single-review:last-child {
    margin-right: 0;
}</style>