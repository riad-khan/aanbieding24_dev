<script setup>

import axios from 'axios';

const config = useRuntimeConfig();
const apiUrl = config.public.api;
const selectedSubjects = ref('');
const salutation = ref('');
const email = ref('');
const name = ref('');
const company = ref('');
const phone = ref('');
const qustion = ref('');

const {data:subject} = await useAsyncData('fetch_subjects',()=>$fetch(`${apiUrl}/contact-form-subjects`));

onMounted(()=>{
    refreshNuxtData('fetch_subjects')
})

const chooseSubject = (sub)=>{
    selectedSubjects.value = sub;
    
}

const submitContact = ()=>{
   const formData = {
    salutation : salutation.value,
    email : email.value,
    name : name.value,
    company : company.value,
    phone : phone.value,
    subject : selectedSubjects.value,
    question : qustion.value
   };

   axios.post(`${apiUrl}/contact-us`,formData)
   .then((response)=>{
    console.log(response.data);
    
   })
   
    
}


</script>



<template>
    <div class="contact-us-form mt-8">
        <div class="form-inner-c">
            <p class="text-[#2B313B] text-xl font-normal mb-9">If your question remains unanswered within our frequently
                asked questions, please feel free to contact us via the contact form.</p>

            <form class="w-full" @submit.prevent="submitContact()">
                <!-- form start -->
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div class="input-select">
                        <span class="flex justify-between">
                            <label for="gender" class="block mb-2 text-sm font-semibold text-[#000000]">Salutation</label>
                        </span>
                        <div class="flex flex-row items-center justify-between">
                            <div class="flex basis-1/2 items-center mr-4 radio-cu">
                                <input id="inline-radio" checked type="radio" value="Lord" name="inline-radio-group"
                                    class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 " v-model="salutation">
                                <label for="inline-radio" onclick="selectBorder(this)"
                                    class="active-border rounded-[5px] bg-white border border-[#A4BCE6] text-[#6C7A93] font-normal text-xs block flex-1 min-w-0 w-full p-3">Lord</label>
                            </div>
                            <div class="flex basis-1/2 items-center radio-cu">
                                <input id="inline-2-radio" type="radio" value="Mrs" name="inline-radio-group"
                                    class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2" v-model="salutation">
                                <label for="inline-2-radio" onclick="selectBorder(this)"
                                    class="rounded-[5px] bg-white border border-[#A4BCE6] text-[#6C7A93] font-normal text-xs block flex-1 min-w-0 w-full p-3">Mrs</label>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <span class="flex justify-between">
                            <label for="email" class="block mb-2  text-sm font-semibold text-[#000000]">Email
                                Address</label>
                        </span>
                        <div class="flex">
                            <input type="email" id="email"
                                class="rounded-[5px] bg-white border border-[#A4BCE6] text-[#6C7A93] font-normal text-xs focus:ring-[#3b82f6] focus:outline-none focus:border-[#3b82f6] block flex-1 min-w-0 w-full p-3"
                                placeholder="Email Address" v-model="email">
                        </div>
                    </div>
                    <div><span class="flex justify-between">
                            <label for="Name" class="block mb-2 text-sm font-semibold text-[#000000]">Name</label>
                        </span>
                        <div class="flex">
                            <input type="text" id="Name"
                                class="rounded-[5px] bg-white border border-[#A4BCE6] text-[#6C7A93] font-normal text-xs focus:ring-[#3b82f6] focus:outline-none focus:border-[#3b82f6] block flex-1 min-w-0 w-full p-3"
                                placeholder="Name" v-model="name">
                        </div>
                    </div>
                    <div>
                        <span class="flex justify-between">
                            <label for="Company" class="block mb-2  text-sm font-semibold text-[#000000]">Company</label>
                        </span>
                        <div class="flex">
                            <input type="text" id="Company"
                                class="rounded-[5px] bg-white border border-[#A4BCE6] text-[#6C7A93] font-normal text-xs focus:ring-[#3b82f6] focus:outline-none focus:border-[#3b82f6] block flex-1 min-w-0 w-full p-3"
                                placeholder="Company" v-model="company">
                        </div>
                    </div>
                    <div><span class="flex justify-between">
                            <label for="Name" class="block mb-2 text-sm font-semibold text-[#000000]">Phone Number</label>
                        </span>
                        <div class="flex">
                            <input type="text" id="Name"
                                class="rounded-[5px] bg-white border border-[#A4BCE6] text-[#6C7A93] font-normal text-xs focus:ring-[#3b82f6] focus:outline-none focus:border-[#3b82f6] block flex-1 min-w-0 w-full p-3"
                                placeholder="Name" v-model="phone">
                        </div>
                    </div>
                    <div>
                        <span class="flex justify-between">
                            <label for="Company" class="block mb-2  text-sm font-semibold text-[#000000]">Subject</label>
                        </span>
                        <div class="flex">
                            <div class="no-label w-full">
                                <div class="select" id="price">
                                    <div class="selectBtn" data-type="firstOption"> Select a question</div>
                                    <div class="selectDropdown">
                                        <div class="option" data-value="all" data-type="firstOption" v-for="(item,i) in subject.data" @click="chooseSubject(item.attributes.subject_title)">{{ item.attributes.subject_title }}</div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid gap-2 mb-6 grid-cols-1">
                    <span class="flex">
                        <label for="Question" class="block mb-2 text-sm font-semibold text-[#000000]">Question</label>
                    </span>
                    <div class="flex">
                        <textarea name="Question" id="Question" cols="30" rows="10" placeholder="Type your questions"
                            class="rounded-[5px] bg-white border border-[#A4BCE6] text-[#6C7A93] font-normal text-xs focus:ring-[#3b82f6] focus:outline-none focus:border-[#3b82f6] block flex-1 min-w-0 w-full p-3" v-model="qustion"></textarea>
                    </div>
                </div>

                <div class="flex items-center justify-start">
                    <button type="submit"
                        class="outline-btn btn-translate-z flex justify-center h-auto w-full md:w-[206px] bg-[#112954] text-white text-sm font-bold py-2.5 px-3 rounded-[5px] transition-all">Send
                        Message</button>
                </div>
            </form>
    </div>
</div>
</template>