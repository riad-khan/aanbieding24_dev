<template>
                <div class="flex py-6 flex-col items-center ">
                    <div class="content text-left flex-none sm:flex sm:justify-between sm:items-center">

                        <div class="text-content flex flex-col md:w-1/2 text-left md:pr-8">
                            <h1 class="sm:text-xl text-2xl leading-10 font-bold mb-4 md:mb-8 text-[#2B313B]">{{ props.category_info[0].category_name }}</h1>
                            <p class="font-normal text-base text-[#6C7A93]">{{ props.category_info[0].description }}</p>
                        </div>
                        <div class="img-box w-full md:flex md:justify-end md:w-1/2 order-none mb-6 sm:m-0 sm:order-last">
                            <img :src="stripTrailingSlash(imageUrl) + props.category_info[0].url " class="mx-auto w-auto sm:mx-0" alt="image">
                        </div>
                    </div>
                </div>
</template>
<script setup>
import {stripTrailingSlash} from '../../helpers/helperFunctions'
const props = defineProps(['category_info']);
const config = useRuntimeConfig();
const imageUrl = config.public.imageUrl;



</script>