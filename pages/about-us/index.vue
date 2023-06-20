<script setup>
const config = useRuntimeConfig();
const apiUrl = config.public.api;

const { data: about } = await useAsyncData('about_us', () => $fetch(`${apiUrl}/about-us`));
const { data: faqs } = await useAsyncData('faqs', () => $fetch(`${apiUrl}/faqs`));
console.log(about.value);

const socialMeta = about.value.socialMeta[0];

useHead({
    titleTemplate: `${about.value.aboutInfo[0].meta_title}`,
    meta: [
        {
            name: 'description', content: `${about.value.aboutInfo[0].meta_description}`
        },
        {
            name: 'keywords', content: `${about.value.aboutInfo[0].keywords}`
        },

        {
            property:`${socialMeta[0].social_network == 'Facebook' ? "og:title":"twitter:title"}`,
            content:`${socialMeta[0].title}`
        },
        {
            property:`${socialMeta[0].social_network == 'Facebook' ? "og:description":"twitter:description"}`,
            content:`${socialMeta[0].description}`
        },
        {
            property:`${socialMeta[1].social_network == 'Facebook' ? "og:title":"twitter:title"}`,
            content:`${socialMeta[1].title}`
        },
        {
            property:`${socialMeta[1].social_network == 'Facebook' ? "og:description":"twitter:description"}`,
            content:`${socialMeta[1].description}`
        },
        

        
    ]
})


onMounted(() => {
    refreshNuxtData('about_us');
})

</script>

<template>
    <section class="bg-[#ffffff] w-full p-4 md:p-12">
        <div class="container mx-auto max-w-[805px]"><!-- container start -->
            <div class="page-content">
                <h1 class="text-[#2B313B] text-2xl font-bold mb-4">{{ about.aboutInfo[0].about_title }}</h1>



                <p class="text-[#6C7A93] text-base font-normal leading-7 mb-8" v-html="about.aboutInfo[0].content"></p>

                <h2 class="text-[#2B313B] text-2xl font-bold mb-4">FAQ</h2>

                <div v-for="faq in faqs.data">
                    <h3 class="text-[#2B313B] text-xl font-bold mb-4">{{ faq.attributes.title }}</h3>
                    <p class="text-[#6C7A93] text-base font-normal leading-7 mb-8" v-html="faq.attributes.content"></p>

                </div>


                <div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
                    <div class="list-s">
                        <ul class="text-[#0052FE] text-base font-normal leading-7 list-disc pl-4 mb-8">
                            <li>Bol.com</li>
                            <li>MediaMarkt</li>
                            <li>Amazon.nl</li>
                            <li>Bcc</li>
                            <li>Alternate</li>
                            <li>Blocker</li>
                            <li>Nedgame</li>
                            <li>Otto</li>
                            <li>Wehkamp Hotels</li>
                            <li>Coolblue</li>
                        </ul>
                    </div>
                    <div class="list-s">
                        <ul class="text-[#0052FE] text-base font-normal leading-7 list-disc pl-4 mb-8">
                            <li>Expert</li>
                            <li>Bettersports</li>
                            <li>Praxis</li>
                            <li>Coffee advantage</li>
                            <li>fitnessapparaat.nl</li>
                            <li>Fatdaddy</li>
                            <li>The Online Drugstore</li>
                            <li>fonq</li>
                            <li>Loan baker</li>
                            <li>SwissSense</li>
                        </ul>
                    </div>
                    <div class="list-s">
                        <ul class="text-[#0052FE] text-base font-normal leading-7 list-disc pl-4 mb-8">
                            <li>Albert Heijn</li>
                            <li>Gall & Gall</li>
                            <li>Ep</li>
                            <li>The White Outlet</li>
                            <li>Norton</li>
                            <li>Mcafee</li>
                            <li>Frank</li>
                            <li>Baby park</li>
                            <li>Tool Center</li>
                            <li>Heuts Hotels</li>
                        </ul>
                    </div>
                    <div class="list-s">
                        <ul class="text-[#0052FE] text-base font-normal leading-7 list-disc pl-4 mb-8">
                            <li>Backpacking gear</li>
                            <li>Coffee comparison</li>
                            <li>YourMacstore</li>
                            <li>AllPrebbq</li>
                            <li>Lamplight</li>
                            <li>The large toy store</li>
                            <li>Duvet Discounter</li>
                            <li>Mtools</li>
                            <li>Van Asten</li>
                            <li>WoonQ</li>
                        </ul>
                    </div>
                    <div class="list-s">
                        <ul class="text-[#0052FE] text-base font-normal leading-7 list-disc pl-4 mb-8">
                            <li>Fitwinkel.nl</li>
                            <li>Toppy</li>
                            <li>Yorcom</li>
                            <li>Megekko</li>
                            <li>Kees Smith</li>
                            <li>VidaXL</li>
                            <li>Conrad</li>
                            <li>Fitness courier</li>
                            <li>Beverage vinegar</li>
                            <li>Baby outlet</li>
                        </ul>
                    </div>
                    <div class="list-s">
                        <ul class="text-[#0052FE] text-base font-normal leading-7 list-disc pl-4 mb-8">
                            <li>Discount drugstore</li>
                            <li>Remarkt</li>
                            <li>Refurbished.nl</li>
                            <li>mResell Hotels</li>
                            <li>Refurbo Hotels</li>
                            <li>action.deals</li>
                            <li>Fonteyn</li>
                            <li>T-Mobile</li>
                            <li>JBL</li>
                            <li>WatchOUTLET</li>
                        </ul>
                    </div>
                    <div class="list-s">
                        <ul class="text-[#0052FE] text-base font-normal leading-7 list-disc pl-4 mb-8">
                            <li>Simple</li>
                            <li>Tele2</li>
                            <li>Beamer expert</li>
                            <li>Azerty Hotels</li>
                            <li>Square</li>
                            <li>Van der Garde</li>
                            <li>Budget Mobile</li>
                            <li>T-Mobile</li>
                            <li>samsung</li>
                            <li>Computer store</li>
                        </ul>
                    </div>
                    <div class="list-s">
                        <ul class="text-[#0052FE] text-base font-normal leading-7 list-disc pl-4 mb-8">
                            <li>Huus</li>
                            <li>furniture stunt</li>
                            <li>Jumbo</li>
                            <li>Bax Shop</li>
                            <li>Bargains Drugstore</li>
                            <li>Welkoop Hotels</li>
                            <li>Lamps24</li>
                            <li>Coop</li>
                            <li>simyo</li>
                            <li>Cvtotal</li>
                        </ul>
                    </div>
                    <div class="list-s">
                        <ul class="text-[#0052FE] text-base font-normal leading-7 list-disc pl-4 mb-8">
                            <li>Luggage online</li>
                            <li>Travelbags |</li>
                            <li>Kamado Express</li>
                            <li>Beterbed</li>
                            <li>Lego</li>
                            <li>Garden furniture</li>
                            <li>The Garden</li>
                            <li>V&D</li>
                            <li>Bk</li>
                            <li>Game Hero</li>
                        </ul>
                    </div>
                    <div class="list-s">
                        <ul class="text-[#0052FE] text-base font-normal leading-7 list-disc pl-4 mb-8">
                            <li>Holland & Barrett</li>
                            <li>K.K.</li>
                            <li>deverfwebshop.nl</li>
                            <li>Nespresso</li>
                            <li>Top1Toys</li>
                            <li>PLUS</li>
                            <li>Buccaneer</li>
                            <li>Plantje.nl</li>
                            <li>The Baby Stall</li>
                            <li>NordVPN</li>
                        </ul>
                    </div>
                    <div class="list-s">
                        <ul class="text-[#0052FE] text-base font-normal leading-7 list-disc pl-4 mb-8">
                            <li>Hema Hotels</li>
                            <li>Horloge.nl</li>
                            <li>Wine advantage</li>
                            <li>Wine Fair</li>
                            <li>HollandsNew</li>
                            <li>Budget plan</li>
                            <li>Welhof Hotels</li>
                            <li>GSMWEB.NL</li>
                            <li>Dyson</li>
                            <li>Rebuy</li>
                        </ul>
                    </div>
                    <div class="list-s">
                        <ul class="text-[#0052FE] text-base font-normal leading-7 list-disc pl-4 mb-8">
                            <li>CameraNU</li>
                            <li>Verf.nl</li>
                            <li>Art & Craft</li>
                            <li>Beerwulf Hotels</li>
                            <li>Garden-online</li>
                            <li>Informatique</li>
                            <li>iBood</li>
                            <li>Emma mattress</li>
                            <li>Kamera-Express</li>
                            <li>Unbound-XR</li>
                        </ul>
                    </div>
                </div>




            </div>
        </div>
    </section>
</template>
