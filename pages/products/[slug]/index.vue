<script setup>
import RelatedProducts from '~~/components/products/RelatedProducts.vue';
import Reviews from '~~/components/products/Reviews.vue';
let apiUrl;
let imageUrl;
const route = useRoute();
const config = useRuntimeConfig();
apiUrl = config.public.api;
imageUrl = config.public.imageUrl;

const stockStatus = ref(true);
const showRefub = ref(false);
const offerShops = ref([]);


const id = route.params.slug;
const idArray = id.split('-');
const finalId = idArray.pop()

const { data: details } = await useAsyncData('product_details', () => $fetch(`${apiUrl}/product-details/${finalId}`));

const { data: relatedFeedsWithoutFilter } = await useAsyncData('relatedFeedsWithoutFilter', () => $fetch(`${apiUrl}/related-product-feeds-withoutFilter/${finalId}`))

const { data: relatedFeeds } = await useAsyncData('relatedFeeds', () => $fetch(`${apiUrl}/related-product-feeds/${finalId}/${stockStatus.value}/${showRefub.value}`));

const {data: reviewCount} = await useAsyncData('review_count',()=>$fetch(`${apiUrl}/products-review-count/${finalId}`));

relatedFeeds.value.map((item)=>{
    offerShops.value.push(item)
})






const filterOfferShop = async()=>{
    const { data: relatedFeedsFiltered } = await useAsyncData('relatedFeeds', () => $fetch(`${apiUrl}/related-product-feeds/${finalId}/${stockStatus.value}/${showRefub.value}`))
    
    offerShops.value = [];

    relatedFeedsFiltered.value.map((item)=>{
        offerShops.value.push(item)
    })
}


onMounted(() => {
    refreshNuxtData('product_details');
})
const stripTrailingSlash = () => {
    return imageUrl.endsWith('/') ?
        imageUrl.slice(0, -1) :
        imageUrl;
};

const splitCommaFromCategory = (category) => {
    return category.split(',');
}



const name = computed(() => {
    return route.params.slug.replaceAll("-", " ");
});

</script>

<script>
import Chart from 'chart.js/auto/auto.mjs';



export default {
    data() {
        return {
            config1: {
                type: 'line',

                data: {
                    labels: ["Feb 1", "Feb 2", "Feb 3", "Feb 4", "Feb 5", "Feb 6", "Feb 7",],
                    datasets: [{
                        label: 'Totaal Meldingen',
                        data: [290, 250, 300, 250, 280, 335, 355],
                        backgroundColor: (ctx) => {
                            const canvas = ctx.chart.ctx;
                            const gradient = canvas.createLinearGradient(0, 1200, 0, 0);

                            gradient.addColorStop(.5, 'rgb(0 82 254 / 20%)');

                            return gradient;
                        },
                        lineTension: 0,
                        pointRadius: 1,
                        pointHoverRadius: 1,
                        fill: true,
                        redraw: true,
                        borderColor: [
                            'rgb(0 82 254)',

                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            display: true
                        },
                        ticks: {
                            display: false
                        }
                    },

                    elements: {
                        point: {
                            radius: 0
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            position: 'nearest',
                            padding: 10,
                            cornerRadius: 10,
                            backgroundColor: 'rgba(43,88,133)',
                            callbacks: {
                                label: function (context) {
                                    return context.parsed.y;
                                },
                                title: () => null
                            },

                            yAlign: 'bottom',
                            displayColors: false,

                        }
                    }
                }
            },
            myChart3: null,
        }
    },
    mounted() {

        this.ChartRender();
        /* custom selectors News Start */
        let index = 1;

        const on = (listener, query, fn) => {
            document.querySelectorAll(query).forEach(item => {
                item.addEventListener(listener, el => {
                    fn(el);
                })
            })
        }

        on('click', '.selectBtn', item => {
            item.target.classList.toggle('toggle');
            const next = item.target.nextElementSibling;
            next.classList.toggle('toggle');
            next.style.zIndex = index++;
        });

        document.addEventListener('mouseup', function (e) {

            const containers = document.querySelectorAll('.selectBtn');
            if (containers.length > 0) {
                const options = document.querySelectorAll('.selectDropdown');
                containers.forEach(function (container, index) {
                    if (!container.contains(e.target)) {
                        container.classList.remove('toggle');
                        options[index].classList.remove('toggle');
                    }
                });

            }
        });
        on('click', '.option', item => {
            item.target.parentElement.classList.remove('toggle');
            const parent = item.target.closest('.select').children[0];
            parent.setAttribute('data-type', item.target.getAttribute('data-type'));
            parent.innerText = item.target.innerText;
        })
    },
    methods: {
        ChartRender() {
            if (this.myChart3 != null) {
                this.myChart3.destroy();
            }
            this.myChart3 = new Chart(
                document.getElementById('myChart3'),
                this.config1
            );

        },
    }
}
</script>
<style scoped>
.chart-wrapper canvas {
    height: 400px !important;
}

.chart-wrapper {
    border: 1px solid #F5F8FF;
    padding: 20px;
    border-radius: 5px;
}

.select .selectBtn,
.select .select-b,
.select .select-c,
.select .select-d {
    border-color: #6C7A93;
}

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
</style>

<template>
    <section class="bg-white w-full p-4 md:p-12">
        <div class="container mx-auto max-w-screen-xl"><!-- container start -->
            <div class="modal-product-info flex-col flex md:flex-row align-middle justify-between">
                <div class="img-box flex justify-center items-center relative h-auto w-full bg-[#F5F8FF]">
                    <div class="product-img p-8">
                        <img class="object-cover w-auto rounded-t-lg h-auto mx-auto"
                            :src="stripTrailingSlash() + details[0].url" alt="image">
                    </div>
                    <div class="brand-logo">
                        <img src="@/assets/img/providers/amazon-big.png" alt="icon">
                    </div>
                </div>
                <div class="product-details-s w-full pl-5">
                    <h3 class="text-[#2B313B] font-bold text-xl mb-3">{{ details[0].product_title }}</h3>
                    <div class="rating-area flex align-middle justify-between md:justify-start mb-5">
                        <div class=" flex flex-col items-start md:flex-row md:items-center">                
                        <button data-modal-target="staticModal" data-modal-toggle="staticModal"  type="button">
                        modal
                        </button>
                            <div  class="flex items-center justify-between">
                                <svg width="18" height="17" viewBox="0 0 18 17" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.13024 0.533005C8.51342 -0.142371 9.48658 -0.142372 9.86976 0.533003L11.9616 4.22001C12.1041 4.47108 12.3481 4.64834 12.6308 4.70623L16.7838 5.55636C17.5445 5.71208 17.8453 6.63762 17.3214 7.21075L14.4612 10.3396C14.2665 10.5526 14.1733 10.8394 14.2056 11.1263L14.6804 15.3387C14.7674 16.1103 13.9801 16.6823 13.2731 16.3612L9.4136 14.6079C9.15079 14.4885 8.84921 14.4885 8.5864 14.6079L4.72688 16.3612C4.0199 16.6823 3.23259 16.1103 3.31957 15.3387L3.79439 11.1263C3.82672 10.8395 3.73353 10.5526 3.53877 10.3396L0.678637 7.21075C0.154726 6.63762 0.45545 5.71208 1.21618 5.55636L5.36916 4.70623C5.65195 4.64834 5.89593 4.47108 6.03838 4.22002L8.13024 0.533005Z"
                                        fill="#EFBC21" />
                                </svg>
                                <svg width="18" height="17" viewBox="0 0 18 17" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.13024 0.533005C8.51342 -0.142371 9.48658 -0.142372 9.86976 0.533003L11.9616 4.22001C12.1041 4.47108 12.3481 4.64834 12.6308 4.70623L16.7838 5.55636C17.5445 5.71208 17.8453 6.63762 17.3214 7.21075L14.4612 10.3396C14.2665 10.5526 14.1733 10.8394 14.2056 11.1263L14.6804 15.3387C14.7674 16.1103 13.9801 16.6823 13.2731 16.3612L9.4136 14.6079C9.15079 14.4885 8.84921 14.4885 8.5864 14.6079L4.72688 16.3612C4.0199 16.6823 3.23259 16.1103 3.31957 15.3387L3.79439 11.1263C3.82672 10.8395 3.73353 10.5526 3.53877 10.3396L0.678637 7.21075C0.154726 6.63762 0.45545 5.71208 1.21618 5.55636L5.36916 4.70623C5.65195 4.64834 5.89593 4.47108 6.03838 4.22002L8.13024 0.533005Z"
                                        fill="#EFBC21" />
                                </svg>
                                <svg width="18" height="17" viewBox="0 0 18 17" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.13024 0.533005C8.51342 -0.142371 9.48658 -0.142372 9.86976 0.533003L11.9616 4.22001C12.1041 4.47108 12.3481 4.64834 12.6308 4.70623L16.7838 5.55636C17.5445 5.71208 17.8453 6.63762 17.3214 7.21075L14.4612 10.3396C14.2665 10.5526 14.1733 10.8394 14.2056 11.1263L14.6804 15.3387C14.7674 16.1103 13.9801 16.6823 13.2731 16.3612L9.4136 14.6079C9.15079 14.4885 8.84921 14.4885 8.5864 14.6079L4.72688 16.3612C4.0199 16.6823 3.23259 16.1103 3.31957 15.3387L3.79439 11.1263C3.82672 10.8395 3.73353 10.5526 3.53877 10.3396L0.678637 7.21075C0.154726 6.63762 0.45545 5.71208 1.21618 5.55636L5.36916 4.70623C5.65195 4.64834 5.89593 4.47108 6.03838 4.22002L8.13024 0.533005Z"
                                        fill="#EFBC21" />
                                </svg>
                                <svg width="18" height="17" viewBox="0 0 18 17" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.13024 0.533005C8.51342 -0.142371 9.48658 -0.142372 9.86976 0.533003L11.9616 4.22001C12.1041 4.47108 12.3481 4.64834 12.6308 4.70623L16.7838 5.55636C17.5445 5.71208 17.8453 6.63762 17.3214 7.21075L14.4612 10.3396C14.2665 10.5526 14.1733 10.8394 14.2056 11.1263L14.6804 15.3387C14.7674 16.1103 13.9801 16.6823 13.2731 16.3612L9.4136 14.6079C9.15079 14.4885 8.84921 14.4885 8.5864 14.6079L4.72688 16.3612C4.0199 16.6823 3.23259 16.1103 3.31957 15.3387L3.79439 11.1263C3.82672 10.8395 3.73353 10.5526 3.53877 10.3396L0.678637 7.21075C0.154726 6.63762 0.45545 5.71208 1.21618 5.55636L5.36916 4.70623C5.65195 4.64834 5.89593 4.47108 6.03838 4.22002L8.13024 0.533005Z"
                                        fill="#EFBC21" />
                                </svg>
                                <svg width="18" height="17" viewBox="0 0 18 17" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.13024 0.533005C8.51342 -0.142371 9.48658 -0.142372 9.86976 0.533003L11.9616 4.22001C12.1041 4.47108 12.3481 4.64834 12.6308 4.70623L16.7838 5.55636C17.5445 5.71208 17.8453 6.63762 17.3214 7.21075L14.4612 10.3396C14.2665 10.5526 14.1733 10.8394 14.2056 11.1263L14.6804 15.3387C14.7674 16.1103 13.9801 16.6823 13.2731 16.3612L9.4136 14.6079C9.15079 14.4885 8.84921 14.4885 8.5864 14.6079L4.72688 16.3612C4.0199 16.6823 3.23259 16.1103 3.31957 15.3387L3.79439 11.1263C3.82672 10.8395 3.73353 10.5526 3.53877 10.3396L0.678637 7.21075C0.154726 6.63762 0.45545 5.71208 1.21618 5.55636L5.36916 4.70623C5.65195 4.64834 5.89593 4.47108 6.03838 4.22002L8.13024 0.533005Z"
                                        fill="#A4BCE6" />
                                </svg>

                             
                                <span class="review-status text-xs text-[#2B313B] font-bold ml-2">{{ reviewCount[0].average}}</span>
                            </div>
                        

                        <span class="total-review text-xs text[#6C7A93] font-normal ml-0 mt-2 md:mt-0 md:ml-2">({{ reviewCount[0].count }}
                                Reviews)</span>
                        </div>
                        <span class="product-status flex items-center text-[#1D9E54] font-normal text-xs ml-1"><img
                                src="@/assets/img/icons/sell-arrow-green.svg" class="mr-1 w-4 h-4" alt="icon"> -24% (Price
                            Drop)</span>
                    </div>
                    <button type="button"
                        class="add-notification bg-[#FFF6F3] flex align-middle justify-between w-full p-3">
                        <div class="flex items-center">
                            <span class="notification-icon mr-2">
                                <svg width="14" height="10" viewBox="0 0 14 10" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.602276 1.70704L6.99957 4.90568L13.3969 1.707C13.3487 0.866717 12.652 0.200195 11.7996 0.200195H2.19961C1.34722 0.200195 0.650517 0.866739 0.602276 1.70704Z"
                                        fill="#FC7428" />
                                    <path
                                        d="M13.3996 3.49452L6.99957 6.69454L0.599609 3.49456V8.2002C0.599609 9.08385 1.31595 9.8002 2.19961 9.8002H11.7996C12.6833 9.8002 13.3996 9.08385 13.3996 8.2002V3.49452Z"
                                        fill="#FC7428" />
                                </svg>
                            </span>
                            <span class="text=[#FC7428] text-sm font-normal">Set Notification for this Product</span>
                        </div>
                        <div>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M5.33789 1.52918C5.22354 1.10241 4.78487 0.84914 4.35809 0.963493C3.93132 1.07785 3.67805 1.51652 3.79241 1.94329L3.99946 2.71603C4.11382 3.1428 4.55249 3.39607 4.97926 3.28172C5.40603 3.16736 5.6593 2.72869 5.54494 2.30192L5.33789 1.52918Z"
                                    fill="#112954" />
                                <path
                                    d="M1.94378 3.79192C1.517 3.67757 1.07833 3.93083 0.963981 4.35761C0.849628 4.78438 1.10289 5.22305 1.52967 5.3374L2.30241 5.54446C2.72918 5.65881 3.16785 5.40554 3.2822 4.97877C3.39656 4.552 3.14329 4.11333 2.71652 3.99898L1.94378 3.79192Z"
                                    fill="#112954" />
                                <path
                                    d="M8.99454 3.3372C9.30696 3.02478 9.30696 2.51824 8.99454 2.20582C8.68212 1.89341 8.17559 1.8934 7.86317 2.20582L7.29748 2.77151C6.98506 3.08393 6.98506 3.59046 7.29748 3.90288C7.6099 4.2153 8.11643 4.2153 8.42885 3.90288L8.99454 3.3372Z"
                                    fill="#112954" />
                                <path
                                    d="M3.33768 8.99405L3.90337 8.42836C4.21579 8.11595 4.21579 7.60941 3.90337 7.29699C3.59095 6.98457 3.08442 6.98457 2.772 7.29699L2.20631 7.86268C1.89389 8.1751 1.89389 8.68163 2.20631 8.99405C2.51873 9.30647 3.02526 9.30647 3.33768 8.99405Z"
                                    fill="#112954" />
                                <path
                                    d="M5.89762 4.85721C5.60049 4.73836 5.26111 4.80802 5.03482 5.03431C4.80853 5.2606 4.73888 5.59997 4.85773 5.89711L8.05773 13.8971C8.17473 14.1896 8.4525 14.3862 8.76726 14.3993C9.08203 14.4124 9.37516 14.2395 9.51605 13.9578L10.6197 11.7505L13.0348 14.1657C13.3472 14.4781 13.8538 14.4781 14.1662 14.1657C14.4786 13.8533 14.4786 13.3467 14.1662 13.0343L11.751 10.6192L13.9583 9.51554C14.2401 9.37465 14.4129 9.08151 14.3998 8.76675C14.3867 8.45199 14.1901 8.17421 13.8976 8.05721L5.89762 4.85721Z"
                                    fill="#112954" />
                            </svg>
                        </div>
                    </button>
                    <div class="mb-3">
                        <label for="" class="block mb-2 mt-4 text-sm font-normal text-[#2B313B]">Select Color</label>
                        <div class="flex flex-row items-center justify-start">
                            <div class="flex justify-center mr-3">
                                <input id="inline-radio" checked type="radio" value="" name="inline-radio-group"
                                    class="hidden text-blue-600 bg-gray-100 border-gray-300 focus:ring-none focus:none radio-btn">
                                <label for="inline-radio"
                                    class="outline-btn btn-translate-z flex justify-center w-28 bg-[#0052fe] text-white text-xs font-bold py-2.5 px-6 transition-all cursor-pointer">Blue
                                    Red</label>
                            </div>
                            <div class="flex items-center">
                                <input id="inline-2-radio" type="radio" value="" name="inline-radio-group"
                                    class="hidden text-blue-600 bg-gray-100 border-gray-300 focus:ring-none focus:none radio-btn">
                                <label for="inline-2-radio"
                                    class="outline-btn btn-translate-z flex w-fit bg-[#0052fe] text-white text-xs font-bold py-2.5 px-6 transition-all cursor-pointer">Red
                                    Blue</label>
                            </div>
                        </div>
                    </div>
                    <div class="sm-note text-[#6C7A93] text-sm font-normal my-4 leading-6">
                        {{ details[0].short_description }}
                    </div>


                    <div class="brand-list-wrapper rounded-md border border-[#F5F8FF] bg-white">
                        <div v-for="(feedProduct,i) in relatedFeedsWithoutFilter" class="brands-s flex items-center justify-between py-4 px-3 border-b border-[#F5F8FF]">
                            <div class="modal-brand-logo flex h-4 w-auto">
                                <img :src="feedProduct.provider_image_url" class="w-full h-auto" alt="logo">
                            </div>
                            <div class="">
                                <div class="price flex items-center align-bottom">
                                    <span class="price text-[#2B313B] text-base font-black ">${{ feedProduct.reguler_price }}</span>
                                    <span class="original-price line-through text-[#6C7A93] text-xs font-normal">${{ feedProduct.discount_price }}</span>
                                </div>
                                <div class="shipping md:hidden block text-xs text-[#26BA65] font-bold"> Free Shipping

                                </div>
                            </div>
                            <div class="condition text-[#6C7A93] text-xs font-normal">
                               {{ feedProduct.state }}
                            </div>
                            <div class="shipping hidden md:flex text-xs text-[#26BA65] font-bold">
                                {{ feedProduct.shipping_status }}
                            </div>
                            <a :href="feedProduct.affiliate_link" target="_blank" class="bg-[#112954] w-8 h-8 rounded-full flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M5.83392 11.7657C5.5215 11.4533 5.5215 10.9467 5.83392 10.6343L8.46824 8L5.83392 5.36569C5.5215 5.05327 5.5215 4.54673 5.83392 4.23431C6.14634 3.9219 6.65288 3.9219 6.96529 4.23431L10.1653 7.43431C10.4777 7.74673 10.4777 8.25327 10.1653 8.56569L6.9653 11.7657C6.65288 12.0781 6.14634 12.0781 5.83392 11.7657Z"
                                        fill="white" />
                                </svg>
                            </a>
                        </div>
                        
                    </div>
                    <div class="show-more-price flex items-center justify-center md:justify-start mt-5">
                        <a href="" class="text-[#112954] text-sm font-bold flex items-center">Show all prices <svg
                                width="17" height="16" viewBox="0 0 17 16" class="ml-2" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M4.73431 5.83441C5.04673 5.52199 5.55327 5.52199 5.86569 5.83441L8.5 8.46873L11.1343 5.83441C11.4467 5.52199 11.9533 5.52199 12.2657 5.83441C12.5781 6.14683 12.5781 6.65336 12.2657 6.96578L9.06569 10.1658C8.75327 10.4782 8.24673 10.4782 7.93431 10.1658L4.73431 6.96578C4.4219 6.65336 4.4219 6.14683 4.73431 5.83441Z"
                                    fill="#112954" />
                            </svg>
                        </a><span
                            class="price-list-count bg-[#0052FE] text-white text-[8px] font-bold w-[18px] h-[18px] flex items-center justify-center">+4</span>
                    </div>
                </div>
            </div>
            <div class="filter-options mt-8 md:mt-16 mb-8">
                <div class="justify-between gap-6 grid grid-cols-2 lg:grid-cols-5">
                    <a class="service-btn flex flex-col md:flex-row border border-[#F5F8FF] items-start md:items-center bg-white text-[#2B313B] grow w-full  text-sm font-semibold p-[17px] rounded-md hover:text-[#135FFF]"
                        href="">Praise</a>
                    <a class="service-btn lg:mx-auto flex flex-col md:flex-row border border-[#F5F8FF] items-start md:items-center bg-white text-[#2B313B] grow w-full  text-sm font-semibold p-[17px] rounded-md hover:text-[#135FFF]"
                        href="">Product information</a>
                    <a class="service-btn flex flex-col md:flex-row border border-[#F5F8FF] items-start md:items-center bg-white text-[#2B313B] grow w-full  text-sm font-semibold p-[17px] rounded-md hover:text-[#135FFF]"
                        href="">Specifications</a>

                    <a class="service-btn flex flex-col md:flex-row border border-[#F5F8FF] items-start md:items-center bg-white text-[#2B313B] grow w-full  text-sm font-semibold p-[17px] rounded-md hover:text-[#135FFF]"
                        href="/car-insurance">FAQ</a>
                    <a class="service-btn lg:mx-auto col-span-2 md:col-span-1 flex flex-col md:flex-row border border-[#F5F8FF] items-start md:items-center bg-white text-[#2B313B] grow w-full  text-sm font-semibold p-[17px] rounded-md hover:text-[#135FFF]"
                        href="">Similar Products</a>
                </div>
            </div>
            <div class="offer-shop ">
                <div class="offer-shop-inner hidden md:flex items-center justify-between">
                    <div class="heading-area">
                        <h2 class="flex items-center text-[#2B313B] font-bold text-[20px] mb-1">Offer Shop</h2>
                        <p class="tag-line text-[#6C7A93] text-sm font-normal">Price Start from lower to high</p>
                    </div>
                    <div class="more-filter flex items-center justify-between">
                        <label class="switch-btn">
                            <span class="mr-2 switch-text">Only in Stock</span>
                            <div class="switch">
                                <input v-model="stockStatus" @change="filterOfferShop()" type="checkbox" >
                                <span class="slider round"></span>

              

                            </div>
                        </label>

                     
                        <label class="switch-btn">
                            <span class="mr-2 switch-text">Show Refurbished</span>
                            <div class="switch">
                                <input  type="checkbox" v-model="showRefub" @change="filterOfferShop()">
                                <span class="slider round"></span>

                            </div>
                        </label>
                    </div>
                </div>
                <div class="offer-product-list mt-7">
                    <div class="offer-list-inner">
                        <table class="table-auto w-full">
                            <thead class="hidden md:table-header-group">
                                <tr>
                                    <th>Shop</th>
                                    <th>Price</th>
                                    <th>State</th>
                                    <th>Rating</th>
                                    <th>Shipping Costs</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(offerShop,i) in offerShops " class="brands-s border-b border-[#F5F8FF]">
                                    <td class="py-4 px-3 ">
                                        <div class="modal-brand-logo flex h-4 w-auto"><img
                                                :src="offerShop.provider_image_url" class="w-auto h-auto"
                                                alt="logo"></div>
                                    </td>
                                    <td>
                                        <div class="price flex items-center justify-start">
                                            <span class="price text-[#2B313B] text-base font-black">${{ offerShop.reguler_price }}</span>
                                            <span
                                                class="original-price line-through text-[#6C7A93] text-xs ml-2 mr-4 font-normal">${{ offerShop.discount_price }}</span>
                                            <span
                                                class="product-status hidden md:flex items-center text-[#1D9E54] font-normal text-xs"><img
                                                    src="@/assets/img/icons/sell-arrow-green.svg" class="mr-1 w-4 h-4"
                                                    alt="icon"> {{offerShop.discount_price}}% (Price Drop)</span>
                                        </div>
                                        <div class="shipping md:hidden block text-xs text-[#26BA65] font-bold"> Free
                                            Shipping </div>
                                    </td>
                                    <td>
                                        <div class="condition text-[#6C7A93] text-xs py-4 font-normal pr-6"> {{ offerShop.state }} </div>
                                    </td>
                                    <td class="hidden md:table-cell">
                                        <div class="rating-area flex items-center justify-start">
                                            <svg width="10" height="10" viewBox="0 0 10 10" class="mr-1" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M4.13024 0.533001C4.51342 -0.142374 5.48658 -0.142372 5.86976 0.533003L6.68731 1.97396C6.82975 2.22503 7.07373 2.40229 7.35653 2.46018L8.9796 2.79243C9.74033 2.94815 10.041 3.87369 9.51714 4.44682L8.39934 5.66963C8.20458 5.88268 8.11139 6.1695 8.14372 6.45634L8.32929 8.10264C8.41626 8.87426 7.62896 9.44627 6.92198 9.12511L5.4136 8.43989C5.15079 8.3205 4.84921 8.3205 4.5864 8.43989L3.07802 9.12511C2.37104 9.44627 1.58374 8.87426 1.67071 8.10264L1.85628 6.45634C1.88861 6.1695 1.79542 5.88268 1.60066 5.66963L0.48286 4.44682C-0.0410503 3.87369 0.259676 2.94815 1.02041 2.79243L2.64348 2.46018C2.92627 2.40229 3.17025 2.22503 3.31269 1.97396L4.13024 0.533001Z"
                                                    fill="#EFBC21" />
                                            </svg>
                                            <svg width="10" height="10" viewBox="0 0 10 10" class="mr-1" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M4.13024 0.533001C4.51342 -0.142374 5.48658 -0.142372 5.86976 0.533003L6.68731 1.97396C6.82975 2.22503 7.07373 2.40229 7.35653 2.46018L8.9796 2.79243C9.74033 2.94815 10.041 3.87369 9.51714 4.44682L8.39934 5.66963C8.20458 5.88268 8.11139 6.1695 8.14372 6.45634L8.32929 8.10264C8.41626 8.87426 7.62896 9.44627 6.92198 9.12511L5.4136 8.43989C5.15079 8.3205 4.84921 8.3205 4.5864 8.43989L3.07802 9.12511C2.37104 9.44627 1.58374 8.87426 1.67071 8.10264L1.85628 6.45634C1.88861 6.1695 1.79542 5.88268 1.60066 5.66963L0.48286 4.44682C-0.0410503 3.87369 0.259676 2.94815 1.02041 2.79243L2.64348 2.46018C2.92627 2.40229 3.17025 2.22503 3.31269 1.97396L4.13024 0.533001Z"
                                                    fill="#EFBC21" />
                                            </svg>
                                            <svg width="10" height="10" viewBox="0 0 10 10" class="mr-1" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M4.13024 0.533001C4.51342 -0.142374 5.48658 -0.142372 5.86976 0.533003L6.68731 1.97396C6.82975 2.22503 7.07373 2.40229 7.35653 2.46018L8.9796 2.79243C9.74033 2.94815 10.041 3.87369 9.51714 4.44682L8.39934 5.66963C8.20458 5.88268 8.11139 6.1695 8.14372 6.45634L8.32929 8.10264C8.41626 8.87426 7.62896 9.44627 6.92198 9.12511L5.4136 8.43989C5.15079 8.3205 4.84921 8.3205 4.5864 8.43989L3.07802 9.12511C2.37104 9.44627 1.58374 8.87426 1.67071 8.10264L1.85628 6.45634C1.88861 6.1695 1.79542 5.88268 1.60066 5.66963L0.48286 4.44682C-0.0410503 3.87369 0.259676 2.94815 1.02041 2.79243L2.64348 2.46018C2.92627 2.40229 3.17025 2.22503 3.31269 1.97396L4.13024 0.533001Z"
                                                    fill="#EFBC21" />
                                            </svg>
                                            <svg width="10" height="10" viewBox="0 0 10 10" class="mr-1" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M4.13024 0.533001C4.51342 -0.142374 5.48658 -0.142372 5.86976 0.533003L6.68731 1.97396C6.82975 2.22503 7.07373 2.40229 7.35653 2.46018L8.9796 2.79243C9.74033 2.94815 10.041 3.87369 9.51714 4.44682L8.39934 5.66963C8.20458 5.88268 8.11139 6.1695 8.14372 6.45634L8.32929 8.10264C8.41626 8.87426 7.62896 9.44627 6.92198 9.12511L5.4136 8.43989C5.15079 8.3205 4.84921 8.3205 4.5864 8.43989L3.07802 9.12511C2.37104 9.44627 1.58374 8.87426 1.67071 8.10264L1.85628 6.45634C1.88861 6.1695 1.79542 5.88268 1.60066 5.66963L0.48286 4.44682C-0.0410503 3.87369 0.259676 2.94815 1.02041 2.79243L2.64348 2.46018C2.92627 2.40229 3.17025 2.22503 3.31269 1.97396L4.13024 0.533001Z"
                                                    fill="#EFBC21" />
                                            </svg>
                                            <svg width="10" height="10" viewBox="0 0 10 10" class="" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M4.13024 0.533001C4.51342 -0.142374 5.48658 -0.142372 5.86976 0.533003L6.68731 1.97396C6.82975 2.22503 7.07373 2.40229 7.35653 2.46018L8.9796 2.79243C9.74033 2.94815 10.041 3.87369 9.51714 4.44682L8.39934 5.66963C8.20458 5.88268 8.11139 6.1695 8.14372 6.45634L8.32929 8.10264C8.41626 8.87426 7.62896 9.44627 6.92198 9.12511L5.4136 8.43989C5.15079 8.3205 4.84921 8.3205 4.5864 8.43989L3.07802 9.12511C2.37104 9.44627 1.58374 8.87426 1.67071 8.10264L1.85628 6.45634C1.88861 6.1695 1.79542 5.88268 1.60066 5.66963L0.48286 4.44682C-0.0410503 3.87369 0.259676 2.94815 1.02041 2.79243L2.64348 2.46018C2.92627 2.40229 3.17025 2.22503 3.31269 1.97396L4.13024 0.533001Z"
                                                    fill="#A4BCE6" />
                                            </svg>

                                            <span class="review-status text-xs text-[#2B313B] font-bold ml-2">{{ offerShop.ratings }}</span>
                                        </div>
                                        <span class="total-review text-[10px] text[#6C7A93] font-normal">({{ offerShop.num_of_ratings }}
                                            Reviews)</span>
                                    </td>
                                    <td class="py-4 pr-3">
                                        <div class="flex items-center justify-between ">
                                            <div class="shipping hidden md:inline-block text-xs text-[#26BA65] font-bold">
                                                {{ offerShop.shipping_status }} </div>
                                            <a :href="offerShop.affiliate_link" target="_blank"
                                                class="bg-[#112954] w-8 h-8 rounded-full flex items-center justify-center"><svg
                                                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M5.83392 11.7657C5.5215 11.4533 5.5215 10.9467 5.83392 10.6343L8.46824 8L5.83392 5.36569C5.5215 5.05327 5.5215 4.54673 5.83392 4.23431C6.14634 3.9219 6.65288 3.9219 6.96529 4.23431L10.1653 7.43431C10.4777 7.74673 10.4777 8.25327 10.1653 8.56569L6.9653 11.7657C6.65288 12.0781 6.14634 12.0781 5.83392 11.7657Z"
                                                        fill="white"></path>
                                                </svg></a>
                                        </div>
                                    </td>

                                </tr>

                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            
           <Reviews :product_id ="finalId" :product_image="details[0].url"/>

            <!-- Product description start -->

            <div class="product-description-wrapper my-8 md:mt-16">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
                    <div class="product-detail-text">
                        <h5 class="font-bold text-[#2B313B] text-2xl mb-4">Product description</h5>
                        <p class="text-[#6C7A93] text-base font-normal leading-6 mb-5">

                            {{ details[0].product_description }}
                        </p>

                    </div>
                    <div class="specification ml-0 md:ml-[60px]">
                        <h5 class="font-bold text-[#2B313B] text-2xl mb-4">Specification</h5>
                        <div class="info-table border border-[#F5F8FF] rounded-[5px]">
                            <table>
                                <tbody>
                                    <tr class="border-b border-[#F5F8FF] text-[#6C7A93] text-sm font-normal">
                                        <td class=" p-3">Product Type</td>
                                        <td>Games Console</td>
                                    </tr>
                                    <tr class="border-b border-[#F5F8FF] text-[#6C7A93] text-sm font-normal">
                                        <td class=" p-3">Media</td>
                                        <td>Flash memory card, Nintendo Switch game card</td>
                                    </tr>
                                    <tr class="border-b border-[#F5F8FF] text-[#6C7A93] text-sm font-normal">
                                        <td class=" p-3">Supported flash memory cards</td>
                                        <td>microSD, microSDHC, microSDXC</td>
                                    </tr>
                                    <tr class="border-b border-[#F5F8FF] text-[#6C7A93] text-sm font-normal">
                                        <td class=" p-3">Processor</td>
                                        <td>nvidia</td>
                                    </tr>
                                    <tr class="border-b border-[#F5F8FF] text-[#6C7A93] text-sm font-normal">
                                        <td class=" p-3">Flash memory</td>
                                        <td>64 GB</td>
                                    </tr>
                                    <tr class="border-b border-[#F5F8FF] text-[#6C7A93] text-sm font-normal">
                                        <td class=" p-3">Barrel</td>
                                        <td>Loudspeaker</td>
                                    </tr>
                                    <tr class="border-b border-[#F5F8FF] text-[#6C7A93] text-sm font-normal">
                                        <td class=" p-3">Network</td>
                                        <td>Fast Ethernet, 802.11a/b/g/n/ac, Bluetooth 4.1</td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- <a href="" class="text-[#0052FE] text-sm font-bold flex items-center justify-center my-3">Show
                            More<svg width="16" height="16" viewBox="0 0 16 16" class="ml-2" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M4.23431 5.83441C4.54673 5.52199 5.05327 5.52199 5.36569 5.83441L8 8.46873L10.6343 5.83441C10.9467 5.52199 11.4533 5.52199 11.7657 5.83441C12.0781 6.14683 12.0781 6.65336 11.7657 6.96578L8.56569 10.1658C8.25327 10.4782 7.74673 10.4782 7.43431 10.1658L4.23431 6.96578C3.9219 6.65336 3.9219 6.14683 4.23431 5.83441Z"
                                    fill="#0052FE" />
                            </svg>

                        </a> -->
                        </div>
                    </div>

                </div>
            </div>

            <!-- Product description end -->

            <!-- Product price notification Start -->

            <div class="product-price-notification my-8 md:mt-16">
                <div class="flex-none md:flex md:flex-row items-start justify-between">
                    <div class="chart basis-full p-2 md:p-3 lg:p-0 md:basis-3/5 lg:w-[668px]">
                        <h5 class="text-black text-2xl font-bold mb-4 md:mb-10">Price History</h5>
                        <div class="chart-wrapper">
                            <div class="flex items-center justify-between mb-6">
                                <div class="chart-info">
                                    <div class="text-[#6C7A93] text-xs font-normal">Current Price</div>
                                    <div class="text-[#2B313B] text-2xl font-bold flex items-center">$250
                                        <span
                                            class="product-status flex items-center text-[#1D9E54] font-normal text-xs ml-4"><img
                                                src="@/assets/img/icons/sell-arrow-green.svg" class=" mr-1 w-4 h-4"
                                                alt="icon"> -24%</span>
                                    </div>
                                </div>
                                <div class="">
                                    <form action="" class="text-left w-28">
                                        <div class="mr-4">
                                            <div class="no-label w-28">
                                                <div class="select" id="provider">
                                                    <div class="selectBtn" data-type="firstOption"> 7 Days</div>
                                                    <div class="selectDropdown">
                                                        <div class="option" data-value="all" data-type="firstOption">6 Days
                                                        </div>
                                                        <div class="option" data-type="secondOption"
                                                            data-value="internet-tv">
                                                            5 Days
                                                        </div>
                                                        <div class="option" data-type="secondOption"
                                                            data-value="internet-bellen">
                                                            4 Days
                                                        </div>
                                                        <div class="option" data-type="secondOption" data-value="internet">
                                                            3 Days
                                                        </div>
                                                        <div class="option" data-type="secondOption" data-value="internet">
                                                            2 Days
                                                        </div>
                                                        <div class="option" data-type="secondOption" data-value="internet">
                                                            1 Days
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div ref="aanbiending24" class="">
                                <canvas id="myChart3" height="400"></canvas>
                            </div>
                        </div>
                    </div>

                    <productsPriceNotification />
                    
                </div>
            </div>

            <!-- Product price notification End -->

            <!-- Related products Start -->

            <RelatedProducts :category="splitCommaFromCategory(details[0].category_id)"
                :product_id="details[0].id" />

            <!-- Related products End -->

        </div>
    </section>
    <!-- Main modal -->
<div id="staticModal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Static modal
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                </p>
            </div>
            <!-- Modal footer -->
            <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="staticModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                <button data-modal-hide="staticModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
            </div>
        </div>
    </div>
</div>
</template>
