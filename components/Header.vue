<script setup>
import {generateSlug,} from '../helpers/helperFunctions';
import CryptoJS from 'crypto-js';
let apiUrl;
let imageUrl;
//nav icon change start
const config = useRuntimeConfig();
apiUrl = config.public.api;
imageUrl = config.public.imageUrl;
const { data: categories } = await useAsyncData('fetch_categories', () => $fetch(`${apiUrl}/categories`));

const allCategories = categories.value.categories;
const relatedCat = categories.value.relatedCategories
let child = {};
let subChild = {};
const parentCat = allCategories.filter(category => !relatedCat.some(item => category.id == item.category_id));
const subParentCat = allCategories.filter(category => relatedCat.some(item => category.id == item.inv_category_id));

parentCat.map((item, i) => {
    child[item.category_name] = relatedCat.filter(obj => obj["inv_category_id"] === item.id)

});
subParentCat.map((item, i) => {
    if (!child.hasOwnProperty(item.category_name)) {
        subChild[item.category_name] = relatedCat.filter(obj => obj["inv_category_id"] === item.id)
    }
})





const CategoryInfo = (id) => {
    return allCategories.find(obj => obj.id === id)
}


const {data: headeSettings} = await useAsyncData('header_settings',()=>$fetch(`${apiUrl}/header-settings`));





onMounted(() => {
    refreshNuxtData('fetch_categories');
    refreshNuxtData('header_settings');
})

const stripTrailingSlash = () => {
    return imageUrl.endsWith('/') ?
        imageUrl.slice(0, -1) :
        imageUrl;
};

const toggleClass = () => {
    let button = document.querySelector('#nav-icon');
    let nav = document.querySelector('nav');
    button.classList.toggle('open');
    nav.classList.toggle('hidden');
    nav.classList.toggle('flex');
}

//search function starts from here
const searchKeyWords = ref("");
const router = useRouter();
const secretKey = 'mySecretKey';
const searchProducts = () =>{
    
    router.push(`/products/search?keywords=${searchKeyWords.value}`);
    
}
</script>


<template>
    <!-- header start -->
    <header>

        <div class="w-full z-40absolute md:relative text-gray-700 bg-white">
            <div class="flex flex-col max-w-screen-xl px-2 mx-auto md:items-center md:justify-between md:flex-row md:px-0 ">
                <div class="py-4 flex flex-row items-center justify-between">
                    <a href="#" class="flex md:hidden items-center w-40"><img :src="stripTrailingSlash(imageUrl) + headeSettings[0].header_logo"
                            class="mr-3 h-6 sm:h-9" alt="Logo" /></a>
                    <button class="md:hidden rounded-lg focus:outline-none focus:shadow-outline">
                        <div id="nav-icon" @click="toggleClass">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>
                <nav class="flex-col flex-grow items-center pb-4 md:pb-0 hidden md:flex md:justify-between md:flex-row">
                    <NuxtLink to="/" class="hidden md:flex items-center w-40"><img :src="stripTrailingSlash(imageUrl) + headeSettings[0].header_logo"
                            class="mr-3 h-6 sm:h-9" alt="Logo" /></NuxtLink>
                    <div
                        class="search-area py-2 mx-2 text-sm font-semibold text-[#0052fe] flex items-center justify-center bg-white hover:text-blue-500 ">
                        <div class="flex search-bar">
                            <form @submit.prevent="searchProducts()" method="post">
                                <input type="hidden" name="_token" value="">
                                <div class="relative single-field-wrapper">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <button type="submit">
                                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <input type="text" id="default-search"
                                        class="rounded-none rounded-l-md bg-white border border-r-0 border-[#A4BCE6] text-[#6C7A93] font-normal text-xs focus:ring-[#3b82f6] focus:outline-none focus:border-[#3b82f6] block flex-1 min-w-0 w-full md:w-96 p-3 pl-10"
                                        :placeholder="headeSettings[0].searchbar_placeholder_text" name="search" required=""
                                        v-model="searchKeyWords"
                                        >
                                </div>
                            </form>


                            <div
                                class="mega-menu inline-flex items-center bg-white focus:ring-[3b82f6] border-[#A4BCE6] border rounded-r-md">
                                <button
                                    class="flex flex-row items-center w-full py-2 mx-2 text-sm font-semibold text-left text-[#2B313B] bg-transparent transition md:w-auto md:inline md:mt-0 md:ml-4 hover:text-blue-500 ">
                                    <span>{{ headeSettings[0].dropdownmenu_text }} </span>
                                    <svg fill="currentColor" viewBox="0 0 20 20"
                                        class="arrow-icon inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1">
                                        <path fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </button>
                                <div class="menu-wrapper absolute right-0 w-full origin-top-right rounded-md shadow-lg ">
                                    <div
                                        class="mega-menu-wrapper container mx-auto max-w-screen-xl grid inset-x-0 top-0 absolute z-40 grid-cols-1 w-full text-sm bg-white shadow-md rounded-lg">
                                        <div class="py-5 max-w-screen-xl">
                                            <ul class="mega-menu-full-dropdown-button leading-7">


                                                <li class="menu-item dropdown" @mouseover="showSubMenu"
                                                    v-for="category in parentCat">
                                                    <nuxt-link :to="'/category-details/'+category.category_name+'-'+category.id"
                                                        class="flex items-center text-sm font-bold text-[#253F73] px-4 py-3 transition"><svg
                                                            width="20" height="18" class="h-5 w-5 mr-2" viewBox="0 0 20 18"
                                                            fill="none">

                                                            <path class="st0" d="M1.2,1h16.3c0.2,0,0.3,0.1,0.4,0.2c0.1,0.1,0.2,0.3,0.2,0.4v12.6c0,0.2-0.1,0.3-0.2,0.4
	c-0.1,0.1-0.3,0.2-0.4,0.2H1.2c-0.1,0-0.2,0-0.2,0c-0.1,0-0.1-0.1-0.2-0.1c-0.1-0.1-0.1-0.1-0.1-0.2c0-0.1,0-0.1,0-0.2V1.6
	c0-0.2,0.1-0.3,0.2-0.4C0.9,1.1,1.1,1,1.2,1z M17.4,1.7h-16V14h16V1.7z" fill="#253F73" />
                                                            <path class="st0" d="M2.2,12c-0.1,0.1-0.1,0.2-0.1,0.2c0,0.1,0,0.2,0.1,0.2c0.1,0.1,0.1,0.1,0.2,0.1c0.1,0,0.2,0,0.2-0.1L7.2,8
	l3.4,3.4c0.1,0.1,0.2,0.1,0.2,0.1c0.1,0,0.2,0,0.2-0.1c0.1-0.1,0.1-0.1,0.1-0.2c0-0.1,0-0.2-0.1-0.2L7.5,7.3
	C7.4,7.2,7.3,7.1,7.2,7.1c-0.1,0-0.2,0-0.3,0.1L2.2,12z" fill="#253F73" />
                                                            <path class="st0" d="M9,9.3C8.9,9.3,8.9,9.4,8.9,9.5c0,0.1,0,0.2,0.1,0.2c0.1,0.1,0.1,0.1,0.2,0.1c0.1,0,0.2,0,0.2-0.1l3.1-3.1
	l3.4,3.4c0.1,0.1,0.2,0.1,0.2,0.1c0.1,0,0.2,0,0.2-0.1c0.1-0.1,0.1-0.1,0.1-0.2c0-0.1,0-0.2-0.1-0.2l-3.6-3.7
	c-0.1-0.1-0.2-0.1-0.3-0.1c-0.1,0-0.2,0-0.3,0.1L9,9.3L9,9.3z" fill="#253F73" />
                                                            <path class="st0" d="M5.1,3.1c0.4,0,0.7,0.1,1,0.3c0.3,0.2,0.5,0.5,0.7,0.8C6.9,4.6,6.9,5,6.8,5.3C6.8,5.7,6.6,6,6.3,6.2
	C6.1,6.5,5.8,6.7,5.4,6.7c-0.4,0.1-0.7,0-1.1-0.1C4,6.5,3.7,6.3,3.5,6S3.2,5.3,3.2,5c0-0.2,0-0.5,0.1-0.7C3.5,4,3.6,3.8,3.8,3.7
	c0.2-0.2,0.4-0.3,0.6-0.4C4.6,3.2,4.8,3.1,5.1,3.1z M5.8,4.2C5.7,4,5.5,3.9,5.3,3.9c-0.2,0-0.4,0-0.6,0.1C4.4,4,4.3,4.2,4.1,4.3
	C4,4.5,4,4.7,4,5C4,5.2,4,5.4,4.1,5.6C4.3,5.7,4.4,5.9,4.6,6C4.8,6.1,5.1,6.1,5.3,6c0.2,0,0.4-0.2,0.6-0.3C5.9,5.6,6,5.5,6.1,5.4
	C6.1,5.2,6.1,5.1,6.1,5c0-0.1,0-0.3-0.1-0.4C6,4.4,5.9,4.3,5.8,4.2z" fill="#253F73" />
                                                        </svg>{{ category.category_name }}</nuxt-link>
                                                    <ul class="sub-menu back-ul"
                                                        v-if="child.hasOwnProperty(category.category_name)">

                                                        <li class="sub-menu-item dropdown"
                                                            v-for="subCategory in child[category.category_name]">



                                                            <nuxt-link :to="'/category-details/'+generateSlug(CategoryInfo(subCategory.category_id).category_name)+'-'+subCategory.category_id"
                                                                class="flex items-center text-sm font-bold text-[#253F73] px-4 py-3 transition">

                                                                {{ CategoryInfo(subCategory.category_id).category_name }}
                                                            </nuxt-link>
                                                            <ul class="dropdown-sub"
                                                                v-if="subChild.hasOwnProperty(CategoryInfo(subCategory.category_id).category_name)">
                                                                <li class="-dropdown-sub-menu-item"
                                                                    v-for="subSubCategory in subChild[CategoryInfo(subCategory.category_id).category_name]">
                                                                    <nuxt-link to=""
                                                                        class="flex items-center text-sm font-bold text-[#253F73] px-4 py-3 transition">{{
                                                                            CategoryInfo(subSubCategory.category_id).category_name
                                                                        }}</nuxt-link>
                                                                </li>

                                                            </ul>
                                                        </li>

                                                    </ul>
                                                </li>



                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <NuxtLink to="/daily-deals"
                        class="daily-deals-btn py-2.5 px-6 mx-2 text-sm font-semibold text-[#2B313B] bg-white rounded-lg md:mt-0 border border-[#F5F8FF] hover:text-[#0052fe] hover:border-[#0052fe] ">
                        <span class="flex justify-center items-center"><svg width="15" height="15" viewBox="0 0 15 15"
                                class="mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.95927 1.08133C7.10895 0.620676 7.76065 0.620676 7.91033 1.08133L8.9799 4.37313C9.18071 4.99116 9.75664 5.4096 10.4065 5.4096H13.8677C14.352 5.4096 14.5534 6.02941 14.1616 6.31411L11.3614 8.34855C10.8357 8.73052 10.6157 9.40757 10.8165 10.0256L11.8861 13.3174C12.0357 13.7781 11.5085 14.1611 11.1166 13.8764L8.31648 11.842C7.79075 11.46 7.07885 11.46 6.55312 11.842L3.75295 13.8764C3.36109 14.1611 2.83385 13.7781 2.98353 13.3174L4.0531 10.0256C4.25391 9.40757 4.03392 8.73052 3.50819 8.34855L0.708024 6.31411C0.316168 6.02941 0.517555 5.4096 1.00192 5.4096H4.46312C5.11296 5.4096 5.68889 4.99116 5.8897 4.37313L6.95927 1.08133Z"
                                    stroke="#2B313B" />
                            </svg>
                           {{ headeSettings[0].star_icon_text }}</span>
                    </NuxtLink>
            </nav>
        </div>
    </div>

</header>
<!-- header end --></template>