<script setup>
import axios from 'axios';
const config = useRuntimeConfig();
const apiUrl = config.public.api;
const notificationPeriod = ["Daily", "Weekly", "Monthly"];
const email = ref("");
const responseText = ref("");
const notificationTime = ref("");
const setTimePeriod = (time) => {
    notificationTime.value = time;
}

const {data:settings} = await useAsyncData('subscribe_settings',()=>$fetch(`${apiUrl}/subscribe-settings`));

onMounted(()=>{
    refreshNuxtData('subscribe_settings');
})

console.log(settings.value);


const submitSubscribe = () => {
    const formData = {
        email: email.value,
        time: notificationTime.value
    }

    axios.post(`${apiUrl}/subscribe`, formData)
        .then((response) => {
            responseText.value = response.data

            setTimeout(() => {
                responseText.value = ""
            }, 2000)
        })
        .catch((error) => {
            console.log(error);

        })

}

</script>
<template>
    <div class="subscription-area p-10 text-center">
        <div class="inner-area-subs">
            <h2 class="text-black text-2xl font-bold mb-4">{{ settings[0].title }}
            </h2>
            <div class="form-area flex flex-col lg:flex-row items-center justify-between">
                <form action="" method="post" class="w-full lg:w-96" @submit.prevent="submitSubscribe()">
                    <div class="flex items-center w-full lg:w-auto justify-between">

                        <div class="input-area mr-4 flex w-full lg:w-96">

                            <input type="hidden" name="" value="">
                            <div class="relative single-field-wrapper">
                                <input type="email" v-model="email"
                                    class="rounded-md bg-white border border-[#A4BCE6] text-[#6C7A93] font-normal text-xs focus:ring-[#3b82f6] focus:outline-none focus:border-[#3b82f6] block flex-1 min-w-0 w-full lg:w-96 p-3"
                                    :placeholder="settings[0].input_placeholder" name="search" required>
                            </div>

                        </div>
                        <div class="filter-s">

                            <div class="">
                                <div class="no-label w-32">
                                    <div class="select" id="daily">
                                        <div class="selectBtn" data-type="firstOption"> Daily</div>
                                        <div class="selectDropdown">

                                            <div class="option" :data-value="time" data-type="firstOption"
                                                @click="setTimePeriod(time)" v-for="(time, i) in notificationPeriod">{{ time
                                                }}</div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="subs-btn w-full lg:w-fit mt-3 lg:mt-0">
                        <button type="submit"
                            class="outline-btn btn-translate-z flex w-full lg:w-fit m-auto lg:m-0 bg-[#0052FE] opacity-100 hover:opacity-90 transition text-white justify-center text-sm font-bold py-2.5 px-14 rounded-[5px] ">{{ settings[0].button_text }}</button>
                    </div>

                    <h2>{{ responseText }}</h2>
                </form>

            </div>
            <p class="text-[#6C7A93] text-xs font-normal mt-3">{{ settings[0].caption_text }}</p>
        </div>
    </div>
</template>