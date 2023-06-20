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
                <div class="container mx-auto max-w-screen-xl"><!-- container start -->
                    <div class="flex p-12 flex-col items-center bg-[#F5F8FF] rounded-[5px] mb-7 md:mb-12">
                        <div class="content text-left flex-none sm:flex sm:justify-between sm:items-center">
                            <div class="img-box w-full md:flex md:justify-end md:w-1/2 order-none mb-6 sm:m-0 sm:order-last">
                                <img src="@/assets/img/contact-us24.svg" class="mx-auto w-auto sm:mx-0" alt="image">
                            </div>
                            <div class="text-content flex flex-col md:w-1/2 text-left md:pr-8">
                                <h1 class="sm:text-xl text-2xl leading-10 font-bold mb-4 md:mb-8 text-[#2B313B]">Contact Us</h1>
                                <p class="font-normal text-2xl text-[#6C7A93]">Need help with an order or a question about a product? Of course we are happy to help you on your way.</p>

                                <a href="#" class="mt-7 outline-btn btn-translate-z flex w-fit bg-[#0052FE] opacity-100 hover:opacity-90 transition text-white text-sm font-bold py-2.5 px-14 rounded-[5px]">To Contact Form</a>
                            </div>
                        </div>
                    </div>

                    <div class="fact-info flex items-center justify-between">
                        <div class="single-fact flex items-center">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" fill="#EDFBEF"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.7071 15.2929C27.0976 15.6834 27.0976 16.3166 26.7071 16.7071L18.7071 24.7071C18.3166 25.0976 17.6834 25.0976 17.2929 24.7071L13.2929 20.7071C12.9024 20.3166 12.9024 19.6834 13.2929 19.2929C13.6834 18.9024 14.3166 18.9024 14.7071 19.2929L18 22.5858L25.2929 15.2929C25.6834 14.9024 26.3166 14.9024 26.7071 15.2929Z" fill="#26BA65"/>
                            </svg>
                            <span class="text-[#2B313B] text-sm font-bold ml-2">Unlimited Time</span>
                        </div>
                        <div class="single-fact flex items-center">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" fill="#EDFBEF"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.7071 15.2929C27.0976 15.6834 27.0976 16.3166 26.7071 16.7071L18.7071 24.7071C18.3166 25.0976 17.6834 25.0976 17.2929 24.7071L13.2929 20.7071C12.9024 20.3166 12.9024 19.6834 13.2929 19.2929C13.6834 18.9024 14.3166 18.9024 14.7071 19.2929L18 22.5858L25.2929 15.2929C25.6834 14.9024 26.3166 14.9024 26.7071 15.2929Z" fill="#26BA65"/>
                            </svg>
                            <span class="text-[#2B313B] text-sm font-bold ml-2">UFast Respond</span>
                        </div>
                        <div class="single-fact flex items-center">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" fill="#EDFBEF"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.7071 15.2929C27.0976 15.6834 27.0976 16.3166 26.7071 16.7071L18.7071 24.7071C18.3166 25.0976 17.6834 25.0976 17.2929 24.7071L13.2929 20.7071C12.9024 20.3166 12.9024 19.6834 13.2929 19.2929C13.6834 18.9024 14.3166 18.9024 14.7071 19.2929L18 22.5858L25.2929 15.2929C25.6834 14.9024 26.3166 14.9024 26.7071 15.2929Z" fill="#26BA65"/>
                            </svg>
                            <span class="text-[#2B313B] text-sm font-bold ml-2">Online Support 24/7</span>
                        </div>
                        <div class="single-fact flex items-center">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" fill="#EDFBEF"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.7071 15.2929C27.0976 15.6834 27.0976 16.3166 26.7071 16.7071L18.7071 24.7071C18.3166 25.0976 17.6834 25.0976 17.2929 24.7071L13.2929 20.7071C12.9024 20.3166 12.9024 19.6834 13.2929 19.2929C13.6834 18.9024 14.3166 18.9024 14.7071 19.2929L18 22.5858L25.2929 15.2929C25.6834 14.9024 26.3166 14.9024 26.7071 15.2929Z" fill="#26BA65"/>
                            </svg>
                            <span class="text-[#2B313B] text-sm font-bold ml-2">Friendly Support</span>
                        </div>
                        <div class="single-fact flex items-center">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" fill="#EDFBEF"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.7071 15.2929C27.0976 15.6834 27.0976 16.3166 26.7071 16.7071L18.7071 24.7071C18.3166 25.0976 17.6834 25.0976 17.2929 24.7071L13.2929 20.7071C12.9024 20.3166 12.9024 19.6834 13.2929 19.2929C13.6834 18.9024 14.3166 18.9024 14.7071 19.2929L18 22.5858L25.2929 15.2929C25.6834 14.9024 26.3166 14.9024 26.7071 15.2929Z" fill="#26BA65"/>
                            </svg>
                            <span class="text-[#2B313B] text-sm font-bold ml-2">Problem Solver</span>
                        </div>
                    </div>
                    <div class="contact-details mb-7">
                        <div class="contact-info flex items-center justify-between">
                            <div class="contact-inner text-center justify-center w-full md:w-[320px] border border-[#F5F8FF] rounded-[5px]">
                                <div class="contact-icon">
                                    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="36" cy="36" r="36" fill="#0052FE"/>
                                        <path d="M23.1992 24.8002C23.1992 23.9165 23.9156 23.2002 24.7992 23.2002H28.2438C29.026 23.2002 29.6935 23.7657 29.822 24.5372L31.0049 31.6346C31.1204 32.3274 30.7705 33.0145 30.1423 33.3287L27.6652 34.5672C29.4513 39.0055 32.9939 42.5481 37.4322 44.3342L38.6707 41.8572C38.9849 41.2289 39.672 40.879 40.3649 40.9945L47.4623 42.1774C48.2338 42.306 48.7992 42.9735 48.7992 43.7556V47.2002C48.7992 48.0838 48.0829 48.8002 47.1992 48.8002H43.9992C32.5117 48.8002 23.1992 39.4877 23.1992 28.0002V24.8002Z" fill="white"/>
                                    </svg>
                                </div>
                                <h3 class="text-[#2B313B] text-xl font-bold mb-4">+0 123 456 789</h3>
                                <p class="font-normal text-[#6C7A93] text-sm">We are available every working day from 09:00 to17:00.</p>
                            </div>
                            <div class="contact-inner text-center justify-center w-full md:w-[320px] border border-[#F5F8FF] rounded-[5px]">
                                <div class="contact-icon">
                                    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="36" cy="36" r="36" fill="#0052FE"/>
                                        <path d="M23.2046 29.4136L35.9991 35.8109L48.7939 29.4135C48.6974 27.7329 47.304 26.3999 45.5992 26.3999H26.3992C24.6944 26.3999 23.301 27.733 23.2046 29.4136Z" fill="white"/>
                                        <path d="M48.7992 32.9885L35.9991 39.3886L23.1992 32.9886V42.3999C23.1992 44.1672 24.6319 45.5999 26.3992 45.5999H45.5992C47.3665 45.5999 48.7992 44.1672 48.7992 42.3999V32.9885Z" fill="white"/>
                                    </svg>
                                </div>
                                <h3 class="text-[#2B313B] text-xl font-bold mb-4">cs@aanbieding24.nl</h3>
                                <p class="font-normal text-[#6C7A93] text-sm">Feel free to mail us with your question.We are happy to help you!</p>
                            </div>
                            <div class="contact-inner text-center justify-center w-full md:w-[320px] border border-[#F5F8FF] rounded-[5px]">
                                <div class="contact-icon">
                                    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="36" cy="36" r="36" fill="#0052FE"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M48.7992 36.0002C48.7992 43.0694 43.0685 48.8002 35.9992 48.8002C28.93 48.8002 23.1992 43.0694 23.1992 36.0002C23.1992 28.931 28.93 23.2002 35.9992 23.2002C43.0685 23.2002 48.7992 28.931 48.7992 36.0002ZM35.9992 31.2002C35.409 31.2002 34.8914 31.5189 34.6123 32.0014C34.1698 32.7663 33.1911 33.0276 32.4262 32.5852C31.6613 32.1427 31.3999 31.1639 31.8424 30.399C32.6699 28.9685 34.2205 28.0002 35.9992 28.0002C38.6502 28.0002 40.7992 30.1492 40.7992 32.8002C40.7992 34.8901 39.4635 36.6681 37.5992 37.3271V37.6002C37.5992 38.4838 36.8829 39.2002 35.9992 39.2002C35.1156 39.2002 34.3992 38.4838 34.3992 37.6002V36.0002C34.3992 35.1165 35.1156 34.4002 35.9992 34.4002C36.8829 34.4002 37.5992 33.6839 37.5992 32.8002C37.5992 31.9165 36.8829 31.2002 35.9992 31.2002ZM35.9992 44.0002C36.8829 44.0002 37.5992 43.2838 37.5992 42.4002C37.5992 41.5165 36.8829 40.8002 35.9992 40.8002C35.1156 40.8002 34.3992 41.5165 34.3992 42.4002C34.3992 43.2838 35.1156 44.0002 35.9992 44.0002Z" fill="white"/>
                                    </svg>
                                </div>
                                <h3 class="text-[#2B313B] text-xl font-bold mb-4">FAQ’s</h3>
                                <p class="font-normal text-[#6C7A93] text-sm">View the most frequently asked questions. <a href="#" class="font-bold text-base text-[#0052FE]">View Now</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="contact-us-form mt-8">
                        <div class="form-inner-c">
                            <p class="text-[#2B313B] text-xl font-normal mb-9">If your question remains unanswered within our frequently asked questions, please feel free to contact us via the contact form.</p>

                            <form class="w-full">
                                <!-- form start -->
                                <div class="grid gap-6 mb-6 md:grid-cols-2">
                                    <div class="input-select">
                                        <span class="flex justify-between">
                                            <label for="gender" class="block mb-2 text-sm font-semibold text-[#000000]">Salutation</label>
                                        </span>
                                        <div class="flex flex-row items-center justify-between">
                                            <div class="flex basis-1/2 items-center mr-4 radio-cu">
                                                <input id="inline-radio" checked type="radio" value="" name="inline-radio-group"
                                                    class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 ">
                                                    <label for="inline-radio" onclick="selectBorder(this)" class="active-border rounded-[5px] bg-white border border-[#A4BCE6] text-[#6C7A93] font-normal text-xs block flex-1 min-w-0 w-full p-3">Lord</label>
                                            </div>
                                            <div class="flex basis-1/2 items-center radio-cu">
                                                <input id="inline-2-radio" type="radio" value="" name="inline-radio-group"
                                                    class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2">
                                                    <label for="inline-2-radio" onclick="selectBorder(this)"
                                                        class="rounded-[5px] bg-white border border-[#A4BCE6] text-[#6C7A93] font-normal text-xs block flex-1 min-w-0 w-full p-3">Mrs</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="">  
                                        <span class="flex justify-between">
                                        <label for="email" class="block mb-2  text-sm font-semibold text-[#000000]">Email Address</label>
                                        </span>
                                        <div class="flex">
                                            <input type="email" id="email"
                                                class="rounded-[5px] bg-white border border-[#A4BCE6] text-[#6C7A93] font-normal text-xs focus:ring-[#3b82f6] focus:outline-none focus:border-[#3b82f6] block flex-1 min-w-0 w-full p-3"
                                                placeholder="Email Address">
                                        </div>
                                    </div>
                                    <div><span class="flex justify-between">
                                        <label for="Name"
                                            class="block mb-2 text-sm font-semibold text-[#000000]">Name</label>
                                        </span>
                                        <div class="flex">
                                            <input type="text" id="Name"
                                                class="rounded-[5px] bg-white border border-[#A4BCE6] text-[#6C7A93] font-normal text-xs focus:ring-[#3b82f6] focus:outline-none focus:border-[#3b82f6] block flex-1 min-w-0 w-full p-3"
                                                placeholder="Name">
                                        </div>
                                    </div>
                                    <div> 
                                        <span class="flex justify-between">
                                        <label for="Company"
                                            class="block mb-2  text-sm font-semibold text-[#000000]">Company</label>
                                        </span>
                                        <div class="flex">
                                            <input type="text" id="Company"
                                                class="rounded-[5px] bg-white border border-[#A4BCE6] text-[#6C7A93] font-normal text-xs focus:ring-[#3b82f6] focus:outline-none focus:border-[#3b82f6] block flex-1 min-w-0 w-full p-3"
                                                placeholder="Company">
                                        </div>
                                    </div>
                                    <div><span class="flex justify-between">
                                        <label for="Name"
                                            class="block mb-2 text-sm font-semibold text-[#000000]">Phone Number</label>
                                        </span>
                                        <div class="flex">
                                            <input type="text" id="Name"
                                                class="rounded-[5px] bg-white border border-[#A4BCE6] text-[#6C7A93] font-normal text-xs focus:ring-[#3b82f6] focus:outline-none focus:border-[#3b82f6] block flex-1 min-w-0 w-full p-3"
                                                placeholder="Name">
                                        </div>
                                    </div>
                                    <div> 
                                        <span class="flex justify-between">
                                        <label for="Company"
                                            class="block mb-2  text-sm font-semibold text-[#000000]">Subject</label>
                                        </span>
                                        <div class="flex">
                                            <div class="no-label w-full">
                                                <div class="select" id="price">
                                                    <div class="selectBtn" data-type="firstOption"> I have a question about</div>
                                                    <div class="selectDropdown">
                                                        <div class="option" data-value="all" data-type="firstOption">question 1</div>
                                                        <div class="option" data-type="secondOption" data-value="internet-tv"> question 2 </div>
                                                        <div class="option" data-type="secondOption" data-value="internet-bellen"> question 3 </div>
                                                        <div class="option" data-type="secondOption" data-value="internet"> question 4 </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid gap-2 mb-6 grid-cols-1">                                    
                                    <span class="flex">
                                        <label for="Question"
                                            class="block mb-2 text-sm font-semibold text-[#000000]">Question</label>
                                        </span>
                                    <div class="flex">
                                        <textarea name="Question" id="Question" cols="30" rows="10" placeholder="Type your questions" class="rounded-[5px] bg-white border border-[#A4BCE6] text-[#6C7A93] font-normal text-xs focus:ring-[#3b82f6] focus:outline-none focus:border-[#3b82f6] block flex-1 min-w-0 w-full p-3"></textarea>
                                    </div>
                                </div>
                                
                                <div class="flex items-center justify-start">
                                    <a href="#" class="outline-btn btn-translate-z flex justify-center h-auto w-full md:w-[206px] bg-[#112954] text-white text-sm font-bold py-2.5 px-3 rounded-[5px] transition-all">Send Message</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
</template>