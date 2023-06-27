<script setup>
 import { onMounted } from 'vue'
 import { Modal } from 'flowbite'

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

onMounted(() => {
    const $buttonElement = document.querySelector('.modal-btn');
    const $modalElement = document.querySelector('#large-modal');
    const $closeButton = document.querySelector('#closeButton');

    const modalOptions = {
        backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
    }

    if ($modalElement) {
        const modal = new Modal($modalElement, modalOptions);
        $buttonElement.addEventListener('click', () => modal.toggle());
        $closeButton.addEventListener('click', () => modal.hide());
        
        // programmatically show
        // modal.show();
    }
})

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

<script>
import Chart from 'chart.js/auto/auto.mjs';

export default {
    data() {
        return {
          config1: {
        type: 'line',
        data: {
          labels: ["Feb 1","Feb 2","Feb 3","Feb 4","Feb 5","Feb 6","Feb 7",],
          datasets: [{
            label: 'Totaal Meldingen',
            data: [290,250,300,250,280,335,355],
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              const gradient = canvas.createLinearGradient(0,1200,0,0);

              gradient.addColorStop(1, 'rgb(0 82 254 / 45%)');
              gradient.addColorStop(.5, 'rgb(0 82 254 / 10%)');

              return gradient;
            },
            lineTension: 0.4,
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
      myChart1: null,
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
        /* custom selectors News End */
    },
    methods: {
        ChartRender() {
        if (this.myChart1 != null) {
            this.myChart1.destroy();
        }
        this.myChart1 = new Chart(
            document.getElementById('myChart1'),
            this.config1
        );

        },
    }
}
</script>

<style scoped>
.chart-wrapper canvas {
    height: 260px!important;
}
.chart-wrapper {
    border: 1px solid #F5F8FF;
    padding: 20px;
    border-radius: 5px;
}
.chart-btn a {
    padding: 1px 16px;
    border: 1px solid #6C7A93;
    margin-left: 5px;
    border-radius: 15px;
    transition: 250ms;
}
.chart-btn a:hover, .chart-btn a.active-chart {
    color: #0052FE;
    border-color: #0052FE;
}
.chart-wrapper {
    margin-top: 0!important;
}
</style>
<template>

<div id="large-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full  p-8 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                  <div class="relative w-full h-full md:w-[805px] md:h-auto">
                      <!-- Modal content -->
                      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          <!-- Modal header -->
                         
                          <!-- Modal body -->
                          <div class="p-4 space-y-4 modal-body">
                            
                              <div class="modal-product-info flex-col flex md:flex-row align-middle justify-between">
                                  <div class="img-box flex justify-center items-center relative h-[165px] w-full md:w-[273px] bg-[#F5F8FF]">
                                      <div class="product-img p-8">
                                          <img class="object-cover w-auto rounded-t-lg h-auto mx-auto" src="@/assets/img/offers/keyboard.png"
                                              alt="image">
                                      </div>
                                      <div class="brand-logo">
                                          <img src="@/assets/img/providers/bol.com.png" alt="icon">
                                      </div>
                                  </div>
                                  <div class="product-details-s w-full pl-5">
                                    <div class="flex items-start justify-between">
                              
                                        <h3 class="text-[#2B313B] font-bold text-xl mt-3 md:mt-0 mb-3">K380 MULTI-DEVICE KEYBOARD FOR MAC</h3>
                              <button id="closeButton" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                              </button>
                          </div>
                                      <div class="rating-area flex align-middle justify-start mb-5">
                                          <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.13024 0.533005C8.51342 -0.142371 9.48658 -0.142372 9.86976 0.533003L11.9616 4.22001C12.1041 4.47108 12.3481 4.64834 12.6308 4.70623L16.7838 5.55636C17.5445 5.71208 17.8453 6.63762 17.3214 7.21075L14.4612 10.3396C14.2665 10.5526 14.1733 10.8394 14.2056 11.1263L14.6804 15.3387C14.7674 16.1103 13.9801 16.6823 13.2731 16.3612L9.4136 14.6079C9.15079 14.4885 8.84921 14.4885 8.5864 14.6079L4.72688 16.3612C4.0199 16.6823 3.23259 16.1103 3.31957 15.3387L3.79439 11.1263C3.82672 10.8395 3.73353 10.5526 3.53877 10.3396L0.678637 7.21075C0.154726 6.63762 0.45545 5.71208 1.21618 5.55636L5.36916 4.70623C5.65195 4.64834 5.89593 4.47108 6.03838 4.22002L8.13024 0.533005Z" fill="#EFBC21"/>
          </svg>
          <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.13024 0.533005C8.51342 -0.142371 9.48658 -0.142372 9.86976 0.533003L11.9616 4.22001C12.1041 4.47108 12.3481 4.64834 12.6308 4.70623L16.7838 5.55636C17.5445 5.71208 17.8453 6.63762 17.3214 7.21075L14.4612 10.3396C14.2665 10.5526 14.1733 10.8394 14.2056 11.1263L14.6804 15.3387C14.7674 16.1103 13.9801 16.6823 13.2731 16.3612L9.4136 14.6079C9.15079 14.4885 8.84921 14.4885 8.5864 14.6079L4.72688 16.3612C4.0199 16.6823 3.23259 16.1103 3.31957 15.3387L3.79439 11.1263C3.82672 10.8395 3.73353 10.5526 3.53877 10.3396L0.678637 7.21075C0.154726 6.63762 0.45545 5.71208 1.21618 5.55636L5.36916 4.70623C5.65195 4.64834 5.89593 4.47108 6.03838 4.22002L8.13024 0.533005Z" fill="#EFBC21"/>
          </svg>
          <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.13024 0.533005C8.51342 -0.142371 9.48658 -0.142372 9.86976 0.533003L11.9616 4.22001C12.1041 4.47108 12.3481 4.64834 12.6308 4.70623L16.7838 5.55636C17.5445 5.71208 17.8453 6.63762 17.3214 7.21075L14.4612 10.3396C14.2665 10.5526 14.1733 10.8394 14.2056 11.1263L14.6804 15.3387C14.7674 16.1103 13.9801 16.6823 13.2731 16.3612L9.4136 14.6079C9.15079 14.4885 8.84921 14.4885 8.5864 14.6079L4.72688 16.3612C4.0199 16.6823 3.23259 16.1103 3.31957 15.3387L3.79439 11.1263C3.82672 10.8395 3.73353 10.5526 3.53877 10.3396L0.678637 7.21075C0.154726 6.63762 0.45545 5.71208 1.21618 5.55636L5.36916 4.70623C5.65195 4.64834 5.89593 4.47108 6.03838 4.22002L8.13024 0.533005Z" fill="#EFBC21"/>
          </svg>
          <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.13024 0.533005C8.51342 -0.142371 9.48658 -0.142372 9.86976 0.533003L11.9616 4.22001C12.1041 4.47108 12.3481 4.64834 12.6308 4.70623L16.7838 5.55636C17.5445 5.71208 17.8453 6.63762 17.3214 7.21075L14.4612 10.3396C14.2665 10.5526 14.1733 10.8394 14.2056 11.1263L14.6804 15.3387C14.7674 16.1103 13.9801 16.6823 13.2731 16.3612L9.4136 14.6079C9.15079 14.4885 8.84921 14.4885 8.5864 14.6079L4.72688 16.3612C4.0199 16.6823 3.23259 16.1103 3.31957 15.3387L3.79439 11.1263C3.82672 10.8395 3.73353 10.5526 3.53877 10.3396L0.678637 7.21075C0.154726 6.63762 0.45545 5.71208 1.21618 5.55636L5.36916 4.70623C5.65195 4.64834 5.89593 4.47108 6.03838 4.22002L8.13024 0.533005Z" fill="#EFBC21"/>
          </svg>
          <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.13024 0.533005C8.51342 -0.142371 9.48658 -0.142372 9.86976 0.533003L11.9616 4.22001C12.1041 4.47108 12.3481 4.64834 12.6308 4.70623L16.7838 5.55636C17.5445 5.71208 17.8453 6.63762 17.3214 7.21075L14.4612 10.3396C14.2665 10.5526 14.1733 10.8394 14.2056 11.1263L14.6804 15.3387C14.7674 16.1103 13.9801 16.6823 13.2731 16.3612L9.4136 14.6079C9.15079 14.4885 8.84921 14.4885 8.5864 14.6079L4.72688 16.3612C4.0199 16.6823 3.23259 16.1103 3.31957 15.3387L3.79439 11.1263C3.82672 10.8395 3.73353 10.5526 3.53877 10.3396L0.678637 7.21075C0.154726 6.63762 0.45545 5.71208 1.21618 5.55636L5.36916 4.70623C5.65195 4.64834 5.89593 4.47108 6.03838 4.22002L8.13024 0.533005Z" fill="#A4BCE6"/>
          </svg>
          <span class="review-status text-xs text-[#2B313B] font-bold ml-2">8.5</span><span class="total-review text-xs text[#6C7A93] font-normal ml-2">(10089 Reviews)</span>
                                      </div>
                                      <button type="button" class="add-notification bg-[#FFF6F3] flex align-middle justify-between w-full p-3">
                                          <div class="flex items-center">
                                              <span class="notification-icon mr-2">
                                                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M0.602276 1.70704L6.99957 4.90568L13.3969 1.707C13.3487 0.866717 12.652 0.200195 11.7996 0.200195H2.19961C1.34722 0.200195 0.650517 0.866739 0.602276 1.70704Z" fill="#FC7428"/>
                                                      <path d="M13.3996 3.49452L6.99957 6.69454L0.599609 3.49456V8.2002C0.599609 9.08385 1.31595 9.8002 2.19961 9.8002H11.7996C12.6833 9.8002 13.3996 9.08385 13.3996 8.2002V3.49452Z" fill="#FC7428"/>
                                                      </svg>
                                              </span>
                                              <span class="text=[#FC7428] text-sm font-normal">Set Notification for this Product</span>
                                          </div>
                                          <div>
                                              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M5.33789 1.52918C5.22354 1.10241 4.78487 0.84914 4.35809 0.963493C3.93132 1.07785 3.67805 1.51652 3.79241 1.94329L3.99946 2.71603C4.11382 3.1428 4.55249 3.39607 4.97926 3.28172C5.40603 3.16736 5.6593 2.72869 5.54494 2.30192L5.33789 1.52918Z" fill="#112954"/>
                                                  <path d="M1.94378 3.79192C1.517 3.67757 1.07833 3.93083 0.963981 4.35761C0.849628 4.78438 1.10289 5.22305 1.52967 5.3374L2.30241 5.54446C2.72918 5.65881 3.16785 5.40554 3.2822 4.97877C3.39656 4.552 3.14329 4.11333 2.71652 3.99898L1.94378 3.79192Z" fill="#112954"/>
                                                  <path d="M8.99454 3.3372C9.30696 3.02478 9.30696 2.51824 8.99454 2.20582C8.68212 1.89341 8.17559 1.8934 7.86317 2.20582L7.29748 2.77151C6.98506 3.08393 6.98506 3.59046 7.29748 3.90288C7.6099 4.2153 8.11643 4.2153 8.42885 3.90288L8.99454 3.3372Z" fill="#112954"/>
                                                  <path d="M3.33768 8.99405L3.90337 8.42836C4.21579 8.11595 4.21579 7.60941 3.90337 7.29699C3.59095 6.98457 3.08442 6.98457 2.772 7.29699L2.20631 7.86268C1.89389 8.1751 1.89389 8.68163 2.20631 8.99405C2.51873 9.30647 3.02526 9.30647 3.33768 8.99405Z" fill="#112954"/>
                                                  <path d="M5.89762 4.85721C5.60049 4.73836 5.26111 4.80802 5.03482 5.03431C4.80853 5.2606 4.73888 5.59997 4.85773 5.89711L8.05773 13.8971C8.17473 14.1896 8.4525 14.3862 8.76726 14.3993C9.08203 14.4124 9.37516 14.2395 9.51605 13.9578L10.6197 11.7505L13.0348 14.1657C13.3472 14.4781 13.8538 14.4781 14.1662 14.1657C14.4786 13.8533 14.4786 13.3467 14.1662 13.0343L11.751 10.6192L13.9583 9.51554C14.2401 9.37465 14.4129 9.08151 14.3998 8.76675C14.3867 8.45199 14.1901 8.17421 13.8976 8.05721L5.89762 4.85721Z" fill="#112954"/>
                                              </svg>
                                          </div>
                                      </button>
                                      <div class="sm-note text-[#6C7A93] text-xs font-normal italic my-4">
                                          *Price Start from lower to high
                                      </div>
                                      <div class="brand-list-wrapper rounded-md border border-[#F5F8FF] bg-white">
                                          <div class="brands-s flex items-center justify-between py-4 px-3 border-b border-[#F5F8FF]">
                                              <div class="modal-brand-logo flex h-4 w-auto">
                                                  <img src="@/assets/img/providers/bol.com-big.png" class="w-full h-auto" alt="logo">
                                              </div>
                                              <div class="price flex items-center align-bottom">
                                                  <span class="price text-[#2B313B] text-base font-black ">$250</span> 
                                                  <span class="original-price line-through text-[#D3D7DE] text-xs font-normal">$290</span>
                                              </div>
                                              <div class="condition text-[#6C7A93] text-xs font-normal">
                                                  New
                                              </div>
                                              <div class="shipping text-xs text-[#26BA65] font-bold">
                                                  Free Shipping
                                              </div>
                                              <a href="#" class="bg-[#112954] w-8 h-8 rounded-full flex items-center justify-center">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83392 11.7657C5.5215 11.4533 5.5215 10.9467 5.83392 10.6343L8.46824 8L5.83392 5.36569C5.5215 5.05327 5.5215 4.54673 5.83392 4.23431C6.14634 3.9219 6.65288 3.9219 6.96529 4.23431L10.1653 7.43431C10.4777 7.74673 10.4777 8.25327 10.1653 8.56569L6.9653 11.7657C6.65288 12.0781 6.14634 12.0781 5.83392 11.7657Z" fill="white"/>
                                                    </svg>
                                                </a>
                                          </div>
                                          <div class="brands-s flex items-center justify-between py-4 px-3 border-b border-[#F5F8FF]">
                                              <div class="modal-brand-logo flex h-4 w-auto">
                                                  <img src="@/assets/img/providers/media_mart.png" class="w-full h-auto" alt="logo">
                                              </div>
                                              <div class="price flex items-center align-bottom">
                                                  <span class="price text-[#2B313B] text-base font-black ">$250</span> 
                                                  <span class="original-price line-through text-[#D3D7DE] text-xs font-normal">$290</span>
                                              </div>
                                              <div class="condition text-[#6C7A93] text-xs font-normal">
                                                  New
                                              </div>
                                              <div class="shipping text-xs text-[#26BA65] font-bold">
                                                  Free Shipping
                                              </div>
                                              <a href="#" class="bg-[#112954] w-8 h-8 rounded-full flex items-center justify-center">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83392 11.7657C5.5215 11.4533 5.5215 10.9467 5.83392 10.6343L8.46824 8L5.83392 5.36569C5.5215 5.05327 5.5215 4.54673 5.83392 4.23431C6.14634 3.9219 6.65288 3.9219 6.96529 4.23431L10.1653 7.43431C10.4777 7.74673 10.4777 8.25327 10.1653 8.56569L6.9653 11.7657C6.65288 12.0781 6.14634 12.0781 5.83392 11.7657Z" fill="white"/>
                                                    </svg>
                                                </a>
                                          </div>
                                          <div class="stock-out brands-s flex items-center justify-between py-4 px-3 border-b border-[#F5F8FF]">
                                              <div class="modal-brand-logo flex h-4 w-auto">
                                                  <img src="@/assets/img/providers/bcc.png" class="w-full h-auto" alt="logo">
                                              </div>
                                              <div class="price flex items-center align-bottom">
                                                  <span class="price text-[#2B313B] text-base font-black ">$250</span> 
                                                  <span class="original-price line-through text-[#D3D7DE] text-xs font-normal">$290</span>
                                              </div>
                                              <div class="condition text-[#6C7A93] text-xs font-normal">
                                                  New
                                              </div>
                                              <div class="shipping text-xs text-[#F22222] font-bold">
                                                  Out of Stock
                                              </div>
                                              <a href="#" class="bg-[#112954] w-8 h-8 rounded-full flex items-center justify-center">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83392 11.7657C5.5215 11.4533 5.5215 10.9467 5.83392 10.6343L8.46824 8L5.83392 5.36569C5.5215 5.05327 5.5215 4.54673 5.83392 4.23431C6.14634 3.9219 6.65288 3.9219 6.96529 4.23431L10.1653 7.43431C10.4777 7.74673 10.4777 8.25327 10.1653 8.56569L6.9653 11.7657C6.65288 12.0781 6.14634 12.0781 5.83392 11.7657Z" fill="white"/>
                                                    </svg>
                                                </a>
                                          </div>
                                          <div class="stock-out brands-s flex items-center justify-between py-4 px-3 border-b border-[#F5F8FF]">
                                              <div class="modal-brand-logo flex h-4 w-auto">
                                                  <img src="@/assets/img/providers/art_craft.png" class="w-full h-auto" alt="logo">
                                              </div>
                                              <div class="price flex items-center align-bottom">
                                                  <span class="price text-[#2B313B] text-base font-black ">$250</span> 
                                                  <span class="original-price line-through text-[#D3D7DE] text-xs font-normal">$290</span>
                                              </div>
                                              <div class="condition text-[#6C7A93] text-xs font-normal">
                                                  New
                                              </div>
                                              <div class="shipping text-xs text-[#F22222] font-bold">
                                                Out of Stock
                                              </div>
                                              <a href="#" class="bg-[#112954] w-8 h-8 rounded-full flex items-center justify-center">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83392 11.7657C5.5215 11.4533 5.5215 10.9467 5.83392 10.6343L8.46824 8L5.83392 5.36569C5.5215 5.05327 5.5215 4.54673 5.83392 4.23431C6.14634 3.9219 6.65288 3.9219 6.96529 4.23431L10.1653 7.43431C10.4777 7.74673 10.4777 8.25327 10.1653 8.56569L6.9653 11.7657C6.65288 12.0781 6.14634 12.0781 5.83392 11.7657Z" fill="white"/>
                                                    </svg>
                                                </a>
                                          </div>
                                      </div>
                                        <div class="btn-area">
                                            <button class="btn-translate-z bg-[#112954] w-auto opacity-100 hover:opacity-90 transition text-white flex text-sm font-bold text-center justify-center items-center rounded-md py-[10px] px-8 mx-auto mt-4 mb-8"><span class="flex items-center">Show More</span></button>
                                        </div>
                                  </div>
                              </div>
                              <div class="chart-wrapper mt-0 hidden md:block">
                                <div class="flex items-center justify-between mb-6">
                                    <div class="chart-info">
                                        <div class="text-[#6C7A93] text-xs font-normal">Current Price</div>
                                        <div class="text-[#0052FE] text-xl font-bold flex items-center">$250 - $270
                                            <span class="product-status flex items-center text-[#1D9E54] font-normal text-xs ml-4"><img src="@/assets/img/icons/sell-arrow-green.svg" class=" mr-1 w-4 h-4" alt="icon"> -24%</span>
                                        </div>
                                    </div>
                                    <div class="flex items-center chart-btn">
                                        <a href="" class="text-[#6C7A93] text-sm font-normal">1D</a>
                                        <a href="" class="active-chart text-[#6C7A93] text-sm font-normal">1W</a>
                                        <a href="" class="text-[#6C7A93] text-sm font-normal">1M</a>
                                        <a href="" class="text-[#6C7A93] text-sm font-normal">1Y</a>
                                    </div>
                                </div>
                                  <div ref="aanbiending24" class="">
                                      <canvas id="myChart1" width="400" height="400"></canvas>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
          </div>

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
                            <button class="modal-btn btn-translate-z bg-[#112954] w-full opacity-100 hover:opacity-90 transition text-white flex text-sm font-bold text-center justify-center items-center rounded-md py-[10px] px-2"><span
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