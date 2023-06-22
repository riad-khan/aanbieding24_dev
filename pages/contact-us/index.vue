<script setup>
const config = useRuntimeConfig();
const api = config.public.api;
const imageUrl = config.public.imageUrl;

const {data: contactSections} = await useAsyncData('contact_sections',()=>$fetch(`${api}/contact-us-sections`));

onMounted(()=>{
    refreshNuxtData('contact_sections');
});

console.log(contactSections.value);



</script>

<script>
export default {
    mounted() {


/* custom selectors News Start */
let index = 1;

const on = (listener, query, fn) => {
    document.querySelectorAll(query).forEach(item => {
        item.addEventListener(listener, el => {
            fn(el);
        })
    })
}

on('click', '.selectBtn', item => {
    item.target.classList.toggle('toggle');
    const next = item.target.nextElementSibling;
    next.classList.toggle('toggle');
    next.style.zIndex = index++;
});

document.addEventListener('mouseup', function (e) {

    const containers = document.querySelectorAll('.selectBtn');
    if (containers.length > 0) {
        const options = document.querySelectorAll('.selectDropdown');
        containers.forEach(function (container, index) {
            if (!container.contains(e.target)) {
                container.classList.remove('toggle');
                options[index].classList.remove('toggle');
            }
        });

    }
});
on('click', '.option', item => {
    item.target.parentElement.classList.remove('toggle');
    const parent = item.target.closest('.select').children[0];
    parent.setAttribute('data-type', item.target.getAttribute('data-type'));
    parent.innerText = item.target.innerText;
})
/* custom selectors News End */
},
    method: {
        selectBorder(ele){
    jQuery(ele).parent().parent().find("label.active-border").removeClass("active-border");
    jQuery(ele).addClass("active-border");
}
}
}
</script>
<template>
            <section class="bg-[#ffffff] w-full p-4 md:p-12">
                <div class="container mx-auto max-w-screen-xl">
                    <!-- container start -->

                   <contact.topSection :section_data = "contactSections.topSection"/>

                   <contact.feature />

                   <contact.middleSection :section_data = "contactSections.middleSection" />

                  <contact.form />
                </div>
            </section>
</template>