<script setup>
const props = defineProps(["provider_name"]);
const config = useRuntimeConfig();
const apiUrl = config.public.api;
const imageUrl = config.public.imageUrl;
let page = 0;
let providerProducts = [];

console.log(props.provider_name);

const {data:products} = await useAsyncData('provider_products',()=>$fetch(`${apiUrl}/provider-products/${props.provider_name}/${page}`));

onMounted(()=>{
    refreshNuxtData("provider_products")
    
})

const provider_products2 = ref([]);

let provider_products1Array = products.value.slice(0,8);
let provider_products2ndArray = products.value.slice(12);

provider_products2ndArray.map((item)=>{
    provider_products2.value.push(item)
})

const calculatePrice = (price,discount) =>{
    let discountPrice = price * discount / 100;
    let priceString = JSON.stringify(discountPrice);
    let finalPriceWithMinus = parseInt(priceString.replace("-",""));

    let totalPrice = price - finalPriceWithMinus
  
    return  totalPrice ;
}
let count = 1
const loadMoreProducts = () =>{
   
    const {data:moreProducts} = useAsyncData('more_products',()=>$fetch(`${apiUrl}/provider-products/${props.provider_name}/${count++}`));

    moreProducts.value.map((item,i)=>{
        provider_products2.value.push(item)
    })
    
    
    
    
}




</script>

<script>
export default {
    mounted() {
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
        /* custom selectors News End */
    }
}
</script>

<style scoped>
.brand-logo {
    position: absolute;
    top: 2px;
    right: 2px;
    left: auto;
    bottom: auto;
    width: 61px;
}

.object-cover {
  
    object-fit: cover;
    height: 163px;
}
</style>

<template>
    <div class="product-search-area">
        <h2 class="flex items-center text-[#2B313B] font-bold text-[20px] mb-1">Search for Product</h2>
        <p class="tag-line text-[#6C7A93] text-sm font-normal mb-6">View all Loungeset Products</p>
        <div class="filter-wrapper flex items-center justify-between">
            <form action="" class="flex flex-col text-left">
                <div class="mb-1">
                    <div class="no-label w-full sm:w-28">
                        <div class="select" id="popular">
                            <div class="selectBtn filter-icon" data-type="firstOption"> Popular</div>
                            <div class="selectDropdown">

                                <div class="option" data-value="all" data-type="firstOption">Popular 1</div>
                                <div class="option" data-type="secondOption" data-value="internet-tv">
                                    Popular 2
                                </div>
                                <div class="option" data-type="secondOption" data-value="internet-bellen">
                                    Popular 3
                                </div>
                                <div class="option" data-type="secondOption" data-value="internet">
                                    Popular 4
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <form action="" class="flex flex-col text-left">
                <div class="mb-1">
                    <div class="no-label w-full sm:w-28">
                        <div class="select" id="price">
                            <div class="selectBtn" data-type="firstOption"> Price</div>
                            <div class="selectDropdown">
                                <div class="option" data-value="all" data-type="firstOption">Price 1</div>
                                <div class="option" data-type="secondOption" data-value="internet-tv">
                                    Price 2
                                </div>
                                <div class="option" data-type="secondOption" data-value="internet-bellen">
                                    Price 3
                                </div>
                                <div class="option" data-type="secondOption" data-value="internet">
                                    Price 4
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <form action="" class="flex flex-col text-left">
                <div class="mb-1">
                    <div class="no-label w-full sm:w-28">
                        <div class="select" id="provider">
                            <div class="selectBtn" data-type="firstOption"> Provider</div>
                            <div class="selectDropdown">
                                <div class="option" data-value="all" data-type="firstOption">Provider 1</div>
                                <div class="option" data-type="secondOption" data-value="internet-tv">
                                    Provider 2
                                </div>
                                <div class="option" data-type="secondOption" data-value="internet-bellen">
                                    Provider 3
                                </div>
                                <div class="option" data-type="secondOption" data-value="internet">
                                    Provider 4
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div class="btn-area">
                <button
                    class="flex items-center text-[#fff] text-xs font-bold bg-[#EF8421] transition hover:bg-[#d2751e] px-3 py-2 mr-2 md:mr-8 rounded-md"><svg
                        width="16" height="16" viewBox="0 0 16 16" class="mr-2" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.23875 3.14165C7.47823 2.4046 8.52096 2.40461 8.76044 3.14165L9.6161 5.77509C9.7232 6.10471 10.0304 6.32788 10.3769 6.32788H13.1459C13.9209 6.32788 14.2431 7.31957 13.6161 7.77509L11.376 9.40265C11.0956 9.60636 10.9783 9.96745 11.0854 10.2971L11.941 12.9305C12.1805 13.6676 11.3369 14.2805 10.71 13.8249L8.46982 12.1974C8.18944 11.9937 7.80976 11.9937 7.52937 12.1974L5.28923 13.8249C4.66226 14.2805 3.81868 13.6676 4.05816 12.9305L4.91382 10.2971C5.02091 9.96745 4.90359 9.60636 4.6232 9.40265L2.38306 7.77509C1.75609 7.31957 2.07831 6.32788 2.85329 6.32788H5.62225C5.96883 6.32788 6.276 6.10471 6.3831 5.77509L7.23875 3.14165Z"
                            fill="white" />
                    </svg>
                    Top 10 Offers</button>

            </div>
            <div class="search-bar">
                <form action="" method="post">
                    <input type="hidden" name="_token" value="vOF2uTBMPlIqqKU8deg24rn7JLnKQ5wZblzxnmL4">
                    <div class="relative single-field-wrapper">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <button type="submit">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                        </div>
                        <input type="text" id="default-search"
                            class="rounded-md bg-white border border-[#F5F8FF] text-[#6C7A93] font-normal text-xs focus:ring-[#3b82f6] focus:outline-none focus:border-[#3b82f6] block flex-1 min-w-0 w-full md:w-[370px] p-3 pl-10"
                            placeholder="Search Articles" name="search" required="">
                    </div>
                </form>

            </div>
        </div>
    </div>


    <div class="center mt-7 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 justify-between">

        <div class="item mt-5" v-for="(product,i) in provider_products1Array" :key="i">
            <a href="#"
                class="flex w-60 mb-3 p-2 flex-col transition-all border border-[#EBF1FF]  rounded-lg hover:shadow-md md:flex-col  bg-white">
                <div class="img-box flex justify-center items-center relative h-[165px] w-full bg-[#F5F8FF]">
                    <div class="product-img">
                        <img class="object-cover w-auto rounded-t-lg h-auto mx-auto" :src="product.product_image_url"
                            alt="image">
                    </div>
                    <div class="brand-logo">
                        <img :src="product.provider_image" alt="icon">
                    </div>
                </div>
                <div class="product-info mt-2 flex items-center justify-between">
                    <span class="w-fit bg-[#EBF1FF] text-[#0052FE] text-xs font-bold p-2 rounded ">{{ product.state }}</span>
                    <span class="product-status flex items-center text-[#1D9E54] font-normal text-xs"><img
                            src="@/assets/img/icons/sell-arrow-green.svg" class="mr-1 w-4 h-4" alt="icon"> ${{product.discount_price}}%</span>
                </div>
                <div class="product-title mt-2">
                    <h4 class="mb-2 text-base font-bold  text-[#2B313B]">{{ product.product_name }}</h4>
                </div>
                <div class="product-price-info flex items-center justify-between">
                    <span class="price text-[#F22222] text-base font-black ">${{calculatePrice(product.reguler_price,product.discount_price) }}</span> <span
                        class="original-price line-through text-[#D3D7DE] text-xs font-normal">${{ product.reguler_price }}</span> <span
                        class="saved-price bg-[#26BA65] text-white text-xs font-normal p-1 rounded">Saves ${{ product.reguler_price - calculatePrice(product.reguler_price,product.discount_price)  }}</span>
                    <span class="rating-area flex items-top justify-between"><span class="icon mr-1"><svg width="14"
                                height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.54652 0.976481C6.72572 0.590614 7.27429 0.590616 7.45348 0.976482L8.86602 4.01808C8.93887 4.17496 9.08763 4.28304 9.25934 4.30385L12.5886 4.70734C13.0109 4.75853 13.1804 5.28025 12.8688 5.56992L10.4126 7.85323C10.2859 7.97099 10.2291 8.14587 10.2624 8.31561L10.9074 11.6066C10.9892 12.0241 10.5454 12.3465 10.1737 12.1397L7.24309 10.5092C7.09194 10.4252 6.90806 10.4252 6.75691 10.5092L3.82634 12.1397C3.45456 12.3465 3.01076 12.0241 3.09259 11.6066L3.73763 8.31561C3.7709 8.14587 3.71408 7.97099 3.58739 7.85323L1.13116 5.56992C0.819553 5.28025 0.989072 4.75853 1.41143 4.70734L4.74066 4.30385C4.91237 4.28304 5.06113 4.17495 5.13398 4.01808L6.54652 0.976481Z"
                                    fill="#EFBC21" />
                            </svg>
                        </span> <span class="rating-count text-[#6C7A93] text-xs font-normal">4.9 | 230</span></span>
                </div>
                <div class="flex justify-between items-center mt-2">
                    <a :href="product.affiliate_link" target="_blank"
                        class="btn-translate-z bg-[#112954] opacity-100 hover:opacity-90 transition text-white flex text-sm font-bold text-center justify-center items-center rounded-md py-[10px] px-2 w-full"><span
                            class="flex items-center"><img src="@/assets/img/icons/offer-arrow-24.svg"
                                class="mr-2 h-4 w-4 float-right" alt="icon"> View Offer </span></a>
                </div>
            </a>
        </div>

    </div>

    <!-- subscrition start -->

    <provider-details.Subscribe />

    <!-- subscrition End -->


    <div class="center mt-7 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 justify-between">

        <div class="item mt-5" v-for="(product,i) in provider_products2" :key="i">
            <a href="#"
                class="flex w-60 mb-3 p-2 flex-col transition-all border border-[#EBF1FF]  rounded-lg hover:shadow-md md:flex-col  bg-white">
                <div class="img-box flex justify-center items-center relative h-[165px] w-full bg-[#F5F8FF]">
                    <div class="product-img">
                        <img class="object-cover w-auto rounded-t-lg h-auto mx-auto" :src="product.product_image_url"
                            alt="image">
                    </div>
                    <div class="brand-logo">
                        <img :src="product.provider_image" alt="icon">
                    </div>
                </div>
                <div class="product-info mt-2 flex items-center justify-between">
                    <span class="w-fit bg-[#EBF1FF] text-[#0052FE] text-xs font-bold p-2 rounded ">{{ product.state }}</span>
                    <span class="product-status flex items-center text-[#1D9E54] font-normal text-xs"><img
                            src="@/assets/img/icons/sell-arrow-green.svg" class="mr-1 w-4 h-4" alt="icon"> ${{product.discount_price}}%</span>
                </div>
                <div class="product-title mt-2">
                    <h4 class="mb-2 text-base font-bold  text-[#2B313B]">{{ product.product_name }}</h4>
                </div>
                <div class="product-price-info flex items-center justify-between">
                    <span class="price text-[#F22222] text-base font-black ">${{calculatePrice(product.reguler_price,product.discount_price) }}</span> <span
                        class="original-price line-through text-[#D3D7DE] text-xs font-normal">${{ product.reguler_price }}</span> <span
                        class="saved-price bg-[#26BA65] text-white text-xs font-normal p-1 rounded">Saves ${{ product.reguler_price - calculatePrice(product.reguler_price,product.discount_price)  }}</span>
                    <span class="rating-area flex items-top justify-between"><span class="icon mr-1"><svg width="14"
                                height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.54652 0.976481C6.72572 0.590614 7.27429 0.590616 7.45348 0.976482L8.86602 4.01808C8.93887 4.17496 9.08763 4.28304 9.25934 4.30385L12.5886 4.70734C13.0109 4.75853 13.1804 5.28025 12.8688 5.56992L10.4126 7.85323C10.2859 7.97099 10.2291 8.14587 10.2624 8.31561L10.9074 11.6066C10.9892 12.0241 10.5454 12.3465 10.1737 12.1397L7.24309 10.5092C7.09194 10.4252 6.90806 10.4252 6.75691 10.5092L3.82634 12.1397C3.45456 12.3465 3.01076 12.0241 3.09259 11.6066L3.73763 8.31561C3.7709 8.14587 3.71408 7.97099 3.58739 7.85323L1.13116 5.56992C0.819553 5.28025 0.989072 4.75853 1.41143 4.70734L4.74066 4.30385C4.91237 4.28304 5.06113 4.17495 5.13398 4.01808L6.54652 0.976481Z"
                                    fill="#EFBC21" />
                            </svg>
                        </span> <span class="rating-count text-[#6C7A93] text-xs font-normal">4.9 | 230</span></span>
                </div>
                <div class="flex justify-between items-center mt-2">
                    <a :href="product.affiliate_link" target="_blank"
                        class="btn-translate-z bg-[#112954] opacity-100 hover:opacity-90 transition text-white flex text-sm font-bold text-center justify-center items-center rounded-md py-[10px] px-2 w-full"><span
                            class="flex items-center"><img src="@/assets/img/icons/offer-arrow-24.svg"
                                class="mr-2 h-4 w-4 float-right" alt="icon"> View Offer </span></a>
                </div>
            </a>
        </div>

</div>


<div class="load-more-btn text-center">
    <button @click="loadMoreProducts()"
        class="view-icon py-2.5 px-2.5 mt-8 border transition-all border-[#112954] text-[#112954] rounded-md w-32 hover:text-white">Show
        More</button>
</div>
</template>