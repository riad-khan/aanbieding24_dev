<template>
    <div class="center grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 justify-between">
        <div class="item" v-for="(product,i) in products">
            <nuxt-link :to="'/products/'+generateSlug(product.product_title)+'-'+product.id"
                class="flex w-60 mb-3 p-2 flex-col transition-all border border-[#EBF1FF]  rounded-lg hover:shadow-md md:flex-col  bg-white">
                <div class="img-box flex justify-center items-center relative h-[165px] w-full bg-[#F5F8FF]">
                    <div class="product-img">
                        <img class="object-cover w-auto rounded-t-lg h-auto mx-auto" :src="stripTrailingSlash(imageUrl)+product.url"
                            alt="image">
                    </div>
                    <div class="brand-logo">
                        <img src="@/assets/img/providers/bol.com.png" alt="icon">
                    </div>
                </div>
                <div class="product-info mt-2 flex items-center justify-between">
                    <span v-for="(category) in splitComma(product.category_name)" class="w-fit bg-[#EBF1FF] text-[#0052FE] text-xs font-bold p-2 rounded ">{{ category }}</span>


                    <span class="product-status flex items-center text-[#1D9E54] font-normal text-xs"><img
                            src="@/assets/img/icons/sell-arrow-green.svg" class="mr-1 w-4 h-4" alt="icon"> -24%</span>
                </div>
                <div class="product-title mt-2">
                    <h4 class="mb-2 text-base font-bold  text-[#2B313B]">{{ product.product_title }}</h4>
                </div>
                <div class="product-price-info flex items-center justify-between">
                    <span class="price text-[#F22222] text-base font-black ">${{product.price}}</span> <span
                        class="original-price line-through text-[#D3D7DE] text-xs font-normal">$390</span> <span
                        class="saved-price bg-[#26BA65] text-white text-xs font-normal p-1 rounded">Saves €45.00</span>
                    <span class="rating-area flex items-top justify-between"><span class="icon mr-1"><svg width="14"
                                height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.54652 0.976481C6.72572 0.590614 7.27429 0.590616 7.45348 0.976482L8.86602 4.01808C8.93887 4.17496 9.08763 4.28304 9.25934 4.30385L12.5886 4.70734C13.0109 4.75853 13.1804 5.28025 12.8688 5.56992L10.4126 7.85323C10.2859 7.97099 10.2291 8.14587 10.2624 8.31561L10.9074 11.6066C10.9892 12.0241 10.5454 12.3465 10.1737 12.1397L7.24309 10.5092C7.09194 10.4252 6.90806 10.4252 6.75691 10.5092L3.82634 12.1397C3.45456 12.3465 3.01076 12.0241 3.09259 11.6066L3.73763 8.31561C3.7709 8.14587 3.71408 7.97099 3.58739 7.85323L1.13116 5.56992C0.819553 5.28025 0.989072 4.75853 1.41143 4.70734L4.74066 4.30385C4.91237 4.28304 5.06113 4.17495 5.13398 4.01808L6.54652 0.976481Z"
                                    fill="#EFBC21" />
                            </svg>
                        </span> <span class="rating-count text-[#6C7A93] text-xs font-normal">4.9 | 230</span></span>
                </div>
                <div class="flex justify-between items-center mt-2">
                    <button
                        class="btn-translate-z bg-[#112954] opacity-100 hover:opacity-90 transition text-white flex text-sm font-bold text-center justify-center items-center rounded-md py-[10px] px-2 w-full"><span
                            class="flex items-center"><img src="@/assets/img/icons/offer-arrow-24.svg"
                                class="mr-2 h-4 w-4 float-right" alt="icon"> View Offer </span></button>
                </div>
            </nuxt-link>
        </div>


    </div>
    <div class="load-more-btn text-center">
        <button @click="loadMore()"
            class="view-icon py-2.5 px-2.5 mt-8 border transition-all border-[#112954] text-[#112954] rounded-md w-32 hover:text-white">Show
            More</button>
    </div>
</template>

<script setup>
const config = useRuntimeConfig();
apiUrl = config.public.api;
imageUrl = config.public.imageUrl
</script>

<script>
import {stripTrailingSlash,generateSlug,splitComma} from '../../helpers/helperFunctions'
let apiUrl;
let imageUrl;
import axios from 'axios';
export default {
    data() {
        return {
            products: [],
            pageNumber: 0,
        }
    },
    mounted() {
        this.fetchDailyOfferProducts();
    },
    methods: {
        async fetchDailyOfferProducts() {
            try {
                const response = await axios.get(`${apiUrl}/daily-offers/${this.pageNumber}`)
                if (response.status === 200) {
                    response.data.map((item)=>{
                        this.products.push(item)
                    })
                    this.pageNumber = 1;
               }

            } catch (error) {
                console.log(error);

            }
        },
        async loadMore(){
            try {
                const page = this.pageNumber++
                const response = await axios.get(`${apiUrl}/daily-offers/${page}`)
                if (response.status === 200) {
                    response.data.map((item)=>{
                        this.products.push(item)
                    })
                   
               }

            } catch (error) {
                console.log(error);

            }
            
        }
    }
}

</script>