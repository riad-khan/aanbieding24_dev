<script setup>
import { stripTrailingSlash, splitComma, readingTime, convertTime } from '../../helpers/helperFunctions'
    const props = defineProps(["product"]);
    const config = useRuntimeConfig();
    const imageUrl = config.public.imageUrl;


</script>



<template>
               <div>
    

    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" @click.self="closeModal">
      <div class="modal bg-white rounded-lg p-6">
        <button @click="closeModal" class="absolute top-0 right-0 m-4">
          <svg class="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <p>This is the modal content.</p>
      </div>
    </div>
  </div>
<div class="items">
                    <div 
                        class="flex w-full lg:w-[255px] mb-3 p-2 flex-col transition-all border border-[#EBF1FF]  rounded-lg hover:shadow-md md:flex-col  bg-white">
                        <div class="img-box flex justify-center items-center relative h-[165px] w-full bg-[#F5F8FF]">
                            <div class="product-img">
                                <img class="object-cover w-auto rounded-t-lg h-auto mx-auto"
                                    :src="product.product_image_url ?product.product_image_url:stripTrailingSlash(imageUrl)+product.orginal_product_image  " alt="image">
                            </div>
                            <div class="brand-logo">
                                <img :src="product.provider_image_url" alt="icon">
                            </div>
                        </div>
                        <div class="product-info mt-2 flex items-center justify-between">
                            <span
                                class="w-fit bg-[#EBF1FF] text-[#0052FE] text-xs font-bold p-2 rounded ">Accessories</span>
                            <span class="product-status flex items-center text-[#1D9E54] font-normal text-xs"><img
                                    src="@/assets/img/icons/sell-arrow-green.svg" class="mr-1 w-4 h-4" alt="icon">
                                -24%</span>
                        </div>
                        <div class="product-title mt-2">
                            <h4 class="mb-2 text-base font-bold  text-[#2B313B]">{{ props.product.product_name }}</h4>
                        </div>
                        <div class="product-price-info flex items-center justify-between">
                            <span class="price text-[#F22222] text-base font-black ">€{{ parseInt(props.product.reguler_price) - parseInt(props.product.discount_price)  }}</span> <span
                                class="original-price line-through text-[#D3D7DE] text-xs font-normal">€{{props.product.reguler_price}}</span> <span
                                class="saved-price bg-[#26BA65] text-white text-xs font-normal p-1 rounded">Saves
                                €{{ props.product.discount_price == 0 ? 0 : parseInt(props.product.reguler_price) - parseInt(props.product.reguler_price) - parseInt(props.product.discount_price) }}</span> <span class="rating-area flex items-top justify-between"><span
                                    class="icon mr-1"><svg width="14" height="13" viewBox="0 0 14 13" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M6.54652 0.976481C6.72572 0.590614 7.27429 0.590616 7.45348 0.976482L8.86602 4.01808C8.93887 4.17496 9.08763 4.28304 9.25934 4.30385L12.5886 4.70734C13.0109 4.75853 13.1804 5.28025 12.8688 5.56992L10.4126 7.85323C10.2859 7.97099 10.2291 8.14587 10.2624 8.31561L10.9074 11.6066C10.9892 12.0241 10.5454 12.3465 10.1737 12.1397L7.24309 10.5092C7.09194 10.4252 6.90806 10.4252 6.75691 10.5092L3.82634 12.1397C3.45456 12.3465 3.01076 12.0241 3.09259 11.6066L3.73763 8.31561C3.7709 8.14587 3.71408 7.97099 3.58739 7.85323L1.13116 5.56992C0.819553 5.28025 0.989072 4.75853 1.41143 4.70734L4.74066 4.30385C4.91237 4.28304 5.06113 4.17495 5.13398 4.01808L6.54652 0.976481Z"
                                            fill="#EFBC21" />
                                    </svg>
                                </span> <span class="rating-count text-[#6C7A93] text-xs font-normal">4.9 |
                                    230</span></span>
                        </div>
                        <div class="flex justify-between items-center mt-2">
                            <a :href="product.affiliate_link" target="_blank"
                                class="btn-translate-z bg-[#112954] w-full opacity-100 hover:opacity-90 transition text-white flex text-sm font-bold text-center justify-center items-center rounded-md py-[10px] px-2"><span
                                    class="flex items-center"><img src="@/assets/img/icons/offer-arrow-24.svg"
                                        class="mr-2 h-4 w-4 float-right" alt="icon"> View Offer </span></a>
                                        
                            <button  @click="openModal"
                        type="button" class="modal-btn view-icon py-2.5 px-2.5 ml-2 border transition-all border-[#112954] rounded-md"><svg
                            width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 "
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.00001 9.5999C8.88366 9.5999 9.60001 8.88356 9.60001 7.9999C9.60001 7.11625 8.88366 6.3999 8.00001 6.3999C7.11635 6.3999 6.40001 7.11625 6.40001 7.9999C6.40001 8.88356 7.11635 9.5999 8.00001 9.5999Z"
                                fill-rule="evenodd" fill="currentColor" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M0.366211 7.99993C1.38561 4.75423 4.41785 2.3999 7.99998 2.3999C11.5821 2.3999 14.6143 4.75421 15.6337 7.99987C14.6143 11.2456 11.5821 13.5999 7.99996 13.5999C4.41786 13.5999 1.38563 11.2456 0.366211 7.99993ZM11.2 7.9999C11.2 9.76721 9.76732 11.1999 8.00001 11.1999C6.2327 11.1999 4.80001 9.76721 4.80001 7.9999C4.80001 6.23259 6.2327 4.7999 8.00001 4.7999C9.76732 4.7999 11.2 6.23259 11.2 7.9999Z"
                                fill="currentColor" />
                        </svg>
                    </button>
                            </div>
                        </div>
</div>
</template>
