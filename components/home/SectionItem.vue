<script setup>
const config = useRuntimeConfig();
const api = config.public.api;
const props = defineProps(["section_title","id"])
const links = {};

const {data:linksData} = await useAsyncData('get_links',()=>$fetch(`${api}/home-link-category-items/${props.id}`));

links[props.section_title] = linksData.value;


// Create four subarrays

// Calculate the size of each subarray
const subarraySize = Math.ceil(links[props.section_title].length / 4);

const subarrays = [];
let startIndex = 0;

for (let i = 0; i < 4; i++) {
  const subarray = links[props.section_title].slice(startIndex, startIndex + subarraySize);
  subarrays.push(subarray);
  startIndex += subarraySize;
}









</script>

<template>
   <div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
                <div class="list-s">
                   
                    <ul class="text-[#2B313B] text-sm font-normal leading-[1.75]">
                        <li v-for="(item,i) in subarrays[0]"><a :href="item.url">{{ item.text }}</a></li>
                        
                    </ul>
                </div>
                <div class="list-s">
                    <ul class="text-[#2B313B] text-sm font-normal leading-[1.75]">                        
                        <li v-for="(item,i) in subarrays[1]"><a :href="item.url">{{ item.text }}</a></li>
                    </ul>
                </div>
                <div class="list-s">
                    <ul class="text-[#2B313B] text-sm font-normal leading-[1.75]">
                        <li v-for="(item,i) in subarrays[2]"><a :href="item.url">{{ item.text }}</a></li>
                    </ul>
                </div>
                <div class="list-s">
                    <ul class="text-[#2B313B] text-sm font-normal leading-[1.75]">
                        <li v-for="(item,i) in subarrays[3]"><a :href="item.url">{{ item.text }}</a></li>
                    </ul>
                </div>
            </div>
</template>