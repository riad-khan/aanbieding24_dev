<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const apiUrl = config.public.api;
const imageUrl = config.public.imageUrl;
const id = route.params.slug;
const idArray = id.split('-');
const finalId = idArray.pop();

const {data: category} = await useAsyncData('category_products',()=>$fetch(`${apiUrl}/category-details/${finalId}`),{initialCache: false});
onMounted(() => {
    refreshNuxtData('category_products');
})

const removeLastWord = (slug) =>{
    let words = slug.split('-');
    if(words.length > 1){
        words.pop()
    }

    let result = words.join(' ');
    return result.charAt(0).toUpperCase() + result.slice(1)
}

useHead({
    titleTemplate:`Aanbieding24 - ${removeLastWord(route.params.slug)}`
})




</script>
<template>

        <section class="bg-[#F5F8FF] w-full p-4 md:p-12">
            <div class="container mx-auto max-w-screen-xl"><!-- container start -->
                
                    <CategoryDetailsTopSection :category_info="category.category_details" />
                
            </div><!-- container end -->
        </section>
        <section class="bg-[#ffffff] w-full p-4 md:p-12">
            <div class="container mx-auto max-w-screen-xl"><!-- container start -->
                    
                    <CategoryDetailsPartners />

                    <CategoryDetailsSearchProduct :products="category.product" />
                
                <!-- more text start -->

                <!-- <CategoryDetailsMoreInfo />     -->
                
                <!-- more text end -->

                <!-- product table start -->

                <!-- <CategoryDetailsProductTable /> -->


             

                <!-- product table end -->

            </div><!-- container end -->
        </section>
</template>