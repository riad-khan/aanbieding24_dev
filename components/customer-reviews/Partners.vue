<script>


  // import Swiper core and required modules
  import { Pagination, A11y, Autoplay } from 'swiper';

  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/autoplay';

  // Import Swiper styles
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      return {
        onSwiper,
        onSlideChange,        
        pagination: {
          clickable: true,
        },
        modules: [Pagination, A11y, Autoplay],
      };
    },
  };

</script> 
<style scoped>
.swiper-button-next:after, .swiper-button-prev:after {
    font-size: 14px;
    color: #2B313B;
    font-weight: bold;
    transition: 250ms;
}

.swiper-button-next, .swiper-button-prev {
    background: #fff;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    transition: 250ms;
}

.swiper-button-next:hover:after, .swiper-button-prev:hover:after {
    color: #fff;
}

.swiper-button-next:hover, .swiper-button-prev:hover {
    background: #112954;
}
.swiper-button-next {
    right: 0;
}

.swiper-button-prev {
    left: 0;
}
.swiper-horizontal>.swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction {
    right: 0;
    top: -8px;
    width: auto;
    left: auto;
}
.swiper {
    margin-top: -15px;
}
span.swiper-pagination-bullet {
    background: #BDCFF9;
    opacity: .9;
    height: 6px;
    width: 6px;
}
.swiper-wrapper{
    padding-top: 35px;
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
@media only screen and (max-width: 769px) {
    .swiper-horizontal>.swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction {
        display: none;
    }
    .swiper {
    margin-top: 0;
}
}
</style>
<template>
        <div class="heading-area mt-6">
            <h2 class="flex items-center text-[#2B313B] font-bold text-[20px] mb-1">Our Partners</h2>
            <p class="tag-line text-[#6C7A93] text-sm font-normal">View all Loungeset offers directly</p>
        </div>
        <div class="partners-area">
        <swiper     
    :breakpoints="{
      '300': {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      '768': {
        slidesPerView: 4,
        spaceBetween: 45,
      },
      '1024': {
        slidesPerView: 6,
        spaceBetween: 90,
      },
    }" 
    :modules="modules"
    :slides-per-view="6"
    :space-between="90"
    autoplay
    :pagination="pagination"
    :loop="true"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
            <swiper-slide>
                <div class="partner-logo">
                    <img src="@/assets/img/partners/Rectangle990.png" alt="logo">
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="partner-logo">
                    <img src="@/assets/img/partners/Rectangle992.png" alt="logo">
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="partner-logo">
                    <img src="@/assets/img/partners/Rectangle993.png" alt="logo">
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="partner-logo">
                    <img src="@/assets/img/partners/Rectangle994.png" alt="logo">
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="partner-logo">
                    <img src="@/assets/img/partners/Rectangle997.png" alt="logo">
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="partner-logo">
                    <img src="@/assets/img/partners/Rectangle1000.png" alt="logo">
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="partner-logo">
                    <img src="@/assets/img/partners/Rectangle990.png" alt="logo">
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="partner-logo">
                    <img src="@/assets/img/partners/Rectangle992.png" alt="logo">
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="partner-logo">
                    <img src="@/assets/img/partners/Rectangle993.png" alt="logo">
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="partner-logo">
                    <img src="@/assets/img/partners/Rectangle994.png" alt="logo">
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="partner-logo">
                    <img src="@/assets/img/partners/Rectangle997.png" alt="logo">
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="partner-logo">
                    <img src="@/assets/img/partners/Rectangle1000.png" alt="logo">
                </div>
            </swiper-slide>
        </swiper>
    </div>

</template>