<script setup>
import {stripTrailingSlash} from '../../helpers/helperFunctions'
const config = useRuntimeConfig();
const imageUrl = config.public.imageUrl;
const props = defineProps(['section_data']);


</script>
<template>
    <div class="contact-details mb-7">
                        <div class="contact-info flex items-center justify-between">
                            <div class="contact-inner text-center justify-center w-full md:w-[320px] border border-[#F5F8FF] rounded-[5px]" v-for="(item,i) in section_data" :key="i">
                                <div class="contact-icon">
                                    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="36" cy="36" r="36" fill="#0052FE"/>
                                        <path d="M23.1992 24.8002C23.1992 23.9165 23.9156 23.2002 24.7992 23.2002H28.2438C29.026 23.2002 29.6935 23.7657 29.822 24.5372L31.0049 31.6346C31.1204 32.3274 30.7705 33.0145 30.1423 33.3287L27.6652 34.5672C29.4513 39.0055 32.9939 42.5481 37.4322 44.3342L38.6707 41.8572C38.9849 41.2289 39.672 40.879 40.3649 40.9945L47.4623 42.1774C48.2338 42.306 48.7992 42.9735 48.7992 43.7556V47.2002C48.7992 48.0838 48.0829 48.8002 47.1992 48.8002H43.9992C32.5117 48.8002 23.1992 39.4877 23.1992 28.0002V24.8002Z" fill="white"/>
                                    </svg>
                                </div>
                                <h3 class="text-[#2B313B] text-xl font-bold mb-4">{{ item.section_title }}</h3>
                                <p class="font-normal text-[#6C7A93] text-sm" v-html="item.content"></p>
                            </div>
                          
                          
                        </div>
                    </div>
</template>