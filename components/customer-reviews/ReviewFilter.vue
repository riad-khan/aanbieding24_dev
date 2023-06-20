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
    }
}

</script>
<template>
        <div class="heading-area mt-6">
            <h2 class="flex items-center text-[#2B313B] font-bold text-[20px] mb-1">Filters</h2>
            <p class="tag-line text-[#6C7A93] text-sm font-normal">View all Loungeset Products</p>
        </div>

        <div class="filter-wrapper flex items-center justify-between mt-4 mb-2">
            <div class="dropdown-area flex items-center justify-between">
                <form action="" class="flex flex-col text-left">
                    <div class="mb-1">
                        <div class="no-label w-full sm:w-28">
                            <div class="select" id="popular">
                                <div class="selectBtn star-icon" data-type="firstOption"> 5 Star</div>
                                <div class="selectDropdown">

                                    <div class="option" data-value="all" data-type="firstOption">4 Star</div>
                                    <div class="option" data-type="secondOption" data-value="internet-tv">
                                        3 Star
                                    </div>
                                    <div class="option" data-type="secondOption" data-value="internet-bellen">
                                        2 Star
                                    </div>
                                    <div class="option" data-type="secondOption" data-value="internet">
                                        1 Star
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <form action="" class="flex flex-col mx-2 text-left">
                    <div class="mb-1">
                        <div class="no-label w-full sm:w-28">
                            <div class="select" id="price">
                                <div class="selectBtn" data-type="firstOption"> New - Old</div>
                                <div class="selectDropdown">
                                    <div class="option" data-value="all" data-type="firstOption">Old - New</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <form action="" class="flex flex-col text-left">
                    <div class="mb-1">
                        <div class="no-label w-full sm:w-28">
                            <div class="select" id="provider">
                                <div class="selectBtn" data-type="firstOption"> All Providers</div>
                                <div class="selectDropdown">
                                    <div class="option" data-value="all" data-type="firstOption">Provider 1</div>
                                    <div class="option" data-type="secondOption" data-value="internet-tv">
                                        Provider 2
                                    </div>
                                    <div class="option" data-type="secondOption" data-value="internet-bellen">
                                        Provider 3
                                    </div>
                                    <div class="option" data-type="secondOption" data-value="internet">
                                        Provider 4
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="btn-area  flex items-center">
                <button
                    class="flex items-center text-[#fff] text-xs font-normal bg-[#26BA65] transition hover:bg-[#1da859] px-3 py-2 mr-2 rounded-[5px]">
                            <svg width="12" height="12" viewBox="0 0 12 12" class="mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.025 3.17574C10.2594 3.41005 10.2594 3.78995 10.025 4.02426L5.22504 8.82426C4.99073 9.05858 4.61083 9.05858 4.37652 8.82426L1.97652 6.42426C1.7422 6.18995 1.7422 5.81005 1.97652 5.57574C2.21083 5.34142 2.59073 5.34142 2.82505 5.57574L4.80078 7.55147L9.17652 3.17574C9.41083 2.94142 9.79073 2.94142 10.025 3.17574Z" fill="white"/>
                            </svg>
                    Apply</button>

                <button
                    class="flex items-center text-[#fff] text-xs font-normal bg-[#112954] transition hover:bg-[#173d85] px-3 py-2 rounded-[5px]">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="mr-2" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.40078 1.2002C2.73215 1.2002 3.00078 1.46882 3.00078 1.8002V3.06095C3.76284 2.28313 4.82509 1.8002 6.00078 1.8002C7.83043 1.8002 9.38535 2.96979 9.96164 4.60025C10.0721 4.91268 9.90831 5.25547 9.59588 5.3659C9.28345 5.47633 8.94066 5.31257 8.83023 5.00014C8.41811 3.83414 7.30606 3.0002 6.00078 3.0002C5.01982 3.0002 4.148 3.47121 3.60039 4.2002H5.40078C5.73215 4.2002 6.00078 4.46882 6.00078 4.8002C6.00078 5.13157 5.73215 5.4002 5.40078 5.4002H2.40078C2.06941 5.4002 1.80078 5.13157 1.80078 4.8002V1.8002C1.80078 1.46882 2.06941 1.2002 2.40078 1.2002ZM2.40568 6.63449C2.71811 6.52406 3.0609 6.68782 3.17133 7.00025C3.58345 8.16625 4.6955 9.0002 6.00078 9.0002C6.98174 9.0002 7.85356 8.52918 8.40117 7.8002L6.60078 7.8002C6.26941 7.8002 6.00078 7.53157 6.00078 7.2002C6.00078 6.86882 6.26941 6.6002 6.60078 6.6002H9.60078C9.75991 6.60019 9.91252 6.66341 10.025 6.77593C10.1376 6.88845 10.2008 7.04107 10.2008 7.2002V10.2002C10.2008 10.5316 9.93215 10.8002 9.60078 10.8002C9.26941 10.8002 9.00078 10.5316 9.00078 10.2002V8.93944C8.23873 9.71726 7.17647 10.2002 6.00078 10.2002C4.17114 10.2002 2.61621 9.0306 2.03992 7.40014C1.9295 7.08771 2.09325 6.74492 2.40568 6.63449Z" fill="white"/>
                        </svg>

                        Reset</button>

            </div>
        </div>
        <div class="reviews-wrapper">
            <!-- single review start -->
            
            <div class="flex mt-2 mb-4 p-4 md:p-6 flex-col transition-all items-center border border-[#F5F8FF] hover:shadow md:flex-row w-full bg-white">
                    
                    <div class="product-img flex flex-col items-center">

                        <div class="img-box relative rounded-[5px]  bg-[#F5F8FF]">
                            <div class="product-img flex justify-center items-center h-[142px] w-[168px]">
                                <img class="object-cover w-auto h-[112px] mx-auto"
                                    src="@/assets/img/products/05.png" alt="image">
                            </div>
                            <div class="brand-logo">
                                <img src="@/assets/img/providers/amazon-brand.png" alt="icon">
                            </div>
                        </div>
                        <div class="product-rating flex items-center justify-between mt-2">
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6302 0.533004C12.0134 -0.142371 12.9866 -0.142373 13.3698 0.533002L16.5767 6.18531C16.7191 6.43637 16.9631 6.61364 17.2459 6.67153L23.6125 7.9748C24.3732 8.13052 24.674 9.05606 24.1501 9.62919L19.7654 14.4258C19.5706 14.6388 19.4774 14.9257 19.5098 15.2125L20.2377 21.6703C20.3247 22.4419 19.5373 23.0139 18.8304 22.6927L12.9136 20.0049C12.6508 19.8855 12.3492 19.8855 12.0864 20.0049L6.16963 22.6927C5.46266 23.0139 4.67535 22.4419 4.76232 21.6703L5.49024 15.2125C5.52257 14.9257 5.42938 14.6388 5.23462 14.4258L0.849938 9.62919C0.326028 9.05606 0.626752 8.13052 1.38748 7.9748L7.75413 6.67153C8.03692 6.61364 8.2809 6.43637 8.42335 6.18531L11.6302 0.533004Z" fill="#EFBC21"/>
                            </svg>
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6302 0.533004C12.0134 -0.142371 12.9866 -0.142373 13.3698 0.533002L16.5767 6.18531C16.7191 6.43637 16.9631 6.61364 17.2459 6.67153L23.6125 7.9748C24.3732 8.13052 24.674 9.05606 24.1501 9.62919L19.7654 14.4258C19.5706 14.6388 19.4774 14.9257 19.5098 15.2125L20.2377 21.6703C20.3247 22.4419 19.5373 23.0139 18.8304 22.6927L12.9136 20.0049C12.6508 19.8855 12.3492 19.8855 12.0864 20.0049L6.16963 22.6927C5.46266 23.0139 4.67535 22.4419 4.76232 21.6703L5.49024 15.2125C5.52257 14.9257 5.42938 14.6388 5.23462 14.4258L0.849938 9.62919C0.326028 9.05606 0.626752 8.13052 1.38748 7.9748L7.75413 6.67153C8.03692 6.61364 8.2809 6.43637 8.42335 6.18531L11.6302 0.533004Z" fill="#EFBC21"/>
                            </svg>
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6302 0.533004C12.0134 -0.142371 12.9866 -0.142373 13.3698 0.533002L16.5767 6.18531C16.7191 6.43637 16.9631 6.61364 17.2459 6.67153L23.6125 7.9748C24.3732 8.13052 24.674 9.05606 24.1501 9.62919L19.7654 14.4258C19.5706 14.6388 19.4774 14.9257 19.5098 15.2125L20.2377 21.6703C20.3247 22.4419 19.5373 23.0139 18.8304 22.6927L12.9136 20.0049C12.6508 19.8855 12.3492 19.8855 12.0864 20.0049L6.16963 22.6927C5.46266 23.0139 4.67535 22.4419 4.76232 21.6703L5.49024 15.2125C5.52257 14.9257 5.42938 14.6388 5.23462 14.4258L0.849938 9.62919C0.326028 9.05606 0.626752 8.13052 1.38748 7.9748L7.75413 6.67153C8.03692 6.61364 8.2809 6.43637 8.42335 6.18531L11.6302 0.533004Z" fill="#EFBC21"/>
                            </svg>
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6302 0.533004C12.0134 -0.142371 12.9866 -0.142373 13.3698 0.533002L16.5767 6.18531C16.7191 6.43637 16.9631 6.61364 17.2459 6.67153L23.6125 7.9748C24.3732 8.13052 24.674 9.05606 24.1501 9.62919L19.7654 14.4258C19.5706 14.6388 19.4774 14.9257 19.5098 15.2125L20.2377 21.6703C20.3247 22.4419 19.5373 23.0139 18.8304 22.6927L12.9136 20.0049C12.6508 19.8855 12.3492 19.8855 12.0864 20.0049L6.16963 22.6927C5.46266 23.0139 4.67535 22.4419 4.76232 21.6703L5.49024 15.2125C5.52257 14.9257 5.42938 14.6388 5.23462 14.4258L0.849938 9.62919C0.326028 9.05606 0.626752 8.13052 1.38748 7.9748L7.75413 6.67153C8.03692 6.61364 8.2809 6.43637 8.42335 6.18531L11.6302 0.533004Z" fill="#EFBC21"/>
                            </svg>
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0287 0.533004C12.4119 -0.142371 13.385 -0.142373 13.7682 0.533002L16.9751 6.18531C17.1175 6.43637 17.3615 6.61364 17.6443 6.67153L24.011 7.9748C24.7717 8.13052 25.0724 9.05606 24.5485 9.62919L20.1638 14.4258C19.9691 14.6388 19.8759 14.9257 19.9082 15.2125L20.6361 21.6703C20.7231 22.4419 19.9358 23.0139 19.2288 22.6927L13.312 20.0049C13.0492 19.8855 12.7476 19.8855 12.4848 20.0049L6.56807 22.6927C5.86109 23.0139 5.07378 22.4419 5.16076 21.6703L5.88867 15.2125C5.92101 14.9257 5.82781 14.6388 5.63305 14.4258L1.24838 9.62919C0.724465 9.05606 1.02519 8.13052 1.78592 7.9748L8.15256 6.67153C8.43536 6.61364 8.67934 6.43637 8.82178 6.18531L12.0287 0.533004Z" fill="#A4BCE6"/>
                            </svg>
                        </div>
                    </div>

                        <div class="flex flex-col justify-between py-2 md:py-0 md:px-4 leading-normal">
                            <h5 class="mb-2 text-xl font-bold tracking-tight text-[#2B313B]">Good offer at a good price and very good support</h5>
                            <p class="mb-3 font-normal text-base text-[#6C7A93]">This has come up with a very good offer. Chose to install the last station yourself. In practice, it turned out that the manufacturer's information was not sufficient to install the charging station. Laaddirect has done everything possible in terms of support to get the installation done. Excellent service, responded quickly and resolved.</p>
                            <div class="reviewer-info flex justify-between items-center mt-4">
                                <div class="left-part flex justify-between items-center">
                                    <div class="avatar rounded-full">
                                        <img src="@/assets/img/avatar/001.png" class="h-auto w-auto" alt="image">
                                    </div>
                                    <div class="flex flex-col items-start justify-start ml-2">
                                        <span class="name-avatar text-[#2B313B] text-xs font-bold">
                                            Michael Jordan
                                        </span>
                                        <span class="publish-date text-[#6C7A93] text-xs font-bold mt-1">
                                            8/29/2022
                                        </span>
                                    </div>
                                </div>
                                <div class="right-part">
                                    <button target="_blank" class="view-btn flex items-center justify-center border w-auto border-[#0052FE] py-1 px-3 text-[#0052FE] hover:text-white hover:bg-[#0052FE] transition rounded font-bold text-xs"> View Source <svg width="13" height="13" viewBox="0 0 13 13" class="mx-2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.6875 2.5625H2.5625V10.4375H10.4375V6.3125M10.4375 2.5625L6.3125 6.6875M8.5625 1.8125H11.1875V4.4375" stroke="#0052FE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
                                </div>
                            </div>
                        </div>
            </div>

            <!-- single review end -->
            <!-- single review start -->
            
            <div class="flex  mb-4 p-4 md:p-6 flex-col transition-all items-center border border-[#F5F8FF] hover:shadow md:flex-row w-full bg-white">
                    
                    <div class="product-img flex flex-col items-center">

                        <div class="img-box relative rounded-[5px]  bg-[#F5F8FF]">
                            <div class="product-img flex justify-center items-center h-[142px] w-[168px]">
                                <img class="object-cover w-auto h-[112px] mx-auto"
                                    src="@/assets/img/products/06.png" alt="image">
                            </div>
                            <div class="brand-logo">
                                <img src="@/assets/img/providers/amazon-brand.png" alt="icon">
                            </div>
                        </div>
                        <div class="product-rating flex items-center justify-between mt-2">
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6302 0.533004C12.0134 -0.142371 12.9866 -0.142373 13.3698 0.533002L16.5767 6.18531C16.7191 6.43637 16.9631 6.61364 17.2459 6.67153L23.6125 7.9748C24.3732 8.13052 24.674 9.05606 24.1501 9.62919L19.7654 14.4258C19.5706 14.6388 19.4774 14.9257 19.5098 15.2125L20.2377 21.6703C20.3247 22.4419 19.5373 23.0139 18.8304 22.6927L12.9136 20.0049C12.6508 19.8855 12.3492 19.8855 12.0864 20.0049L6.16963 22.6927C5.46266 23.0139 4.67535 22.4419 4.76232 21.6703L5.49024 15.2125C5.52257 14.9257 5.42938 14.6388 5.23462 14.4258L0.849938 9.62919C0.326028 9.05606 0.626752 8.13052 1.38748 7.9748L7.75413 6.67153C8.03692 6.61364 8.2809 6.43637 8.42335 6.18531L11.6302 0.533004Z" fill="#EFBC21"/>
                            </svg>
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6302 0.533004C12.0134 -0.142371 12.9866 -0.142373 13.3698 0.533002L16.5767 6.18531C16.7191 6.43637 16.9631 6.61364 17.2459 6.67153L23.6125 7.9748C24.3732 8.13052 24.674 9.05606 24.1501 9.62919L19.7654 14.4258C19.5706 14.6388 19.4774 14.9257 19.5098 15.2125L20.2377 21.6703C20.3247 22.4419 19.5373 23.0139 18.8304 22.6927L12.9136 20.0049C12.6508 19.8855 12.3492 19.8855 12.0864 20.0049L6.16963 22.6927C5.46266 23.0139 4.67535 22.4419 4.76232 21.6703L5.49024 15.2125C5.52257 14.9257 5.42938 14.6388 5.23462 14.4258L0.849938 9.62919C0.326028 9.05606 0.626752 8.13052 1.38748 7.9748L7.75413 6.67153C8.03692 6.61364 8.2809 6.43637 8.42335 6.18531L11.6302 0.533004Z" fill="#EFBC21"/>
                            </svg>
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6302 0.533004C12.0134 -0.142371 12.9866 -0.142373 13.3698 0.533002L16.5767 6.18531C16.7191 6.43637 16.9631 6.61364 17.2459 6.67153L23.6125 7.9748C24.3732 8.13052 24.674 9.05606 24.1501 9.62919L19.7654 14.4258C19.5706 14.6388 19.4774 14.9257 19.5098 15.2125L20.2377 21.6703C20.3247 22.4419 19.5373 23.0139 18.8304 22.6927L12.9136 20.0049C12.6508 19.8855 12.3492 19.8855 12.0864 20.0049L6.16963 22.6927C5.46266 23.0139 4.67535 22.4419 4.76232 21.6703L5.49024 15.2125C5.52257 14.9257 5.42938 14.6388 5.23462 14.4258L0.849938 9.62919C0.326028 9.05606 0.626752 8.13052 1.38748 7.9748L7.75413 6.67153C8.03692 6.61364 8.2809 6.43637 8.42335 6.18531L11.6302 0.533004Z" fill="#EFBC21"/>
                            </svg>
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6302 0.533004C12.0134 -0.142371 12.9866 -0.142373 13.3698 0.533002L16.5767 6.18531C16.7191 6.43637 16.9631 6.61364 17.2459 6.67153L23.6125 7.9748C24.3732 8.13052 24.674 9.05606 24.1501 9.62919L19.7654 14.4258C19.5706 14.6388 19.4774 14.9257 19.5098 15.2125L20.2377 21.6703C20.3247 22.4419 19.5373 23.0139 18.8304 22.6927L12.9136 20.0049C12.6508 19.8855 12.3492 19.8855 12.0864 20.0049L6.16963 22.6927C5.46266 23.0139 4.67535 22.4419 4.76232 21.6703L5.49024 15.2125C5.52257 14.9257 5.42938 14.6388 5.23462 14.4258L0.849938 9.62919C0.326028 9.05606 0.626752 8.13052 1.38748 7.9748L7.75413 6.67153C8.03692 6.61364 8.2809 6.43637 8.42335 6.18531L11.6302 0.533004Z" fill="#EFBC21"/>
                            </svg>
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0287 0.533004C12.4119 -0.142371 13.385 -0.142373 13.7682 0.533002L16.9751 6.18531C17.1175 6.43637 17.3615 6.61364 17.6443 6.67153L24.011 7.9748C24.7717 8.13052 25.0724 9.05606 24.5485 9.62919L20.1638 14.4258C19.9691 14.6388 19.8759 14.9257 19.9082 15.2125L20.6361 21.6703C20.7231 22.4419 19.9358 23.0139 19.2288 22.6927L13.312 20.0049C13.0492 19.8855 12.7476 19.8855 12.4848 20.0049L6.56807 22.6927C5.86109 23.0139 5.07378 22.4419 5.16076 21.6703L5.88867 15.2125C5.92101 14.9257 5.82781 14.6388 5.63305 14.4258L1.24838 9.62919C0.724465 9.05606 1.02519 8.13052 1.78592 7.9748L8.15256 6.67153C8.43536 6.61364 8.67934 6.43637 8.82178 6.18531L12.0287 0.533004Z" fill="#A4BCE6"/>
                            </svg>
                        </div>
                    </div>

                        <div class="flex flex-col justify-between py-2 md:py-0 md:px-4 leading-normal">
                            <h5 class="mb-2 text-xl font-bold tracking-tight text-[#2B313B]">Good offer at a good price and very good support</h5>
                            <p class="mb-3 font-normal text-base text-[#6C7A93]">This has come up with a very good offer. Chose to install the last station yourself. In practice, it turned out that the manufacturer's information was not sufficient to install the charging station. Laaddirect has done everything possible in terms of support to get the installation done. Excellent service, responded quickly and resolved.</p>
                            <div class="reviewer-info flex justify-between items-center mt-4">
                                <div class="left-part flex justify-between items-center">
                                    <div class="avatar rounded-full">
                                        <img src="@/assets/img/avatar/001.png" class="h-auto w-auto" alt="image">
                                    </div>
                                    <div class="flex flex-col items-start justify-start ml-2">
                                        <span class="name-avatar text-[#2B313B] text-xs font-bold">
                                            Michael Jordan
                                        </span>
                                        <span class="publish-date text-[#6C7A93] text-xs font-bold mt-1">
                                            8/29/2022
                                        </span>
                                    </div>
                                </div>
                                <div class="right-part">
                                    <button target="_blank" class="view-btn flex items-center justify-center border w-auto border-[#0052FE] py-1 px-3 text-[#0052FE] hover:text-white hover:bg-[#0052FE] transition rounded font-bold text-xs"> View Source <svg width="13" height="13" viewBox="0 0 13 13" class="mx-2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.6875 2.5625H2.5625V10.4375H10.4375V6.3125M10.4375 2.5625L6.3125 6.6875M8.5625 1.8125H11.1875V4.4375" stroke="#0052FE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
                                </div>
                            </div>
                        </div>
            </div>

            <!-- single review end -->
            <!-- single review start -->
            
            <div class="flex  mb-4 p-4 md:p-6 flex-col transition-all items-center border border-[#F5F8FF] hover:shadow md:flex-row w-full bg-white">
                    
                    <div class="product-img flex flex-col items-center">

                        <div class="img-box relative rounded-[5px]  bg-[#F5F8FF]">
                            <div class="product-img flex justify-center items-center h-[142px] w-[168px]">
                                <img class="object-cover w-auto h-[112px] mx-auto"
                                    src="@/assets/img/products/07.png" alt="image">
                            </div>
                            <div class="brand-logo">
                                <img src="@/assets/img/providers/amazon-brand.png" alt="icon">
                            </div>
                        </div>
                        <div class="product-rating flex items-center justify-between mt-2">
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6302 0.533004C12.0134 -0.142371 12.9866 -0.142373 13.3698 0.533002L16.5767 6.18531C16.7191 6.43637 16.9631 6.61364 17.2459 6.67153L23.6125 7.9748C24.3732 8.13052 24.674 9.05606 24.1501 9.62919L19.7654 14.4258C19.5706 14.6388 19.4774 14.9257 19.5098 15.2125L20.2377 21.6703C20.3247 22.4419 19.5373 23.0139 18.8304 22.6927L12.9136 20.0049C12.6508 19.8855 12.3492 19.8855 12.0864 20.0049L6.16963 22.6927C5.46266 23.0139 4.67535 22.4419 4.76232 21.6703L5.49024 15.2125C5.52257 14.9257 5.42938 14.6388 5.23462 14.4258L0.849938 9.62919C0.326028 9.05606 0.626752 8.13052 1.38748 7.9748L7.75413 6.67153C8.03692 6.61364 8.2809 6.43637 8.42335 6.18531L11.6302 0.533004Z" fill="#EFBC21"/>
                            </svg>
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6302 0.533004C12.0134 -0.142371 12.9866 -0.142373 13.3698 0.533002L16.5767 6.18531C16.7191 6.43637 16.9631 6.61364 17.2459 6.67153L23.6125 7.9748C24.3732 8.13052 24.674 9.05606 24.1501 9.62919L19.7654 14.4258C19.5706 14.6388 19.4774 14.9257 19.5098 15.2125L20.2377 21.6703C20.3247 22.4419 19.5373 23.0139 18.8304 22.6927L12.9136 20.0049C12.6508 19.8855 12.3492 19.8855 12.0864 20.0049L6.16963 22.6927C5.46266 23.0139 4.67535 22.4419 4.76232 21.6703L5.49024 15.2125C5.52257 14.9257 5.42938 14.6388 5.23462 14.4258L0.849938 9.62919C0.326028 9.05606 0.626752 8.13052 1.38748 7.9748L7.75413 6.67153C8.03692 6.61364 8.2809 6.43637 8.42335 6.18531L11.6302 0.533004Z" fill="#EFBC21"/>
                            </svg>
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6302 0.533004C12.0134 -0.142371 12.9866 -0.142373 13.3698 0.533002L16.5767 6.18531C16.7191 6.43637 16.9631 6.61364 17.2459 6.67153L23.6125 7.9748C24.3732 8.13052 24.674 9.05606 24.1501 9.62919L19.7654 14.4258C19.5706 14.6388 19.4774 14.9257 19.5098 15.2125L20.2377 21.6703C20.3247 22.4419 19.5373 23.0139 18.8304 22.6927L12.9136 20.0049C12.6508 19.8855 12.3492 19.8855 12.0864 20.0049L6.16963 22.6927C5.46266 23.0139 4.67535 22.4419 4.76232 21.6703L5.49024 15.2125C5.52257 14.9257 5.42938 14.6388 5.23462 14.4258L0.849938 9.62919C0.326028 9.05606 0.626752 8.13052 1.38748 7.9748L7.75413 6.67153C8.03692 6.61364 8.2809 6.43637 8.42335 6.18531L11.6302 0.533004Z" fill="#EFBC21"/>
                            </svg>
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6302 0.533004C12.0134 -0.142371 12.9866 -0.142373 13.3698 0.533002L16.5767 6.18531C16.7191 6.43637 16.9631 6.61364 17.2459 6.67153L23.6125 7.9748C24.3732 8.13052 24.674 9.05606 24.1501 9.62919L19.7654 14.4258C19.5706 14.6388 19.4774 14.9257 19.5098 15.2125L20.2377 21.6703C20.3247 22.4419 19.5373 23.0139 18.8304 22.6927L12.9136 20.0049C12.6508 19.8855 12.3492 19.8855 12.0864 20.0049L6.16963 22.6927C5.46266 23.0139 4.67535 22.4419 4.76232 21.6703L5.49024 15.2125C5.52257 14.9257 5.42938 14.6388 5.23462 14.4258L0.849938 9.62919C0.326028 9.05606 0.626752 8.13052 1.38748 7.9748L7.75413 6.67153C8.03692 6.61364 8.2809 6.43637 8.42335 6.18531L11.6302 0.533004Z" fill="#EFBC21"/>
                            </svg>
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0287 0.533004C12.4119 -0.142371 13.385 -0.142373 13.7682 0.533002L16.9751 6.18531C17.1175 6.43637 17.3615 6.61364 17.6443 6.67153L24.011 7.9748C24.7717 8.13052 25.0724 9.05606 24.5485 9.62919L20.1638 14.4258C19.9691 14.6388 19.8759 14.9257 19.9082 15.2125L20.6361 21.6703C20.7231 22.4419 19.9358 23.0139 19.2288 22.6927L13.312 20.0049C13.0492 19.8855 12.7476 19.8855 12.4848 20.0049L6.56807 22.6927C5.86109 23.0139 5.07378 22.4419 5.16076 21.6703L5.88867 15.2125C5.92101 14.9257 5.82781 14.6388 5.63305 14.4258L1.24838 9.62919C0.724465 9.05606 1.02519 8.13052 1.78592 7.9748L8.15256 6.67153C8.43536 6.61364 8.67934 6.43637 8.82178 6.18531L12.0287 0.533004Z" fill="#A4BCE6"/>
                            </svg>
                        </div>
                    </div>

                        <div class="flex flex-col justify-between py-2 md:py-0 md:px-4 leading-normal">
                            <h5 class="mb-2 text-xl font-bold tracking-tight text-[#2B313B]">Good offer at a good price and very good support</h5>
                            <p class="mb-3 font-normal text-base text-[#6C7A93]">This has come up with a very good offer. Chose to install the last station yourself. In practice, it turned out that the manufacturer's information was not sufficient to install the charging station. Laaddirect has done everything possible in terms of support to get the installation done. Excellent service, responded quickly and resolved.</p>
                            <div class="reviewer-info flex justify-between items-center mt-4">
                                <div class="left-part flex justify-between items-center">
                                    <div class="avatar rounded-full">
                                        <img src="@/assets/img/avatar/001.png" class="h-auto w-auto" alt="image">
                                    </div>
                                    <div class="flex flex-col items-start justify-start ml-2">
                                        <span class="name-avatar text-[#2B313B] text-xs font-bold">
                                            Michael Jordan
                                        </span>
                                        <span class="publish-date text-[#6C7A93] text-xs font-bold mt-1">
                                            8/29/2022
                                        </span>
                                    </div>
                                </div>
                                <div class="right-part">
                                    <button target="_blank" class="view-btn flex items-center justify-center border w-auto border-[#0052FE] py-1 px-3 text-[#0052FE] hover:text-white hover:bg-[#0052FE] transition rounded font-bold text-xs"> View Source <svg width="13" height="13" viewBox="0 0 13 13" class="mx-2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.6875 2.5625H2.5625V10.4375H10.4375V6.3125M10.4375 2.5625L6.3125 6.6875M8.5625 1.8125H11.1875V4.4375" stroke="#0052FE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
                                </div>
                            </div>
                        </div>
            </div>

            <!-- single review end -->
            <!-- single review start -->
            
            <div class="flex mb-4 p-4 md:p-6 flex-col transition-all items-center border border-[#F5F8FF] hover:shadow md:flex-row w-full bg-white">
                    
                    <div class="product-img flex flex-col items-center">

                        <div class="img-box relative rounded-[5px]  bg-[#F5F8FF]">
                            <div class="product-img flex justify-center items-center h-[142px] w-[168px]">
                                <img class="object-cover w-auto h-[112px] mx-auto"
                                    src="@/assets/img/products/08.png" alt="image">
                            </div>
                            <div class="brand-logo">
                                <img src="@/assets/img/providers/amazon-brand.png" alt="icon">
                            </div>
                        </div>
                        <div class="product-rating flex items-center justify-between mt-2">
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6302 0.533004C12.0134 -0.142371 12.9866 -0.142373 13.3698 0.533002L16.5767 6.18531C16.7191 6.43637 16.9631 6.61364 17.2459 6.67153L23.6125 7.9748C24.3732 8.13052 24.674 9.05606 24.1501 9.62919L19.7654 14.4258C19.5706 14.6388 19.4774 14.9257 19.5098 15.2125L20.2377 21.6703C20.3247 22.4419 19.5373 23.0139 18.8304 22.6927L12.9136 20.0049C12.6508 19.8855 12.3492 19.8855 12.0864 20.0049L6.16963 22.6927C5.46266 23.0139 4.67535 22.4419 4.76232 21.6703L5.49024 15.2125C5.52257 14.9257 5.42938 14.6388 5.23462 14.4258L0.849938 9.62919C0.326028 9.05606 0.626752 8.13052 1.38748 7.9748L7.75413 6.67153C8.03692 6.61364 8.2809 6.43637 8.42335 6.18531L11.6302 0.533004Z" fill="#EFBC21"/>
                            </svg>
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6302 0.533004C12.0134 -0.142371 12.9866 -0.142373 13.3698 0.533002L16.5767 6.18531C16.7191 6.43637 16.9631 6.61364 17.2459 6.67153L23.6125 7.9748C24.3732 8.13052 24.674 9.05606 24.1501 9.62919L19.7654 14.4258C19.5706 14.6388 19.4774 14.9257 19.5098 15.2125L20.2377 21.6703C20.3247 22.4419 19.5373 23.0139 18.8304 22.6927L12.9136 20.0049C12.6508 19.8855 12.3492 19.8855 12.0864 20.0049L6.16963 22.6927C5.46266 23.0139 4.67535 22.4419 4.76232 21.6703L5.49024 15.2125C5.52257 14.9257 5.42938 14.6388 5.23462 14.4258L0.849938 9.62919C0.326028 9.05606 0.626752 8.13052 1.38748 7.9748L7.75413 6.67153C8.03692 6.61364 8.2809 6.43637 8.42335 6.18531L11.6302 0.533004Z" fill="#EFBC21"/>
                            </svg>
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6302 0.533004C12.0134 -0.142371 12.9866 -0.142373 13.3698 0.533002L16.5767 6.18531C16.7191 6.43637 16.9631 6.61364 17.2459 6.67153L23.6125 7.9748C24.3732 8.13052 24.674 9.05606 24.1501 9.62919L19.7654 14.4258C19.5706 14.6388 19.4774 14.9257 19.5098 15.2125L20.2377 21.6703C20.3247 22.4419 19.5373 23.0139 18.8304 22.6927L12.9136 20.0049C12.6508 19.8855 12.3492 19.8855 12.0864 20.0049L6.16963 22.6927C5.46266 23.0139 4.67535 22.4419 4.76232 21.6703L5.49024 15.2125C5.52257 14.9257 5.42938 14.6388 5.23462 14.4258L0.849938 9.62919C0.326028 9.05606 0.626752 8.13052 1.38748 7.9748L7.75413 6.67153C8.03692 6.61364 8.2809 6.43637 8.42335 6.18531L11.6302 0.533004Z" fill="#EFBC21"/>
                            </svg>
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6302 0.533004C12.0134 -0.142371 12.9866 -0.142373 13.3698 0.533002L16.5767 6.18531C16.7191 6.43637 16.9631 6.61364 17.2459 6.67153L23.6125 7.9748C24.3732 8.13052 24.674 9.05606 24.1501 9.62919L19.7654 14.4258C19.5706 14.6388 19.4774 14.9257 19.5098 15.2125L20.2377 21.6703C20.3247 22.4419 19.5373 23.0139 18.8304 22.6927L12.9136 20.0049C12.6508 19.8855 12.3492 19.8855 12.0864 20.0049L6.16963 22.6927C5.46266 23.0139 4.67535 22.4419 4.76232 21.6703L5.49024 15.2125C5.52257 14.9257 5.42938 14.6388 5.23462 14.4258L0.849938 9.62919C0.326028 9.05606 0.626752 8.13052 1.38748 7.9748L7.75413 6.67153C8.03692 6.61364 8.2809 6.43637 8.42335 6.18531L11.6302 0.533004Z" fill="#EFBC21"/>
                            </svg>
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0287 0.533004C12.4119 -0.142371 13.385 -0.142373 13.7682 0.533002L16.9751 6.18531C17.1175 6.43637 17.3615 6.61364 17.6443 6.67153L24.011 7.9748C24.7717 8.13052 25.0724 9.05606 24.5485 9.62919L20.1638 14.4258C19.9691 14.6388 19.8759 14.9257 19.9082 15.2125L20.6361 21.6703C20.7231 22.4419 19.9358 23.0139 19.2288 22.6927L13.312 20.0049C13.0492 19.8855 12.7476 19.8855 12.4848 20.0049L6.56807 22.6927C5.86109 23.0139 5.07378 22.4419 5.16076 21.6703L5.88867 15.2125C5.92101 14.9257 5.82781 14.6388 5.63305 14.4258L1.24838 9.62919C0.724465 9.05606 1.02519 8.13052 1.78592 7.9748L8.15256 6.67153C8.43536 6.61364 8.67934 6.43637 8.82178 6.18531L12.0287 0.533004Z" fill="#A4BCE6"/>
                            </svg>
                        </div>
                    </div>

                        <div class="flex flex-col justify-between py-2 md:py-0 md:px-4 leading-normal">
                            <h5 class="mb-2 text-xl font-bold tracking-tight text-[#2B313B]">Good offer at a good price and very good support</h5>
                            <p class="mb-3 font-normal text-base text-[#6C7A93]">This has come up with a very good offer. Chose to install the last station yourself. In practice, it turned out that the manufacturer's information was not sufficient to install the charging station. Laaddirect has done everything possible in terms of support to get the installation done. Excellent service, responded quickly and resolved.</p>
                            <div class="reviewer-info flex justify-between items-center mt-4">
                                <div class="left-part flex justify-between items-center">
                                    <div class="avatar rounded-full">
                                        <img src="@/assets/img/avatar/001.png" class="h-auto w-auto" alt="image">
                                    </div>
                                    <div class="flex flex-col items-start justify-start ml-2">
                                        <span class="name-avatar text-[#2B313B] text-xs font-bold">
                                            Michael Jordan
                                        </span>
                                        <span class="publish-date text-[#6C7A93] text-xs font-bold mt-1">
                                            8/29/2022
                                        </span>
                                    </div>
                                </div>
                                <div class="right-part">
                                    <button target="_blank" class="view-btn flex items-center justify-center border w-auto border-[#0052FE] py-1 px-3 text-[#0052FE] hover:text-white hover:bg-[#0052FE] transition rounded font-bold text-xs"> View Source <svg width="13" height="13" viewBox="0 0 13 13" class="mx-2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.6875 2.5625H2.5625V10.4375H10.4375V6.3125M10.4375 2.5625L6.3125 6.6875M8.5625 1.8125H11.1875V4.4375" stroke="#0052FE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
                                </div>
                            </div>
                        </div>
            </div>

            <!-- single review end -->
            <div class="load-more-btn text-center">
                <button class="view-icon py-2.5 px-2.5 mt-8 border transition-all border-[#112954]  rounded-[5px] w-32 text-white bg-[#112954] hover:bg-transparent hover:text-[#112954]">Show More</button>
            </div>
        </div>
</template>