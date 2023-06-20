<template>
     <div class="articles mb-3 border-l border-t rounded-t-[5px] border-r border-[#F5F8FF]">
                            <h3 class="p-6 border-t border-b border-[#F5F8FF] mx-auto md:text-base lg:text-2xl text-xl text-[#2B313B] font-bold">
                                Hot News</h3>


                            <nuxt-link :to="'/blog/'+generateSlug(blog.blog_title)+'-'+blog.id" class="flex px-3 items-center justify-between align-middle transition-all opacity-100 border-b border-[#F5F8FF] hover:opacity-90 bg-white py-2.5" v-for="(blog,i) in hotBlogs">
                                <span class="fixed-size overflow-hidden w-[97px] h-[78px] rounded-[5px] ">
                                     <img class="object-cover mt-2 w-auto h-auto mb-0" :src="stripTrailingSlash(imageUrl) + blog.url" alt="icon">
                                </span>
                                <div class="ml-3 text-sm sm:text-xs lg:text-sm w-10/12 font-bold flex items-start flex-col">
                                   <div class="block"> {{ blog.blog_title }}</div>
                                    
                                <div class="flex items-center justify-between mt-2 w-full">    
                                        <div class="news-tags"> 
                                            <span class="w-fit bg-[#EBF1FF] text-[#0051FF] text-xs font-semibold mr-1 px-2.5 py-1.5 rounded " v-for="tag in splitComma(blog.tag_name)">{{ tag }}</span>
                                        </div>
                                        
                                        <div class="post-date text-xs font-normal text-[#6C7A93] flex flex-row items-center"><svg class="ml-4 mr-1" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 9C7.20914 9 9 7.20914 9 5C9 2.79086 7.20914 1 5 1C2.79086 1 1 2.79086 1 5C1 7.20914 2.79086 9 5 9ZM5.5 3C5.5 2.72386 5.27614 2.5 5 2.5C4.72386 2.5 4.5 2.72386 4.5 3V5C4.5 5.13261 4.55268 5.25979 4.64645 5.35355L6.06066 6.76777C6.25592 6.96303 6.5725 6.96303 6.76777 6.76777C6.96303 6.5725 6.96303 6.25592 6.76777 6.06066L5.5 4.79289V3Z" fill="white"/>
                                            </svg> 10 minutes
                                        </div>
                                    </div>
                                </div>
                            </nuxt-link>


                       

                        </div>
</template>

<script setup>
import {stripTrailingSlash,splitComma,readingTime,convertTime,generateSlug} from '../../helpers/helperFunctions'
const props = defineProps(["product_id","category_id"]);
let imageUrl;
let apiUrl;
const config = useRuntimeConfig();
apiUrl = config.public.api;
imageUrl = config.public.imageUrl;

console.log(props.product_id);
console.log(props.category_id);


const { data: hotBlogs } = await useAsyncData('hot_blogs', () => $fetch(`${apiUrl}/category-highlighted-blogs/${props.category_id}/${props.product_id}`));

onMounted(() => {
    refreshNuxtData('hot_blogs');
})

console.log(hotBlogs);


</script>

<style scoped>

.news-tags {
    display: block;
    width: 100%;
}
</style>