<script setup>
import { stripTrailingSlash,generateSlug, splitComma, readingTime, convertTime } from '../../helpers/helperFunctions';
import CryptoJS from 'crypto-js';
const config = useRuntimeConfig();
const apiUrl = config.public.api;
const imageUrl = config.public.imageUrl;

const route = useRoute();
const keywords = route.query.keywords;

const { data: products } = await useAsyncData('search_products', () => $fetch(`${apiUrl}/search-products/${keywords}`));

console.log(products.value);





</script>
<style scoped>
.object-cover{
    height: 168px;
}
</style>

<template>
    <section class="bg-[#ffffff] w-full p-4 md:p-12">
        <div class="container mx-auto max-w-screen-xl"><!-- container start -->


            <h2 class="text-center">Search Results</h2>
            <div v-if="products.length > 0" class="center mt-8 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 justify-between">

                <div class="item" v-for="(product, i) in products" :key="i">
                    <nuxt-link :to="'/products/'+generateSlug(product.product_title)+'-'+product.id"
                        class="flex w-full lg:w-[255px] mb-3 p-2 flex-col transition-all border border-[#EBF1FF] rounded-lg hover:shadow-md md:flex-col bg-white">
                        <div class="img-box flex justify-center items-center relative h-[165px] w-full bg-[#F5F8FF]">
                            <div class="product-img"><img class="object-cover w-auto rounded-t-lg h-auto mx-auto"
                                    :src="stripTrailingSlash(imageUrl) + product.url" alt="image"></div>
                            
                        </div>
                        <div class="product-info mt-2 flex items-center justify-between">
                            <span v-for="(category,i) in splitComma(product.category_name)"
                                class="w-fit bg-[#EBF1FF] text-[#0052FE] text-xs font-bold p-2 rounded">{{ category }}
                            </span>
                        </div>
                        <div class="product-title mt-2">
                            <h4 class="mb-2 text-base font-bold text-[#2B313B]">{{ product.product_title }}</h4>
                        </div>
                        <div class="product-price-info flex flex-col md:flex-row items-center justify-between">
                            <div class="flex w-full md:w-auto items-center justify-between">
                                <div class="flex items-center justify-start"><span
                                        class="price text-[#F22222] text-base font-black mr-2">${{ product.price }}</span><span
                                        class="original-price line-through text-[#D3D7DE] text-xs font-normal">$390</span>
                                </div><span
                                    class="product-status md:hidden flex items-center text-[#1D9E54] font-normal text-xs"><img
                                        src="" class="mr-1 w-4 h-4" alt="icon">
                                    -24%</span>
                            </div>
                            <div class="flex w-full md:w-auto items-center justify-between"><span
                                    class="saved-price whitespace-nowrap mr-0 md:mr-2 order-2 md:order-1 bg-[#26BA65] text-white text-xs font-normal px-[6px] py-1 rounded">Saves
                                    €45.00</span><span
                                    class="rating-area mt-1 flex order-1 md:order-2 items-center justify-between"><span
                                        class="icon mr-1"><svg width="14" height="13" viewBox="0 0 14 13" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.54652 0.976481C6.72572 0.590614 7.27429 0.590616 7.45348 0.976482L8.86602 4.01808C8.93887 4.17496 9.08763 4.28304 9.25934 4.30385L12.5886 4.70734C13.0109 4.75853 13.1804 5.28025 12.8688 5.56992L10.4126 7.85323C10.2859 7.97099 10.2291 8.14587 10.2624 8.31561L10.9074 11.6066C10.9892 12.0241 10.5454 12.3465 10.1737 12.1397L7.24309 10.5092C7.09194 10.4252 6.90806 10.4252 6.75691 10.5092L3.82634 12.1397C3.45456 12.3465 3.01076 12.0241 3.09259 11.6066L3.73763 8.31561C3.7709 8.14587 3.71408 7.97099 3.58739 7.85323L1.13116 5.56992C0.819553 5.28025 0.989072 4.75853 1.41143 4.70734L4.74066 4.30385C4.91237 4.28304 5.06113 4.17495 5.13398 4.01808L6.54652 0.976481Z"
                                                fill="#EFBC21"></path>
                                        </svg></span><span class="rating-count text-[#6C7A93] text-xs font-normal">4.9 |
                                        230</span></span></div>
                        </div>
                        <div class="flex justify-between items-center mt-2">
                            <a href="" target="_blank"
                                class="btn-translate-z bg-[#112954] opacity-100 hover:opacity-90 transition text-white flex text-sm font-bold text-center justify-center items-center rounded-md py-[10px] px-2 w-full"><span
                                    class="flex items-center"><img src="@/assets/img/icons/offer-arrow-24.svg"
                                        class="mr-2 h-4 w-4 float-right" alt="icon"> View Offer </span></a>
                        </div>
                    </nuxt-link>
                </div>

            </div>

            <div v-else>
                <h2 class="text-center">Opps! No products found</h2>
            </div>


            <!-- <nav aria-label="Page navigation example" class="my-6 text-center">
                <ul class="flex items-center justify-end">
                    <li>
                        <a href="#" class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white hover:text-gray-700">
                            <span class="sr-only">Previous</span>
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700">1</a>
                </li>
                <li>
                    <a href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700">2</a>
                </li>
                <li>
                    <a href="#" aria-current="page"
                        class="z-10 px-3 py-2 bg-[#0052FE] leading-tight transition-all text-white rounded-lg hover:bg-[#0052FE] hover:text-white">3</a>
                </li>
                <li>
                    <a href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700">4</a>
                </li>
                <li>
                    <a href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700">5</a>
                </li>

                <li>
                    <a href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700">6</a>
                </li>
                <li>
                    <a href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white px-3 py-2 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700">7</a>
                </li>

                <li>
                    <a href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700">...</a>
                </li>
                <li>
                    <a href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700">100</a>
                </li>
                <li>
                    <a href="#"
                        class="block px-3 py-2 leading-tight text-gray-500 bg-white 700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span class="sr-only">Next</span>
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </a>
                </li>
            </ul>
        </nav> -->

        </div><!-- container end -->
    </section>
</template>