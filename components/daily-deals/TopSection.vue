<script setup>
const config = useRuntimeConfig();
const apiUrl = config.public.api;
const {data:settings} = await useAsyncData('daily_deals',()=>$fetch(`${apiUrl}/daily-deals-settings`));

</script>
<template>
    <div class="single-offer-box flex flex-col items-center rounded-[5px] p-6 md:p-11">
        <div class="content flex justify-center items-center">

            <div class="text-content flex flex-col w-full text-center">
                <h1 class="text-xs font-normal mb-2 text-[#F22222]">{{ settings[0].discount_text }}</h1>
                <h2 class="text-[#2B313B] text-[40px] mb-2 leading-9" v-html="settings[0].section_title"></h2>
                <p class="font-normal text-sm text-[#6C7A93]">{{ settings[0].caption_text }}</p>
                <div class="load-more-btn text-center">
                    <button class="view-icon py-2.5 px-8  mt-8 border transition-all border-[#112954]  rounded-[5px] text-white bg-[#112954] hover:bg-transparent hover:text-[#112954]">{{ settings[0].button_text }}</button>
                </div>
            </div>
        </div>
    </div>
</template>