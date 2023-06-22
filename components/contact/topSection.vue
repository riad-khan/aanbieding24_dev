<script setup>
import {stripTrailingSlash} from '../../helpers/helperFunctions'
const config = useRuntimeConfig();
const imageUrl = config.public.imageUrl;
const props = defineProps(['section_data']);


</script>

<template>
     <div class="flex p-12 flex-col items-center bg-[#F5F8FF] rounded-[5px] mb-7 md:mb-12">
                        <div class="content text-left flex-none sm:flex sm:justify-between sm:items-center">
                            <div class="img-box w-full md:flex md:justify-end md:w-1/2 order-none mb-6 sm:m-0 sm:order-last">
                                <img :src="section_data[0].icon?stripTrailingSlash(imageUrl)+section_data[0].icon:''" class="mx-auto w-auto sm:mx-0" alt="image">
                            </div>
                            <div class="text-content flex flex-col md:w-1/2 text-left md:pr-8">
                                <h1 class="sm:text-xl text-2xl leading-10 font-bold mb-4 md:mb-8 text-[#2B313B]">{{ section_data[0].section_title }}</h1>
                                <p class="font-normal text-2xl text-[#6C7A93]" v-html="section_data[0].content"></p>

                                <a href="#" class="mt-7 outline-btn btn-translate-z flex w-fit bg-[#0052FE] opacity-100 hover:opacity-90 transition text-white text-sm font-bold py-2.5 px-14 rounded-[5px]">{{ section_data[0].button_text }}</a>
                            </div>
                        </div>
                    </div>
</template>