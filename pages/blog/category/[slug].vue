<script setup>
const route = useRoute();
const id = route.params.slug;
const idArray = id.split('-');
const finalId = idArray.pop();

const categoryName = ref('');



const removeLastWord = (string)=>{
    let words = string.split("-");
  let restOfString = words.slice(0, -1).join("-");
  return restOfString;
}
const category_name = removeLastWord(route.params.slug).replace(/-/g, " ")






</script>
<template>
    <section class="bg-[#ffffff] w-full p-4 md:p-12">
        <div class="container mx-auto max-w-screen-xl"><!-- container start -->
            
            <BlogHotNews :category_id="finalId" />        

            <BlogNewsFilter :category_id="finalId" :category_name="category_name" />

        </div><!-- container end -->
    </section>
</template>

