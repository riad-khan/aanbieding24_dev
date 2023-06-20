<script setup>
const config = useRuntimeConfig();
const apiUrl = config.public.api;
const {data:contents} = await useAsyncData('get_provider_contetns',()=>$fetch(`${apiUrl}/provider-text-content`));

onMounted(()=>{
    refreshNuxtData('get_provider_contetns');
});
console.log(contents.value);

</script>
<template>
                    <div class="more-text-area my-16">


                        <div class="mb-8" v-for="(content,i) in contents" :key="i">
                            <h5 class="text-[#2B313B] text-xl font-bold mb-[14px]">{{ content.content_title }}</h5>
                            <p class="text-[#6C7A93] text-base font-normal leading-relaxed">{{ content.content }}</p>
                        </div>
                       
                </div>
</template>