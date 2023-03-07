<script>
    //Imports
    import { time, startingPoint, destination } from '../stores.js';
    import { onMount, onDestroy } from 'svelte';
    import { slide, fly, fade } from 'svelte/transition';
    import { cubicIn, cubicOut } from 'svelte/easing';
    import Scrolly from "./animation/Scrolly/+page.svelte";
    import Scatterplot from "./animation/scatterplot/+page.svelte";
    import { Canvas } from '@threlte/core'
    import { Splide, SplideSlide } from '@splidejs/svelte-splide';
    import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
    import { clickOutside } from './actions/clickOutside/clicked_outside'

    //Components
    import Scene from './threlte/+page.svelte'
    import FromBar from './navigation/expandnav/from/+page.svelte'
    import ToBar from './navigation/expandnav/to/+page.svelte'
    import PickUpTime from './navigation/expandnav/pickUpTime/+page.svelte'
    import MobileNavBar from './navigation/mobileNavBar/+page.svelte'

    //Variables
    let innerWidth;

    const formatter = new Intl.DateTimeFormat('en', {
        hour12: false,
        hour: 'numeric',
        minute: '2-digit',
    });

    //Component Variables
    let expandNavBarMobile = false;
    let expandNavBar = false;
    let fromBar = false;
    let toBar = false;
    let pickUpTime = false;
    let expandProfileTab = false;

    //Scrolling Text Variables
    let ride = ['YOUR RIDE', 'あなたの乗車', 'DIN TUR', 'आपकी सवारी'];
    let simplified = ['SIMPLIFIED', '簡略化', 'FORENKLET', 'सरलीकृत'];
    let index = 0;
    let roller;

    let scrollY;

    //Scroller onMount and onDestroy
    onMount(() => {
        roller = setInterval(() => {
            if (index === ride.length - 1 && index === simplified.length - 1) index = 0;
            else index++;
        }, 4000);
    });

    onDestroy(() => {
        clearInterval(roller);
    });


    //Scrolly Functions
    let value;
    const steps = [
        "<p>Create an account on the MobiGo web application: Sign up for an account on the MobiGo web application by providing your personal and payment information. This will allow you to book a MobiCrew ride and manage your account details.</p>",
        "<p>Enter your ride details: Select the type of ride you need and enter your pickup and drop-off locations, along with any special instructions or requests. This will help MobiGo match you with the best MobiCrew driver for your needs.</p>",
        "<p>Choose a MobiCrew driver: Review the available MobiCrew drivers and choose the one that best fits your preferences, such as driver rating, vehicle type, or estimated arrival time. You can also track your driver's location and contact them through the app.</p>",
        "<p>Confirm and pay for your ride: Once you've selected your MobiCrew driver, review the ride details and confirm your booking. You'll then be prompted to enter your payment information and authorize the transaction. You can also apply any promotional codes or discounts to your ride.</p>",
        "<p>Enjoy your ride: Once your ride is confirmed, your MobiCrew driver will arrive at your designated pickup location and take you to your destination. Sit back, relax, and enjoy the ride knowing that you're in good hands with a reliable and professional MobiCrew driver.</p>",
    ];
</script>

<svelte:window bind:innerWidth/>

{#if expandNavBarMobile}
    <MobileNavBar bind:expandNavBarMobile />
{:else}
    <div class="min-w-full lg:px-16 md:py-12">
        <nav class="border-b-8 border-Shade01 lg:border-x-10 lg:border-Neutral8 lg:border-b-8">
            {#if innerWidth < 768}
                <div class="p-7 grid grid-cols-12 items-center">
                    <button class="border-4 border-Shade01 shadowBack rounded-tl-md col-span-12 items-start text-start py-4 hover:bg-Neutral1 hover:text-Neutral6 active:bg-Neutral1" on:click={() => expandNavBarMobile = !expandNavBarMobile}>
                        <div class="flex justify-between px-5 items-center">
                            <h2 class="text-xl font-semibold text-Neutral5">Get MobiGo</h2>
                            <button class="lg:-mr-4 w-10 h-10 bg-Primary1 rounded-full flex justify-center items-center text-center shadowBackSmall hover:bg-PrimaryHover" on:click={() => expandNavBarMobile = !expandNavBarMobile}>
                                <svg width="23" height="23" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" fill="white"/>
                                </svg>
                            </button>
                        </div>
                    </button>
                </div>
                <div class="grid grid-cols-12 fixed origin-bottom bottom-0 h-20 border-t-3 border-Neutral8 z-20 w-full bg-Base">
                    <div class="col-span-4 flex justify-end items-center">
                        <div class="block text-center">
                            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.8104 7.18958C25.1125 4.37499 21.3792 2.85833 17.5 2.91666C13.6208 2.85833 9.90208 4.37499 7.20416 7.18958C4.37499 9.88749 2.85833 13.6208 2.91666 17.5C2.85833 21.3792 4.37499 25.0979 7.18958 27.7958C9.88749 30.625 13.6208 32.1417 17.5 32.0833C21.3792 32.1417 25.0979 30.625 27.7958 27.8104C30.625 25.1125 32.1417 21.3792 32.0833 17.5C32.1417 13.6208 30.625 9.88749 27.8104 7.18958ZM24.7917 17.5V26.25H19.6875V18.9583H15.3125V26.25H10.2083V17.5H7.29166L17.5 7.29166L28.4375 17.5H24.7917Z" fill="#4C4B49"/>
                            </svg>
                            Home
                        </div>
                    </div>
                    <div class="col-span-4 flex justify-center items-center">
                        <div class="block text-center">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="32" height="32" rx="16" fill="#4C4B49"/>
                                <path d="M7.83333 13.5L9.11111 8.5H21.8889L23.1667 13.5H7.83333ZM24.3422 7.25C24.0739 6.5 23.3456 6 22.5278 6H8.47222C7.65444 6 6.92611 6.5 6.65778 7.25L4 14.75V24.75C4 25.0815 4.13462 25.3995 4.37425 25.6339C4.61388 25.8683 4.93889 26 5.27778 26H6.55556C6.89444 26 7.21945 25.8683 7.45908 25.6339C7.69871 25.3995 7.83333 25.0815 7.83333 24.75V22.25H23.1667V24.75C23.1667 25.0815 23.3013 25.3995 23.5409 25.6339C23.7805 25.8683 24.1056 26 24.4444 26H25.7222C26.0611 26 26.3861 25.8683 26.6257 25.6339C26.8654 25.3995 27 25.0815 27 24.75V14.75L24.3422 7.25ZM9.11111 19.75H6.55556V17.25H9.11111V19.75ZM24.4444 19.75H21.8889V17.25H24.4444V19.75ZM18.0556 19.75H12.9444V17.25H18.0556V19.75Z" fill="white"/>
                            </svg>
                            Trips
                        </div>
                    </div>
                    <div class="col-span-4 flex justify-start items-center block">
                        <div class="block text-center">
                            <button class=" flex justify-center rounded-tl-md">
                                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.5 28.0003C13.8542 28.0003 10.6313 26.1337 8.75 23.3337C8.79375 20.417 14.5833 18.8128 17.5 18.8128C20.4167 18.8128 26.2063 20.417 26.25 23.3337C24.3688 26.1337 21.1458 28.0003 17.5 28.0003ZM17.5 7.29199C18.6603 7.29199 19.7731 7.75293 20.5936 8.5734C21.4141 9.39387 21.875 10.5067 21.875 11.667C21.875 12.8273 21.4141 13.9401 20.5936 14.7606C19.7731 15.5811 18.6603 16.042 17.5 16.042C16.3397 16.042 15.2269 15.5811 14.4064 14.7606C13.5859 13.9401 13.125 12.8273 13.125 11.667C13.125 10.5067 13.5859 9.39387 14.4064 8.5734C15.2269 7.75293 16.3397 7.29199 17.5 7.29199V7.29199ZM17.5 2.91699C15.5849 2.91699 13.6885 3.2942 11.9192 4.02708C10.1499 4.75996 8.54222 5.83416 7.18803 7.18835C4.45313 9.92326 2.91667 13.6326 2.91667 17.5003C2.91667 21.3681 4.45313 25.0774 7.18803 27.8123C8.54222 29.1665 10.1499 30.2407 11.9192 30.9736C13.6885 31.7064 15.5849 32.0837 17.5 32.0837C21.3677 32.0837 25.0771 30.5472 27.812 27.8123C30.5469 25.0774 32.0833 21.3681 32.0833 17.5003C32.0833 9.43574 25.5208 2.91699 17.5 2.91699Z" fill="#4C4B49"/>
                                </svg>
                            </button>
                            Log in
                        </div>
                    </div>
                </div>
            {:else}
                <div class="invisible md:visible px-2 pb-7 lg:p-7 grid grid-cols-12 items-center">
                    <div class="xl:pl-8 inline-flex items-center col-span-4">
                        <button class="ring-Primary1 rounded-tl-md">
                            <picture><source srcset="/MobiLogo.webp" media="(min-width: 600px)"> <img src="/MobiLogo-M.webp" style="width: 80px" alt="MobiGo Logo" loading=“lazy” decoding=“async” class="shadowBack rounded-tl-md"></picture>
                        </button>
                        <span class="md:invisible xl:visible xl:text-2xl 2xl:text-3xl font-semibold ml-5">Mobi<span class="text-Primary1">Go</span></span>
                    </div>
                    <div class="flex justify-center col-span-4">
                        <div class="relative flex justify-between items-center">
                            <button on:click={() => expandNavBar = !expandNavBar} class="shadowBack md:px-12 md:py-3 xl:px-14 xl:py-3 2xl:px-20 2xl:py-4 placeholder-Shade01 text-Shade01 font-medium md:text-base lg:text-lg xl:text-2xl 2xl:text-3xl border-solid rounded-tl-md border-4 border-Shade01 hover:-translate-y-1 hover:scale-110 ease-in-out delay-75 duration-300">Find MobiCrew</button>
                        </div>
                    </div>
                    <div class="col-span-4 grid grid-cols-3 items-center">
                        <div class="">
                            <a href="#" class="md:invisible xl:visible xl:text-base 2xl:text-xl font-medium">Become a Mobi<a href="#" class="text-Primary1 font-semibold">Crew</a></a>
                        </div>
                        <div class="inline-flex items-center justify-around">
                            <div class="md:invisible xl:visible">
                                <svg width="2" height="25" viewBox="0 0 2 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 4.37114e-08L0.999999 25" stroke="#979793" stroke-width="2"/>
                                </svg>
                            </div>
                            <div>
                                <a href="#" class="md:invisible xl:visible xl:text-base 2xl:text-xl font-medium">Trips</a>
                            </div>
                            <div class="md:invisible xl:visible">
                                <svg width="2" height="25" viewBox="0 0 2 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 4.37114e-08L0.999999 25" stroke="#979793" stroke-width="2"/>
                                </svg>
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <button class="xl:w-28 xl:h-18 2xl:w-32 2xl:h-26 shadow border-Shade01 rounded-tl-md border-4 flex justify-center shadowBack rounded-tl-md" on:click={() => expandProfileTab = !expandProfileTab}>
                                <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M26 41.5997C20.5833 41.5997 15.795 38.8263 13 34.6663C13.065 30.333 21.6667 27.9497 26 27.9497C30.3333 27.9497 38.935 30.333 39 34.6663C36.205 38.8263 31.4167 41.5997 26 41.5997ZM26 10.833C27.7239 10.833 29.3772 11.5178 30.5962 12.7368C31.8152 13.9558 32.5 15.6091 32.5 17.333C32.5 19.0569 31.8152 20.7102 30.5962 21.9292C29.3772 23.1482 27.7239 23.833 26 23.833C24.2761 23.833 22.6228 23.1482 21.4038 21.9292C20.1848 20.7102 19.5 19.0569 19.5 17.333C19.5 15.6091 20.1848 13.9558 21.4038 12.7368C22.6228 11.5178 24.2761 10.833 26 10.833V10.833ZM26 4.33301C23.1547 4.33301 20.3372 4.89343 17.7085 5.98228C15.0798 7.07114 12.6913 8.66709 10.6793 10.679C6.61606 14.7423 4.33333 20.2533 4.33333 25.9997C4.33333 31.746 6.61606 37.257 10.6793 41.3203C12.6913 43.3323 15.0798 44.9282 17.7085 46.0171C20.3372 47.1059 23.1547 47.6663 26 47.6663C31.7464 47.6663 37.2574 45.3836 41.3206 41.3203C45.3839 37.257 47.6667 31.746 47.6667 25.9997C47.6667 14.018 37.9167 4.33301 26 4.33301Z" fill="#4C4B49"/></svg>
                            </button>
                        </div>
                        {#if expandProfileTab}
                            <div use:clickOutside on:outclick={() => (expandProfileTab = false)} in:fade={{duration:100, easing: cubicIn}} out:fade={{duration:100, easing: cubicOut}} class="absolute right-8 top-36 lg:right-32 z-10 lg:top-40 w-48 origin-top-right rounded-md bg-Base py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none shadowBackSmall border-4 border-Shade01" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                                <a href="#" class="block px-4 py-2 text-sm text-Neutral6 hover:bg-Neutral1 active:bg-Neutral3" role="menuitem" tabindex="-1" id="user-menu-item-0">Log in</a>
                                <a href="#" class="block px-4 py-2 text-sm text-Neutral6 hover:bg-Neutral1 active:bg-Neutral3" role="menuitem" tabindex="-1" id="user-menu-item-1">Sign Up</a>
                                <hr>
                                <a href="#" class="block px-4 py-2 text-sm text-Neutral6 hover:bg-Neutral1 active:bg-Neutral3" role="menuitem" tabindex="-1" id="user-menu-item-3">Become a mobicrew</a>
                                <a href="#" class="block px-4 py-2 text-sm text-Neutral6 hover:bg-Neutral1 active:bg-Neutral3" role="menuitem" tabindex="-1" id="user-menu-item-4">Trips</a>
                                <a href="#" class="block px-4 py-2 text-sm text-Neutral6 hover:bg-Neutral1 active:bg-Neutral3" role="menuitem" tabindex="-1" id="user-menu-item-5">Support</a>
                            </div>
                        {/if}
                    </div>
                </div>
                {#if expandNavBar}
                    <div class="grid grid-cols-12 flex justify-center items-center mb-12" in:slide={{duration: 250, easing: cubicIn}} out:slide={{duration: 300, easing: cubicOut}}>
                        <div class="md:col-span-1 xl:col-span-2 2xl:col-span-3"></div>
                        <div class="md:col-span-10 xl:col-span-8 2xl:col-span-6 flex justify-center">
                            <div class="grid grid-cols-12 bg-Neutral1 shadowBackLarge lg:px-3 lg:py-2 xl:px-4 xl:py-2 border-Shade01 border-4 rounded-tl-md w-full">
                                <button class="whitespace-nowrap text-start col-span-2 hover:bg-Neutral3 hover:border-Shade01 hover:rounded-2xl p-2 {fromBar ? 'bg-Base rounded-2xl shadow-2xl' : ''}" on:click={() => fromBar = !fromBar}>
                                    <p class="md:text-xs lg:text-sm text-base font-semibold">From</p>
                                    <input class="md:text-sm lg:text-base text-lg inline-flex truncate w-11/12 {fromBar ? 'bg-Base' : 'bg-Neutral1'}" bind:value={$startingPoint} disabled>
                                </button>
                                <div class="col-span-1 flex justify-center items-center">
                                    <svg width="2" height="25" viewBox="0 0 2 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 4.37114e-08L0.999999 25" stroke="#979793" stroke-width="2"/>
                                    </svg>
                                </div>
                                <button class="col-span-2 hover:bg-Neutral3 hover:border-Shade01 hover:rounded-md p-2 whitespace-nowrap text-start {toBar ? 'bg-Base rounded-2xl shadow-2xl' : ''}" on:click={() => toBar = !toBar}>
                                    <p class="md:text-xs lg:text-sm text-base font-semibold">To</p>
                                    <input class="md:text-sm lg:text-base text-lg inline-flex truncate w-11/12 {toBar ? 'bg-Base' : 'bg-Neutral1'}" bind:value={$destination} disabled>
                                </button>
                                <div class="col-span-1 flex justify-center items-center">
                                    <svg width="2" height="25" viewBox="0 0 2 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 4.37114e-08L0.999999 25" stroke="#979793" stroke-width="2"/>
                                    </svg>
                                </div>
                                <button class="col-span-2 hover:bg-Neutral3 hover:border-Shade01 hover:rounded-md p-2 whitespace-nowrap text-start {pickUpTime ? 'bg-Base rounded-2xl shadow-2xl' : ''}" on:click={() => pickUpTime = !pickUpTime}>
                                    <p class="md:text-xs lg:text-sm text-base font-semibold">Pick-Up Time</p>
                                    <input class="md:text-sm lg:text-base text-lg inline-flex truncate w-11/12 {pickUpTime ? 'bg-Base' : 'bg-Neutral1'}" value={formatter.format($time)} disabled>
                                </button>
                                <div class="col-span-1 flex justify-center items-center">
                                    <svg width="2" height="25" viewBox="0 0 2 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 4.37114e-08L0.999999 25" stroke="#979793" stroke-width="2"/>
                                    </svg>
                                </div>
                                <div class="col-span-3">
                                    <div class="grid grid-cols-8 flex justify-center items-center gap-3">
                                        <button class="whitespace-nowrap col-span-5 text-start p-2 hover:bg-Neutral3 hover:border-Shade01 hover:rounded-md">
                                            <p class="md:text-xs lg:text-sm text-base font-semibold">Car</p>
                                            <h3 class="md:text-sm lg:text-base text-lg text-Neutral7 inline-flex">Choose vehicle</h3>
                                        </button>
                                        <button class="lg:-mr-4 -mt-1 w-12 h-12 bg-Primary1 rounded-full flex justify-center items-center text-center shadowBackSmall hover:bg-PrimaryHover">
                                            <svg width="23" height="23" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" fill="white"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="md:col-span-1 xl:col-span-2 2xl:col-span-3"></div>
                    </div>
                {/if}
                {#if fromBar}
                    <FromBar bind:fromBar/>
                {/if}
                {#if toBar}
                    <ToBar bind:toBar />
                {/if}
                {#if pickUpTime}
                    <PickUpTime bind:pickUpTime />
                {/if}
            {/if}
        </nav>
        <section class="grid grid-cols-1 w-full lg:border-x-10 border-b-8 border-Neutral8">
            <div class="grid grid-rows-6 min-w-full">
                <div class="row-span-6">
                    <div class="grid grid-cols-12 flex justify-center">
                        <div class="col-span-12 lg:col-span-6 font-black text-Neutral8 font-semibold mt-16 md:mt-32 xl:ml-20">
                            <div class="grid grid-cols-12">
                                <div class="col-span-1"></div>
                                <div class="col-span-10">
                                    {#key index}
                                        <div class="text-4xl md:text-6xl lg:text-4xl xl:text-6xl 2xl:text-8xl">
                                            <h1 class="" transition:slide>{ride[index]}</h1>
                                            <h1 class="mt-12 font-bold" transition:slide>{simplified[index]}</h1>
                                        </div>
                                    {/key}
                                    <p class="text-base lg:text-lg xl:text-lg 2xl:text-xl mt-10">Mobigo offers a hassle-free and convenient way to get around, without the need to worry about parking or navigating public transportation.</p>
                                    <div class="flex gap-32 mt-10 items-center">
                                        <button class="shadowBack px-10 py-4 placeholder-Shade01 text-Shade01 font-medium lg:text-sm xl:text-lg 2xl:text-2xl border-solid rounded-tl-md border-4 border-Shade01">Learn More</button>
                                        <a class="lg:text-sm xl:text-lg 2xl:text-2xl" href="#">Pricing</a>
                                    </div>
                                    <div class="flex items-center mt-24 lg:text-lg xl:text-xl 2xl:text-2xl">
                                        <img src="/Wheel.jpg" alt="Convenient Transportation Icon" class="object-scale-down w-16 h-16 shadowBackSmall border-6 mr-4 border-Shade01">
                                        <h3>Convenient Transportation</h3>
                                    </div>
                                    <div class="flex items-center mt-10 lg:text-lg xl:text-xl 2xl:text-2xl">
                                        <img src="/Price.jpg" alt="Affordable Pricing Icon" class="object-scale-down w-16 h-16 shadowBackSmall border-6 mr-4 border-Shade01">
                                        <h3>Affordable Pricing</h3>
                                    </div>
                                    <div class="flex items-center mt-10 lg:text-lg xl:text-xl 2xl:text-2xl">
                                        <img src="/Reliable.jpg" alt="Reliable Service Icon" class="object-scale-down w-16 h-16 shadowBackSmall border-6 mr-4 border-Shade01">
                                        <h3>Reliable Service</h3>
                                    </div>
                                    <div class="flex items-center mt-10 lg:text-lg xl:text-xl 2xl:text-2xl">
                                        <img src="/Customizable.jpg" alt="Customizable Options Icon" class="object-scale-down w-16 h-16 shadowBackSmall border-6 mr-4 border-Shade01">
                                        <h3>Customizable Options</h3>
                                    </div>
                                    <div class="flex items-center mt-10 mb-20 lg:text-lg xl:text-xl 2xl:text-2xl">
                                        <img src="/Seamless.jpg" alt="Seamless Booking Icon" class="object-scale-down w-16 h-16 shadowBackSmall border-6 mr-4 border-Shade01">
                                        <h3>Seamless Booking Process</h3>
                                    </div>
                                </div>
                                <div class="col-span-1"></div>
                            </div>
                        </div>
                        <div class="col-span-12 lg:col-span-6 text-7xl font-black text-Neutral8 checkered flex justify-center items-center">
                            <Canvas>
                                <Scene />
                            </Canvas>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="grid grid-cols-1 min-h-screen relative w-full md:md:md:md:md:lg:border-x-10 border-Neutral8">
            <div class="grid grid-rows-12 absolute top-0 left-0 min-h-screen bg-cover bg-center bg-no-repeat" style="background-image: url('/Background-1.png');">
                <div class="row-span-6"></div>
                <div class="border-y-8 border-Neutral8 backdrop-blur-sm row-span-12">
                    <div class="grid grid-cols-12 flex justify-center items-center min-h-full">
                        <div class="col-span-12">
                            <Splide class="pb-20" aria-label="MobiGo Reviews"
                                    options={ {
                            autoplay: true,
                            pauseOnHover: true,
                            arrows : false,
                            type: 'loop',
                            perPage: 2,
                            drag   : 'free',
                            snap   : true,
                            lazyLoad: 'nearby',
                            focus: 'center',
                            rewind: true,
                            gap   : '6rem',
                          } }
                            >
                                <SplideSlide>
                                    <div class="h-full w-full shadowBackLarge border border-8 border-Shade01 rounded-tl-md backdrop-blur-3xl">
                                        <div class="grid grid-cols-12 px-3 py-3 mt-2 gap-4">
                                            <div class="col-span-3">
                                                <div class="flex flex-wrap justify-center">
                                                    <img src="/faces/avatar-11a8f12ec1ac0f93c4cc1a2abd77eeab.jpg" class="shadowBackSmallPurpleNonActive border-6 border-Shade01 rounded-b-full rounded-t-full max-w-full align-middle">
                                                </div>
                                            </div>
                                            <div class="col-span-5 flex items-center">
                                                <div class="block">
                                                    <h1 class="text-2xl text-Neutral5">Victoria Marie</h1>
                                                    <h3 class="tet-xl text-Shade01 inline-flex mt-1">Member<p class="text-YellowDark font-semibold">&nbsp; Gold</p></h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-12 px-3 py-3 mt-2 gap-4">
                                            <div class="col-span-12">
                                                <hr class="mx-6 h-1 bg-Neutral3 underline" style="color: #B1B0AB; box-shadow: 3px 3px 0px #000000">
                                                <p class="mx-6 text-xl leading-relaxed my-10" >"I've been a MobiGo Gold member for several months now and it's been a game-changer for my daily commute. The app is easy to use and booking a ride is a breeze. I appreciate the flexibility to schedule rides in advance or request them on-demand. The drivers are always professional and courteous, and the cars are clean and comfortable. The added benefits of being a Gold member, such as exclusive discounts and priority booking, make it even more worthwhile. Overall, I highly recommend MobiGo to anyone looking for a reliable and convenient transportation service."</p>
                                            </div>
                                        </div>
                                    </div>
                                </SplideSlide>
                                <SplideSlide>
                                    <div class="h-full w-full shadowBackLarge border border-8 border-Shade01 rounded-tl-md backdrop-blur-3xl">
                                        <div class="grid grid-cols-12 px-3 py-3 mt-2 gap-4">
                                            <div class="col-span-3">
                                                <div class="flex flex-wrap justify-center">
                                                    <img src="/faces/avatar-11b601b95430d11d5c274344ea6ea681.jpg" class="shadowBackSmallPurpleNonActive border-6 border-Shade01 rounded-b-full rounded-t-full max-w-full align-middle">
                                                </div>
                                            </div>
                                            <div class="col-span-8 flex items-center">
                                                <div class="block w-full">
                                                    <div class="grid grid-cols-2 flex items-center">
                                                        <div class="col-span-1">
                                                            <h1 class="text-2xl text-Neutral5 mr-6">Kareem Al-Saeed</h1>
                                                        </div>
                                                        <div class="col-span-1 inline-flex items-center justify-end">
                                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6.5479 0.457121C6.72831 0.0751911 7.27169 0.0751907 7.4521 0.457121L9.17302 4.10039C9.2459 4.25469 9.39245 4.36116 9.56172 4.3828L13.5585 4.89366C13.9775 4.94721 14.1454 5.464 13.8379 5.7536L10.9047 8.51612C10.7805 8.63312 10.7245 8.8054 10.7563 8.97308L11.5055 12.9321C11.584 13.3471 11.1444 13.6665 10.7739 13.4635L7.24023 11.5276C7.09057 11.4456 6.90943 11.4456 6.75977 11.5276L3.22606 13.4635C2.85561 13.6665 2.416 13.3471 2.49454 12.9321L3.24375 8.97308C3.27548 8.8054 3.2195 8.63312 3.09528 8.51612L0.162117 5.7536C-0.145371 5.464 0.0225447 4.94721 0.441531 4.89366L4.43828 4.3828C4.60755 4.36116 4.7541 4.25469 4.82698 4.10039L6.5479 0.457121Z" fill="#02030A"/>
                                                            </svg>
                                                            <h3 class="inline-flex text-Shade01 text-lg">4.66<h3 class="text-Neutral5">&nbsp; (110 Reviews)</h3></h3>
                                                        </div>
                                                    </div>
                                                    <h3 class="tet-xl text-Shade01 inline-flex mt-1">Mobi<p class="text-Primary1 font-semibold">Crew</p></h3>
                                                    <h3 class="tet-xl text-Shade01">Toyota Corolla 97</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-12 px-3 py-3 mt-2 gap-4">
                                            <div class="col-span-12">
                                                <hr class="mx-6 h-1 bg-Neutral3 underline" style="color: #B1B0AB; box-shadow: 3px 3px 0px #000000">
                                                <p class="mx-6 text-xl leading-relaxed my-10" >"Being a part of the MobiCrew drivers has been a great way to earn extra income on the side. The flexible scheduling options and user-friendly app make it easy to fit driving into my busy schedule. The passengers are always friendly and the rides are typically smooth and straightforward. Plus, the pay is competitive and the tips are a nice bonus. Overall, I highly recommend MobiCrew to anyone looking to earn extra income on their own schedule."</p>
                                            </div>
                                        </div>
                                    </div>
                                </SplideSlide>
                                <SplideSlide>
                                    <div class="h-full w-full shadowBackLarge border border-8 border-Shade01 rounded-tl-md backdrop-blur-3xl">
                                        <div class="grid grid-cols-12 px-3 py-3 mt-2 gap-4">
                                            <div class="col-span-3">
                                                <div class="flex flex-wrap justify-center">
                                                    <img src="/faces/avatar-11bae06da2bf9bcca00e8bfd6b282529.jpg" class="shadowBackSmallPurpleNonActive border-6 border-Shade01 rounded-b-full rounded-t-full max-w-full align-middle">
                                                </div>
                                            </div>
                                            <div class="col-span-8 flex items-center">
                                                <div class="block w-full">
                                                    <div class="grid grid-cols-2 flex items-center">
                                                        <div class="col-span-1">
                                                            <h1 class="text-2xl text-Neutral5 mr-6">Ming Chen</h1>
                                                        </div>
                                                        <div class="col-span-1 inline-flex items-center justify-end">
                                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6.5479 0.457121C6.72831 0.0751911 7.27169 0.0751907 7.4521 0.457121L9.17302 4.10039C9.2459 4.25469 9.39245 4.36116 9.56172 4.3828L13.5585 4.89366C13.9775 4.94721 14.1454 5.464 13.8379 5.7536L10.9047 8.51612C10.7805 8.63312 10.7245 8.8054 10.7563 8.97308L11.5055 12.9321C11.584 13.3471 11.1444 13.6665 10.7739 13.4635L7.24023 11.5276C7.09057 11.4456 6.90943 11.4456 6.75977 11.5276L3.22606 13.4635C2.85561 13.6665 2.416 13.3471 2.49454 12.9321L3.24375 8.97308C3.27548 8.8054 3.2195 8.63312 3.09528 8.51612L0.162117 5.7536C-0.145371 5.464 0.0225447 4.94721 0.441531 4.89366L4.43828 4.3828C4.60755 4.36116 4.7541 4.25469 4.82698 4.10039L6.5479 0.457121Z" fill="#02030A"/>
                                                            </svg>
                                                            <h3 class="inline-flex text-Shade01 text-lg">4.88<h3 class="text-Neutral5">&nbsp; (27 Reviews)</h3></h3>
                                                        </div>
                                                    </div>
                                                    <h3 class="tet-xl text-Shade01 inline-flex mt-1">Mobi<p class="text-Primary1 font-semibold">Crew</p></h3>
                                                    <h3 class="tet-xl text-Shade01">Hyundai Sonata 2015</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-12 px-3 py-3 mt-2 gap-4">
                                            <div class="col-span-12">
                                                <hr class="mx-6 h-1 bg-Neutral3 underline" style="color: #B1B0AB; box-shadow: 3px 3px 0px #000000">
                                                <p class="mx-6 text-xl leading-relaxed my-10" >"Joining the MobiCrew team has been a great decision for me. As a driver, I appreciate the easy-to-use app and the flexibility to choose my own schedule. The passengers are usually friendly and the rides are typically straightforward. But what I love most about driving for MobiCrew is the extra income it provides. As a college student, the extra cash has helped me cover my expenses and pay off my loans faster. I highly recommend MobiCrew to anyone looking for a flexible way to earn extra income."</p>
                                            </div>
                                        </div>
                                    </div>
                                </SplideSlide>
                                <SplideSlide>
                                    <div class="h-full w-full shadowBackLarge border border-8 border-Shade01 rounded-tl-md backdrop-blur-3xl">
                                        <div class="grid grid-cols-12 px-3 py-3 mt-2 gap-4">
                                            <div class="col-span-3">
                                                <div class="flex flex-wrap justify-center">
                                                    <img src="/faces/avatar-11c3120fdb2de1e22966aae36cd9683d.jpg" class="shadowBackSmallPurpleNonActive border-6 border-Shade01 rounded-b-full rounded-t-full max-w-full align-middle">
                                                </div>
                                            </div>
                                            <div class="col-span-8 flex items-center">
                                                <div class="block w-full">
                                                    <div class="grid grid-cols-2 flex items-center">
                                                        <div class="col-span-1">
                                                            <h1 class="text-2xl text-Neutral5 mr-6">Malik Johnson</h1>
                                                        </div>
                                                        <div class="col-span-1 inline-flex items-center justify-end">
                                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6.5479 0.457121C6.72831 0.0751911 7.27169 0.0751907 7.4521 0.457121L9.17302 4.10039C9.2459 4.25469 9.39245 4.36116 9.56172 4.3828L13.5585 4.89366C13.9775 4.94721 14.1454 5.464 13.8379 5.7536L10.9047 8.51612C10.7805 8.63312 10.7245 8.8054 10.7563 8.97308L11.5055 12.9321C11.584 13.3471 11.1444 13.6665 10.7739 13.4635L7.24023 11.5276C7.09057 11.4456 6.90943 11.4456 6.75977 11.5276L3.22606 13.4635C2.85561 13.6665 2.416 13.3471 2.49454 12.9321L3.24375 8.97308C3.27548 8.8054 3.2195 8.63312 3.09528 8.51612L0.162117 5.7536C-0.145371 5.464 0.0225447 4.94721 0.441531 4.89366L4.43828 4.3828C4.60755 4.36116 4.7541 4.25469 4.82698 4.10039L6.5479 0.457121Z" fill="#02030A"/>
                                                            </svg>
                                                            <h3 class="inline-flex text-Shade01 text-lg">4.02<h3 class="text-Neutral5">&nbsp; (63 Reviews)</h3></h3>
                                                        </div>
                                                    </div>
                                                    <h3 class="tet-xl text-Shade01 inline-flex mt-1">Mobi<p class="text-Primary1 font-semibold">Crew</p></h3>
                                                    <h3 class="tet-xl text-Shade01">Toyota Camry 2008</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-12 px-3 py-3 mt-2 gap-4">
                                            <div class="col-span-12">
                                                <hr class="mx-6 h-1 bg-Neutral3 underline" style="color: #B1B0AB; box-shadow: 3px 3px 0px #000000">
                                                <p class="mx-6 text-xl leading-relaxed my-10" >"As a busy university student, I was looking for a flexible way to earn extra income without interfering with my studies. Joining MobiCrew as a driver has been the perfect solution. The app is easy to use and scheduling rides around my classes has been simple. The extra income has been a lifesaver for covering textbooks and other expenses. I also appreciate the friendly and professional support from MobiCrew staff. Overall, I highly recommend MobiCrew to any university student looking for a convenient way to earn extra income."</p>
                                            </div>
                                        </div>
                                    </div>
                                </SplideSlide>
                                <SplideSlide>
                                    <div class="h-full w-full shadowBackLarge border border-8 border-Shade01 rounded-tl-md backdrop-blur-3xl">
                                        <div class="grid grid-cols-12 px-3 py-3 mt-2 gap-4">
                                            <div class="col-span-3">
                                                <div class="flex flex-wrap justify-center">
                                                    <img src="/faces/avatar-117b1603d512c6835cf62a88b0f142cf.jpg" class="shadowBackSmallPurpleNonActive border-6 border-Shade01 rounded-b-full rounded-t-full max-w-full align-middle">
                                                </div>
                                            </div>
                                            <div class="col-span-8 flex items-center">
                                                <div class="block w-full">
                                                    <div class="grid grid-cols-2 flex items-center">
                                                        <div class="col-span-1">
                                                            <h1 class="text-2xl text-Neutral5 mr-6">Aarushi Patel</h1>
                                                        </div>
                                                        <div class="col-span-1 inline-flex items-center justify-end">
                                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6.5479 0.457121C6.72831 0.0751911 7.27169 0.0751907 7.4521 0.457121L9.17302 4.10039C9.2459 4.25469 9.39245 4.36116 9.56172 4.3828L13.5585 4.89366C13.9775 4.94721 14.1454 5.464 13.8379 5.7536L10.9047 8.51612C10.7805 8.63312 10.7245 8.8054 10.7563 8.97308L11.5055 12.9321C11.584 13.3471 11.1444 13.6665 10.7739 13.4635L7.24023 11.5276C7.09057 11.4456 6.90943 11.4456 6.75977 11.5276L3.22606 13.4635C2.85561 13.6665 2.416 13.3471 2.49454 12.9321L3.24375 8.97308C3.27548 8.8054 3.2195 8.63312 3.09528 8.51612L0.162117 5.7536C-0.145371 5.464 0.0225447 4.94721 0.441531 4.89366L4.43828 4.3828C4.60755 4.36116 4.7541 4.25469 4.82698 4.10039L6.5479 0.457121Z" fill="#02030A"/>
                                                            </svg>
                                                            <h3 class="inline-flex text-Shade01 text-lg">4.92<h3 class="text-Neutral5">&nbsp; (245 Reviews)</h3></h3>
                                                        </div>
                                                    </div>
                                                    <h3 class="tet-xl text-Shade01 inline-flex mt-1">Mobi<p class="text-Primary1 font-semibold">Crew</p></h3>
                                                    <h3 class="tet-xl text-Shade01">Volkswagen Golf GTI 2010</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-12 px-3 py-3 mt-2 gap-4">
                                            <div class="col-span-12">
                                                <hr class="mx-6 h-1 bg-Neutral3 underline" style="color: #B1B0AB; box-shadow: 3px 3px 0px #000000">
                                                <p class="mx-6 text-xl leading-relaxed my-10" >"As a single mother, I needed a flexible way to earn extra income that would work around my childcare responsibilities. Joining MobiCrew as a driver has been a game-changer for me. The easy-to-use app and flexible scheduling options make it easy to fit driving around my busy schedule. The extra income has been a huge help for covering expenses and providing for my family. I also appreciate the supportive community of fellow drivers and the helpful staff at MobiCrew. Overall, I highly recommend MobiCrew to any single parent looking for a flexible and rewarding way to earn extra income."</p>
                                            </div>
                                        </div>
                                    </div>
                                </SplideSlide>
                                <SplideSlide>
                                    <div class="h-full w-full shadowBackLarge border border-8 border-Shade01 rounded-tl-md backdrop-blur-3xl">
                                        <div class="grid grid-cols-12 px-3 py-3 mt-2 gap-4">
                                            <div class="col-span-3">
                                                <div class="flex flex-wrap justify-center">
                                                    <img src="/faces/avatar-117bba7185a9a4d185c05efb0cdd3289.jpg" class="shadowBackSmallPurpleNonActive border-6 border-Shade01 rounded-b-full rounded-t-full max-w-full align-middle">
                                                </div>
                                            </div>
                                            <div class="col-span-5 flex items-center">
                                                <div class="block">
                                                    <h1 class="text-2xl text-Neutral5">Jada Robinson</h1>
                                                    <h3 class="tet-xl text-Shade01 inline-flex mt-1">Member<p class="text-YellowDark font-semibold">&nbsp; Gold</p></h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-12 px-3 py-3 mt-2 gap-4">
                                            <div class="col-span-12">
                                                <hr class="mx-6 h-1 bg-Neutral3 underline" style="color: #B1B0AB; box-shadow: 3px 3px 0px #000000">
                                                <p class="mx-6 text-xl leading-relaxed my-10" >"I've been using MobiGo for several months now and it's been a game-changer for me. As a busy professional, I need a reliable and convenient way to get around the city without worrying about parking or navigating public transportation. The MobiGo app is incredibly user-friendly and has a wide range of ride options to fit my needs and budget. I also appreciate the safety features, like driver tracking and contactless payment options."</p>
                                            </div>
                                        </div>
                                    </div>
                                </SplideSlide>
                                <SplideSlide>
                                    <div class="h-full w-full shadowBackLarge border border-8 border-Shade01 rounded-tl-md backdrop-blur-3xl">
                                        <div class="grid grid-cols-12 px-3 py-3 mt-2 gap-4">
                                            <div class="col-span-3">
                                                <div class="flex flex-wrap justify-center">
                                                    <img src="/faces/avatar-1115f46f4e46fc7cb986b0bd5c6db642.jpg" class="shadowBackSmallPurpleNonActive border-6 border-Shade01 rounded-b-full rounded-t-full max-w-full align-middle">
                                                </div>
                                            </div>
                                            <div class="col-span-5 flex items-center">
                                                <div class="block">
                                                    <h1 class="text-2xl text-Neutral5">Anders Johansson</h1>
                                                    <h3 class="tet-xl text-Shade01 inline-flex mt-1">Member</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-12 px-3 py-3 mt-2 gap-4">
                                            <div class="col-span-12">
                                                <hr class="mx-6 h-1 bg-Neutral3 underline" style="color: #B1B0AB; box-shadow: 3px 3px 0px #000000">
                                                <p class="mx-6 text-xl leading-relaxed my-10" >"I don't use MobiGo on a regular basis, but it's been a lifesaver in emergency situations. When my car broke down on the way to an important appointment, I was able to quickly book a ride using the MobiGo app and make it to my destination on time. The ride was comfortable and the driver was professional and friendly. I appreciate the convenience and peace of mind that MobiGo provides, knowing that I have a reliable backup option when I need it most. The pricing is also very reasonable, especially considering the quality of service. Overall, I highly recommend MobiGo to anyone looking for a reliable and convenient emergency transportation option."</p>
                                            </div>
                                        </div>
                                    </div>
                                </SplideSlide>
                                <SplideSlide>
                                    <div class="h-full w-full shadowBackLarge border border-8 border-Shade01 rounded-tl-md backdrop-blur-3xl">
                                        <div class="grid grid-cols-12 px-3 py-3 mt-2 gap-4">
                                            <div class="col-span-3">
                                                <div class="flex flex-wrap justify-center">
                                                    <img src="/faces/avatar-1185f5fb87d7f671a244c1f46764bb4f.jpg" class="shadowBackSmallPurpleNonActive border-6 border-Shade01 rounded-b-full rounded-t-full max-w-full align-middle">
                                                </div>
                                            </div>
                                            <div class="col-span-8 flex items-center">
                                                <div class="block w-full">
                                                    <div class="grid grid-cols-2 flex items-center">
                                                        <div class="col-span-1">
                                                            <h1 class="text-2xl text-Neutral5 mr-6">Dwi Kusuma</h1>
                                                        </div>
                                                        <div class="col-span-1 inline-flex items-center justify-end">
                                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6.5479 0.457121C6.72831 0.0751911 7.27169 0.0751907 7.4521 0.457121L9.17302 4.10039C9.2459 4.25469 9.39245 4.36116 9.56172 4.3828L13.5585 4.89366C13.9775 4.94721 14.1454 5.464 13.8379 5.7536L10.9047 8.51612C10.7805 8.63312 10.7245 8.8054 10.7563 8.97308L11.5055 12.9321C11.584 13.3471 11.1444 13.6665 10.7739 13.4635L7.24023 11.5276C7.09057 11.4456 6.90943 11.4456 6.75977 11.5276L3.22606 13.4635C2.85561 13.6665 2.416 13.3471 2.49454 12.9321L3.24375 8.97308C3.27548 8.8054 3.2195 8.63312 3.09528 8.51612L0.162117 5.7536C-0.145371 5.464 0.0225447 4.94721 0.441531 4.89366L4.43828 4.3828C4.60755 4.36116 4.7541 4.25469 4.82698 4.10039L6.5479 0.457121Z" fill="#02030A"/>
                                                            </svg>
                                                            <h3 class="inline-flex text-Shade01 text-lg">3.83<h3 class="text-Neutral5">&nbsp; (11 Reviews)</h3></h3>
                                                        </div>
                                                    </div>
                                                    <h3 class="tet-xl text-Shade01 inline-flex mt-1">Mobi<p class="text-Primary1 font-semibold">Crew</p></h3>
                                                    <h3 class="tet-xl text-Shade01">Nissan Yaris 2008</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-12 px-3 py-3 mt-2 gap-4">
                                            <div class="col-span-12">
                                                <hr class="mx-6 h-1 bg-Neutral3 underline" style="color: #B1B0AB; box-shadow: 3px 3px 0px #000000">
                                                <p class="mx-6 text-xl leading-relaxed my-10" >"As a MobiCrew driver, I've been able to earn extra income on my own terms. The flexible scheduling options allow me to work around my other commitments, whether it's my full-time job or family obligations. The training and support provided by MobiGo have been top-notch, ensuring that I always feel confident and prepared on the road. I also appreciate the ability to track my earnings and easily withdraw my payments through the app. Overall, being a MobiCrew driver has been a great experience and I would highly recommend it to anyone looking for a flexible and rewarding side gig."</p>
                                            </div>
                                        </div>
                                    </div>
                                </SplideSlide>
                            </Splide>
                        </div>
                    </div>
                </div>
                <div class="row-span-6"></div>
            </div>
        </section>
        <section class="shadow-xl">
            <div class="section-container md:md:md:md:md:lg:border-x-10 border-Neutral8 border-t-10 pb-20">
                <div class="steps-container">
                    <Scrolly bind:value>
                        {#each steps as text, i}
                            <div class="step" class:active={value === i}>
                                <div class="step-content">{@html text}</div>
                            </div>
                        {/each}
                        <div class="spacer" />
                    </Scrolly>
                </div>
                <div class="sticky">
                    <Scatterplot step={value} />
                </div>
            </div>
        </section>
        <footer class="h-fit w-full border-10 border-Neutral8 border-b-12 pb-20">
            <div class="grid grid-cols-12">
                <div class="col-span-2"></div>
                <div class="col-span-8 mt-20">
                    <div class="grid grid-cols-12 gap-4 flex justify-center">
                        <div class="col-span-3 block">
                            <h1 class="font-semibold text-lg mb-5">About Us</h1>
                            <a href="#" class="text-md underline hover:text-PrimaryDark">Company Mission Statement</a><br>
                            <a href="#" class="text-md underline hover:text-PrimaryDark">Company History</a><br>
                            <a href="#" class="text-md underline hover:text-PrimaryDark">Founders Biographies</a><br>
                            <a href="#" class="text-md underline hover:text-PrimaryDark">Awards and Accolades</a><br>
                            <a href="#" class="text-md underline hover:text-PrimaryDark">Company Culture and Values</a><br>
                            <a href="#" class="text-md underline hover:text-PrimaryDark">Press Coverage</a><br>
                            <a href="#" class="text-md underline hover:text-PrimaryDark">Customer Testimonials</a><br>
                        </div>
                        <div class="col-span-3">
                            <h1 class="font-semibold text-lg mb-5">Services</h1>
                            <a href="#" class="text-md underline hover:text-PrimaryDark">Service descriptions and pricing</a><br>
                            <a href="#" class="text-md underline hover:text-PrimaryDark">Product demonstrations</a><br>
                            <a href="#" class="text-md underline hover:text-PrimaryDark">Case studies</a><br>
                            <a href="#" class="text-md underline hover:text-PrimaryDark">User reviews and ratings</a><br>
                            <a href="#" class="text-md underline hover:text-PrimaryDark">Tutorials</a><br>
                        </div>
                        <div class="col-span-3">
                            <h1 class="font-semibold text-lg mb-5">Resources</h1>
                            <a href="#" class="text-md underline hover:text-PrimaryDark">Blog articles</a><br>
                            <a href="#" class="text-md underline hover:text-PrimaryDark">Infographics</a><br>
                            <a href="#" class="text-md underline hover:text-PrimaryDark">Research reports</a><br>
                            <a href="#" class="text-md underline hover:text-PrimaryDark">Customer success stories</a><br>
                        </div>
                        <div class="col-span-3">
                            <h1 class="font-semibold text-lg mb-5">Support</h1>
                            <a href="#" class="text-md underline hover:text-PrimaryDark">FAQ</a><br>
                            <a href="#" class="text-md underline hover:text-PrimaryDark">Live chat</a><br>
                            <a href="#" class="text-md underline hover:text-PrimaryDark">Email and phone support</a><br>
                            <a href="#" class="text-md underline hover:text-PrimaryDark">Community forum</a><br>
                            <a href="#" class="text-md underline hover:text-PrimaryDark">Service status information</a><br>
                        </div>
                    </div>
                </div>
                <div class="col-span-2"></div>
            </div>
        </footer>
    </div>
{/if}

<style>
    :global(body) {
        overflow-x: hidden;
    }

    .hero {
        height: 60vh;
        display: flex;
        place-items: center;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }

    .hero h2 {
        margin-top: 0;
        font-weight: 200;
    }

    .spacer {
        height: 40vh;
    }

    .sticky {
        position: sticky;
        top: 10%;
        flex: 1 1 60%;
        width: 60%;
    }

    .section-container {
        padding-top: 1em;
        text-align: center;
        transition: background 100ms;
        display: flex;
        padding-right: 4rem;
        padding-left: 4rem;
    }

    .step {
        height: 80vh;
        display: flex;
        place-items: center;
        justify-content: center;
    }

    .step-content {
        font-size: 1.5rem;
        background: whitesmoke;
        color: #ccc;
        padding: 2rem 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        transition: background 500ms ease;
        border-top-left-radius: 4px;
        border-width: 8px;
        box-shadow: 1px 1px 0px 0px rgba(94, 83, 162, 1),
        2px 2px 0px 0px rgba(94, 83, 162, 1), 3px 3px 0px 0px rgba(94, 83, 162, 1),
        4px 4px 0px 0px rgba(94, 83, 162, 1), 5px 5px 0px 0px rgba(94, 83, 162, 1),
        6px 6px 0px 0px rgba(94, 83, 162, 1), 7px 7px 0px 0px rgba(94, 83, 162, 1),
        8px 8px 0px 0px rgba(94, 83, 162, 1), 9px 9px 0px 0px rgba(94, 83, 162, 1),
        10px 10px 0px 0px rgba(94, 83, 162, 1);
        text-align: left;
        width: 75%;
        margin: auto;
        max-width: 500px;
    }

    .step.active .step-content {
        background: white;
        color: black;
    }

    .steps-container,
    .sticky {
        height: 100%;
    }

    .steps-container {
        flex: 1 1 40%;
        z-index: 10;
    }
</style>