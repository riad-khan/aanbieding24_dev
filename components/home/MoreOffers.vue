<script setup>
const config = useRuntimeConfig();
const api = config.public.api;
const {data:linkCategories} = await useAsyncData('link_categories',()=>$fetch(`${api}/home-section-link-categories`))

onMounted(()=>{
    refreshNuxtData('link_categories');
})



</script>
<template>
    <div class="more-offers-area mt-10">
        
        <div class="offer-single-start mb-16" v-for="(category,i) in linkCategories.data" :key="i">
            <h5 class="text-[#2B313B] text-xl font-bold mb-3">{{ category.attributes.name }}</h5>
            
            <home.sectionItem :section_title="category.attributes.name" :id="category.id" />
        </div>
        
    </div>
</template>