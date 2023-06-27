<script setup>
import FlashSale from '../components/home/FlashSale.vue';
import { stripTrailingSlash, splitComma, readingTime, convertTime } from '../helpers/helperFunctions';

const config = useRuntimeConfig();
apiUrl = config.public.api;
const imageUrl = config.public.imageUrl;


const { data: promoData } = await useAsyncData('get_promoData', () => $fetch(`${apiUrl}/home-banner`));
const { data: sectionData } = await useAsyncData('section_data', () => $fetch(`${apiUrl}/home-sections`));






onMounted(() => {
    refreshNuxtData('section_data');
    refreshNuxtData('get_promoData');
})

useHead({
    titleTemplate: `Aanbieding24`,
    meta: [
        {
            name: 'description', content: 'Aanbieding24 homepage'
        },
        {
            name: 'keywords', content: 'affiliate,shop'
        },
        {
            property: 'og:title',
            content: `Aanbieding24`
        },
        {
            property: 'og:description',
            content: `Aanbieding24 homepage`
        },
        {
            property: 'twitter:title',
            content: `Aanbieding24`
        },
        {
            property: 'twitter:description',
            content: `Aanbieding24 homepage`
        }

    ]
})


</script>
<template>
    <section class="bg-white w-full p-4 md:p-12">
        <div class="container mx-auto max-w-screen-xl">
            <!-- container start -->
            <div class="promo-top grid gap-2 grid-cols-1 md:gap-4 md:grid-cols-2 mb-12">

                <div
                    class="content content-center text-center bg-[#F5F8FF] p-9 md:p-4 lg:p-9 md:text-left grid gap-2 grid-cols-1 md:grid-cols-2 md:items-center">
                    <div class="img-box mx-auto h-auto w-40 md:h-40 ">
                        <img :src="stripTrailingSlash(imageUrl) + promoData[0].left_image" class="mx-auto md:mx-0"
                            alt="image">
                    </div>
                    <div class="text-content text-center md:text-left">
                        <h3 class="text-[32px] md:text-[26px] lg:text-[32px] font-black  mb-2 text-[#2B313B]">{{
                            promoData[0].top_left_section_title }}</h3>
                        <p class="text-sm font-normal text-[#6C7A93] mx-auto md:mx-0">{{
                            promoData[0].top_left_section_subtitle }}</p>

                        <a href="#"
                            class="outline-btn btn-translate-z flex w-fit m-auto md:m-0 bg-[#0052FE] opacity-100 hover:opacity-90 transition text-white text-sm font-bold py-2.5 px-4 rounded-lg">{{
                                promoData[0].top_left_section_button_text }}
                            <img src="@/assets/img/arrow-right-white-bg.svg" class="ml-2 w-[18px]" alt="icon"></a>
                    </div>
                </div>



                <div
                    class="content content-center text-center bg-[#F5F8FF] p-9 md:p-4 lg:p-9 md:text-left grid gap-2 grid-cols-1 md:grid-cols-2 md:items-center">
                    <div class="img-box mx-auto h-auto w-40 md:h-40 ">
                        <img :src="stripTrailingSlash(imageUrl) + promoData[0].right_image" class="mx-auto md:mx-0"
                            alt="image">
                    </div>
                    <div class="text-content text-center md:text-left">
                        <h3 class="text-[32px] md:text-[26px] lg:text-[32px] font-black  mb-2 text-[#2B313B]">
                            {{ promoData[0].top_right_section_title }}</h3>
                        <p class="text-sm font-normal text-[#6C7A93] mx-auto md:mx-0">
                            {{ promoData[0].top_right_section_subtitle }}</p>

                        <a href="#"
                            class="outline-btn btn-translate-z flex w-fit m-auto md:m-0 bg-[#0052FE] opacity-100 hover:opacity-90 transition text-white text-sm font-bold py-2.5 px-4 rounded-lg">{{
                                promoData[0].top_right_section_button_text }}
                            <img src="@/assets/img/arrow-right-white-bg.svg" class="ml-2 w-[18px]" alt="icon"></a>
                    </div>
                </div>

            </div>

            <!-- providers start -->



            <div class="provides-info-area mt-12" v-for="(section, index) in sectionData" :key="section.id">
                <h2 class="flex items-center text-[#2B313B] font-bold text-[20px] mb-1">{{ section.section_title }} <img
                        :src="stripTrailingSlash(imageUrl) + section.icon" class="ml-1" alt="icon"></h2>
                <p class="tag-line text-[#6C7A93] text-sm font-normal mb-6">{{ section.section_subtitle }}</p>


                <homeBestProviders v-if="section.section_style == 'Provider Style' || section.provider_id"
                    :provider_list="getProviders(section.provider_id, section.section_title, section.id)"
                    :section_title="section.section_title" />

                <Slider
                    v-if="section.section_style == 'Carousel' && section.product_id !== null && section.provider_id == null && section.category_id == null"
                    :products="getProducts(section.product_id, section.section_title)"
                    :section_title="section.section_title" />

                <HomeCategoryOffer
                    v-if="section.section_style == 'Category style' && section.category_id !== null && section.provider_id == null"
                    :category="getCategories(section.category_id,section.section_title,section.id)
                    "
                    :section_title="section.section_title" />

                   
                    <HomeSpotlightOffer 
                    v-if="section.section_style === 'Mesonary Grid'"
                     :product_id = "section.product_id"
                     :section_title = "section.section_title"
                     :section_id = "section.id"
                     :button_text = "section.button_text"
                     :offer_text = "section.offer_text"
                    />
                    

            </div>
            <!-- providers End -->


            <div class="articles-area mt-10">
                <div class="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10">
                    <div>
                        <h5 class="text-[#2B313B] text-xl font-bold mb-[14px]">Offers for the best products</h5>
                        <p class="text-[#6C7A93] text-base font-normal leading-relaxed">Actuele-aanbiedingen.nl is for
                            anyone looking for good products at the best price. The internet makes it easier and easier to
                            quickly scour different websites in search of the best deals, but we noticed that it still takes
                            a lot of time and effort to compare all the offers of all shops. For a laptop offer, for
                            example, you quickly have to look at more than five websites, so you quickly overlook a nice
                            deal.</p>
                    </div>
                    <div>
                        <h5 class="text-[#2B313B] text-xl font-bold mb-[14px]">How we keep our offers up-to-date every day
                        </h5>
                        <p class="text-[#6C7A93] text-base font-normal leading-relaxed">We have developed a special
                            algorithm that automatically searches for the best deals. Every day our systems scan the largest
                            websites in search of the highest discounts. The latest offers will automatically appear on our
                            website, and expired promotions will be automatically deleted. Our offers are updated several
                            times a day, and our prices are therefore always up-to-date. Our customer promise.</p>
                    </div>
                </div>
            </div>

            <HomeFavoriteOffers />
            
            <HomeMoreOffers />


        </div> <!-- container end -->
    </section>
</template>

<script>
let apiUrl;
import axios from 'axios';
export default {
    data() {
        return {
            products: {},
            providers: {},
            categories: {},
           
        }
    },

    methods: {
        getProducts(product_id, section_title) {
            axios.get(`${apiUrl}/lowest-price-products/${product_id}`)
                .then((response) => {
                    this.products[section_title] = response.data

                   
                })

            return this.products;



        },
        getProviders(provider_id, section_title, section_id) {
            axios.get(`${apiUrl}/provider-list/${provider_id}/${section_id}`)
                .then((response) => {
                    this.providers[section_title] = response.data

                })

           


            return this.providers;

        },
        getCategories(category_id, section_title, section_id) {
            axios.get(`${apiUrl}/categories-list/${category_id}/${section_id}`)
                .then((response) => {
                    this.categories[section_title] = response.data

                })

          


            return this.categories;

        },
        getSpotLightProducts(product_id, section_title, section_id) {
            axios.get(`${apiUrl}/spotlight-products/${product_id}/${section_id}`)
                .then((response) => {
                    this.spotlightProducts['section_'+section_id+''] = response.data

                })

          
//console.log(this.spotlightProducts.section_7);


            return this.spotlightProducts;

        }
    }
}
</script>
