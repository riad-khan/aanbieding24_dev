<script setup>
const config = useRuntimeConfig();
const apiUrl = config.public.api;
const imageUrl = config.public.imageUrl;
const route = useRoute();

const {data:pageData} = await useAsyncData('get_page_data',()=>$fetch(`${apiUrl}/custom_page/${route.params.slug}`));

onMounted(()=>{
    refreshNuxtData('get_page_data')
});






</script>

<template>
    <div class="container mx-auto max-w-screen-xl">
       <h1 class="text-[32px]  sm:text-left font-semibold leading-10 lg:text-[32px] mb-8 text-[#2B313B]" style="text-align: center;margin-top: 100px;margin-bottom: 100px">{{ pageData[0].page_name }}</h1>

       <div v-html="pageData[0].page_content">
        
       </div>
    </div>
</template>