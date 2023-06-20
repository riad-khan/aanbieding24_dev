<script setup>
import {stripTrailingSlash,generateSlug} from '../../helpers/helperFunctions';
const props = defineProps(['category','section_title'])
const config = useRuntimeConfig();
const apiUrl = config.public.api;
const imageUrl = config.public.imageUrl;

//const {data : offeredCategories} = await useAsyncData('offered_categories',()=>$fetch(`${apiUrl}/offered-category/`));

console.log(props.category);



onMounted(()=>{
    refreshNuxtData('offered_categories')
})

</script>
<template>
        <div class="category-offer-area">
            <div class="flex flex-wrap items-center justify-between">

                <div class="single-category-box border border-[#F5F8FF] shadow-none transition hover:shadow-md rounded-md" v-for="(category,i) in category[section_title]" :key="i">
                    <nuxt-link :to="'/category-details/'+generateSlug(category.category_name)+'-'+category.id">
                    <div class="category-img-box h-[140px] w-40 flex items-center justify-center border-b border-[#F5F8FF]">
                        <img :src="stripTrailingSlash(imageUrl)+category.category_image" class="h-auto w-auto" alt="image">
                    </div>
                    <div class="category-name-sm h-[60px] w-full flex items-center justify-center">
                        <h5>{{ category.category_name }}</h5>
                    </div>
                </nuxt-link>
                </div>
                
            </div>
        </div>
</template>