<script setup>
import {generateSlug} from '../../helpers/helperFunctions';
const props = defineProps(["provider_list", "section_title"]);
const config = useRuntimeConfig();
const imageUrl = config.public.imageUrl;



</script>
<template>
    <div class="justify-between gap-6 grid grid-cols-2 lg:grid-cols-4">
        <nuxt-link :to="'/provider-details/'+generateSlug(provider.provider_name)" v-for="(provider,index) in provider_list[section_title] " class="service-btn flex flex-col md:flex-row border border-[#F5F8FF] items-center bg-white text-[#2B313B] grow w-full lg:w-[250px] text-sm font-semibold p-[17px] rounded-md hover:text-[#135FFF]"
            href=""><img :src="provider.provider_image_url" class="mr-0 md:mr-3 h-auto w-auto" style='width: 55px;' alt="icon">
            {{ provider.provider_name }}</nuxt-link>
    </div>
</template>