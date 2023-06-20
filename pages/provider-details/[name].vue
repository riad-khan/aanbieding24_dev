<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const apiUrl = config.public.api;
const imageUrl = config.public.imageUrl;

const provider_name = route.params.name;
const finalName = provider_name.replace(/-/g," ");

const {data:provider_details} = await useAsyncData('provider_details',()=>$fetch(`${apiUrl}/provider-details/${finalName}`));

onMounted(()=>{
    refreshNuxtData('provider_details');
})







</script>

<template>
            <section class="bg-[#F5F8FF] w-full p-4 mt-8 pb-0 md:pt-12">
            <div class="container mx-auto max-w-screen-xl"><!-- container start -->
                
                   <ProviderDetailsTopSection :provider_details="provider_details[0]" />
                
            </div><!-- container end -->
        </section>
        <section class="bg-[#ffffff] w-full p-4 md:p-12">
            <div class="container mx-auto max-w-screen-xl"><!-- container start -->

                <ProviderDetailsSearchProduct :provider_name="provider_details[0].provider_name" />

                <ProviderDetailsMoreInfo />
                
                <ProviderDetailsProductTable />

            </div>
        </section>
</template>