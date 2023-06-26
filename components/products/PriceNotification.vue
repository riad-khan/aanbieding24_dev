<template>
    <div>
        <div class="notification-form side-bar ml-0 md:ml-5 basis-full md:basis-2/5 lg:w-[392px]">
            <h5 class="text-black text-2xl font-bold mb-4 md:mb-10">Get a Price Notification</h5>
            <div class="form-area-a p-6 rounded-[5px] border border-[#F5F8FF] bg-white">
                <form action="https://bereken.webonedevs.com/internet-package" method="post" class="flex flex-col">
                    <input type="hidden" name="_token" value="">
                    <div class="mb-3">
                        <label for="" class="block mb-2 text-sm  font-normal text-black">Name</label>
                        <div class="flex">
                            <input type="text" name="name"
                                class="rounded-[5px] bg-white border border-[#A4BCE6] text-[#6C7A93] font-normal text-xs  focus:ring-none focus:outline-none focus:border-[#3b82f6] block flex-1 min-w-0 w-full p-2.5"
                                placeholder="Name">
                        </div>

                    </div>
                    <div class="mb-3">
                        <label for="" class="block mb-2 text-sm  font-normal text-black">Price lower
                            than</label>
                        <div class="flex">
                            <input type="text" name="price"
                                class="rounded-[5px] bg-white border border-[#A4BCE6] text-[#6C7A93] font-normal text-xs  focus:ring-none focus:outline-none focus:border-[#3b82f6] block flex-1 min-w-0 w-full p-2.5"
                                placeholder="$250">
                        </div>

                    </div>
                    <div class="mb-3">
                        <label for="" class="block mb-2 text-sm  font-normal text-black">Email Address</label>
                        <div class="flex">
                            <input type="email" name="email"
                                class="rounded-[5px] bg-white border border-[#A4BCE6] text-[#6C7A93] font-normal text-xs  focus:ring-none focus:outline-none focus:border-[#3b82f6] block flex-1 min-w-0 w-full p-2.5"
                                placeholder="$250">
                        </div>

                    </div>
                    <div class="mb-3">
                        <label for="" class="block mb-2 text-sm  font-normal text-black">Email Address</label>
                        <div class="flex">
                            <input type="email" name="email"
                                class="rounded-[5px] bg-white border border-[#A4BCE6] text-[#6C7A93] font-normal text-xs  focus:ring-none focus:outline-none focus:border-[#3b82f6] block flex-1 min-w-0 w-full p-2.5"
                                placeholder="Email Address">
                        </div>

                    </div>
                    <div class="mb-3">
                        <label for="" class="block mb-2 text-sm  font-normal text-black">Phone Number</label>
                        <div class="flex">
                            <input type="text" name="phone"
                                class="rounded-[5px] bg-white border border-[#A4BCE6] text-[#6C7A93] font-normal text-xs  focus:ring-none focus:outline-none focus:border-[#3b82f6] block flex-1 min-w-0 w-full p-2.5"
                                placeholder="Phone Number">
                        </div>

                    </div>
                    <button type="submit"
                        class="p-3 text-center outline-btn btn-translate-z bg-[#112954] text-white w-full text-sm  font-bold rounded-[5px]">Get
                        Notifcation</button>

                </form>
            </div>
        </div>
    </div>
</template>