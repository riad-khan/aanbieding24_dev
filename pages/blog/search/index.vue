<template>
    <section class="bg-[#ffffff] w-full p-4 md:p-12">
        <div class="container mx-auto max-w-screen-xl"><!-- container start -->


            <h2 class="text-center">Search Results</h2>


            <div class="news-blog-area mt-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">


                <nuxt-link :to="'/blog/'+generateSlug(blog.blog_title)+'-'+blog.id"
                    class="flex  mb-3 p-2 flex-col transition-all border border-[#EBF1FF] rounded-[10px] hover:shadow md:flex-col  bg-white" v-for="blog in response">  
                    <div class="img-wrapper relative">
                        <img class="object-cover w-full rounded-t-lg h-auto md:rounded-none md:rounded-l-lg"
                            :src="stripTrailingSlash(imageUrl) + blog.url" alt="image">
                        <span v-for="tag in splitComma(blog.tag_name)"
                            class="news-tag-img w-fit bg-[#EBF1FF] text-[#0051FF] text-xs font-bold px-2.5 py-1.5 rounded ">{{ tag }}</span>
                    </div>
                    <div class="flex flex-col justify-between px-2 leading-normal">
                        <h5 class="mb-1 text-base font-bold tracking-tight text-[#2B313B]">
                            {{ blog.blog_title }}</h5>
                        <p class="mb-3 font-normal text-xs text-[#6C7A93]">{{ blog.short_description.substring(0,30)+"..." }}</p>
                        <div class="date-time flex items-center justify-between">
                            <span class="publish-date-time  text-[#6C7A93] font-normal text-xs">{{ convertTime(blog.created_at) }}</span>
                            <span class=" text-[#6C7A93] font-normal text-xs flex items-center justify-between">
                                <svg width="10" height="10" viewBox="0 0 10 10" class="mr-1" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M4.8542 9C6.99899 9 8.73769 7.20914 8.73769 5C8.73769 2.79086 6.99899 1 4.8542 1C2.7094 1 0.970703 2.79086 0.970703 5C0.970703 7.20914 2.7094 9 4.8542 9ZM5.3542 3C5.3542 2.72386 5.13034 2.5 4.8542 2.5C4.57806 2.5 4.3542 2.72386 4.3542 3V5C4.3542 5.13005 4.40487 5.25498 4.49546 5.34829L5.86848 6.7625C6.06084 6.96063 6.37739 6.96531 6.57551 6.77295C6.77364 6.5806 6.77832 6.26405 6.58596 6.06592L5.3542 4.79721V3Z"
                                        fill="#6C7A93" />
                                </svg>

                                {{ readingTime(blog.content) }} minutes 
                            </span>
                        </div>
                    </div>
                    <button
                        class="view-icon flex items-center justify-center py-2 px-2.5 mb-2 text-[#112954] text-sm font-bold hover:text-white border transition-all border-[#112954] rounded-md">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 mr-2"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.00001 9.5999C8.88366 9.5999 9.60001 8.88356 9.60001 7.9999C9.60001 7.11625 8.88366 6.3999 8.00001 6.3999C7.11635 6.3999 6.40001 7.11625 6.40001 7.9999C6.40001 8.88356 7.11635 9.5999 8.00001 9.5999Z"
                                fill-rule="evenodd" fill="currentColor"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M0.366211 7.99993C1.38561 4.75423 4.41785 2.3999 7.99998 2.3999C11.5821 2.3999 14.6143 4.75421 15.6337 7.99987C14.6143 11.2456 11.5821 13.5999 7.99996 13.5999C4.41786 13.5999 1.38563 11.2456 0.366211 7.99993ZM11.2 7.9999C11.2 9.76721 9.76732 11.1999 8.00001 11.1999C6.2327 11.1999 4.80001 9.76721 4.80001 7.9999C4.80001 6.23259 6.2327 4.7999 8.00001 4.7999C9.76732 4.7999 11.2 6.23259 11.2 7.9999Z"
                                fill="currentColor"></path>
                        </svg>

                        Read More
                    </button>
                </nuxt-link>





            </div>
            <!-- <nav aria-label="Page navigation example" class="my-6 text-center">
                <ul class="flex items-center justify-end">
                    <li>
                        <a href="#" class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white hover:text-gray-700">
                            <span class="sr-only">Previous</span>
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700">1</a>
                </li>
                <li>
                    <a href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700">2</a>
                </li>
                <li>
                    <a href="#" aria-current="page"
                        class="z-10 px-3 py-2 bg-[#0052FE] leading-tight transition-all text-white rounded-lg hover:bg-[#0052FE] hover:text-white">3</a>
                </li>
                <li>
                    <a href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700">4</a>
                </li>
                <li>
                    <a href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700">5</a>
                </li>

                <li>
                    <a href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700">6</a>
                </li>
                <li>
                    <a href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white px-3 py-2 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700">7</a>
                </li>

                <li>
                    <a href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700">...</a>
                </li>
                <li>
                    <a href="#"
                        class="px-3 py-2 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700">100</a>
                </li>
                <li>
                    <a href="#"
                        class="block px-3 py-2 leading-tight text-gray-500 bg-white 700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span class="sr-only">Next</span>
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </a>
                </li>
            </ul>
        </nav> -->

        </div><!-- container end -->
    </section>
</template>

<script setup>
import {readingTime,stripTrailingSlash,splitComma,generateSlug,convertTime,limitText} from '../../../helpers/helperFunctions';
const config = useRuntimeConfig();
const apiUrl = config.public.api;
const imageUrl = config.public.imageUrl;

const route = useRoute();
const keywords = route.query.keywords
const response = ref([]);

const formData = {
    keywords: keywords
};
try {
    const res = await $fetch(`${apiUrl}/search-blogs/`, {
    method: 'POST',
    body: formData
});
response.value = res;
} catch (error) {
    console.log(error);
    
}






</script>