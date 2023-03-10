<script>
    import { time, startingPoint, destination } from '../../../stores.js';
    import { fly, slide } from 'svelte/transition';
    import { cubicIn, cubicOut } from 'svelte/easing';

    const formatter = new Intl.DateTimeFormat('en', {
        hour12: false,
        hour: 'numeric',
        minute: '2-digit',
    });
    export let expandNavBarMobile = false;
</script>

<div class="relative bg-Base" in:slide={{duration: 1500, easing: cubicIn}}>
    <div class="grid grid-cols-12 px-8 py-4 w-full" in:fly={{duration:1000, delay:50, y:50}}>
        <div class="col-span-8 flex items-center">
            <picture><source srcset="/MobiLogo.webp" media="(min-width: 600px)"> <img src="/MobiLogo-M.webp" style="width: 40px" alt="MobiGo Logo" loading=“lazy” decoding=“async” class="shadowBackSmall"></picture>
            <span class="text-2xl font-semibold ml-3">Mobi<span class="text-Primary1">Go</span></span>
        </div>
        <div class="col-span-4 flex justify-end">
            <button class="border border-4 shadowBackSmallRed font-semibold w-9 h-9 hover:bg-Neutral4" on:click={() => expandNavBarMobile = !expandNavBarMobile}>X</button>
        </div>
    </div>
    <div class="min-h-screen absolute top-40 min-w-full">
        <div class="grid grid-cols-12 px-8 w-full mb-6" in:fly={{duration:1000, delay:100, y:-300}}>
            <div class="col-span-12 h-fit pb-3 border-4 border-Shade01 shadowBackLarge">
                <div class="px-12">
                    <h1 class="text-base font-bold mt-3">From</h1>
                    <div class="mt-1">
                        <input type="text" id="StartingPoint" class="font-semibold border bg-Primary2 border-3 shadowBackSmall border-Shade01 text-white text-md placeholder-white rounded-tl-md h-10 w-full px-2 focus:outline focus:outline-Base focus:ring-1 focus:ring-PrimaryDark focus:ring-offset-4 focus:ring-offset-PrimaryDark" bind:value={$startingPoint} onfocus="this.value=''" required>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-12 px-8 mt-2 w-full mb-6" in:fly={{duration:1000, delay:200, y:-300}}>
            <div class="col-span-12 h-fit pb-3 border-4 border-Shade01 shadowBackLarge">
                <div class="px-12">
                    <h1 class="text-base font-bold mt-3">To</h1>
                    <div class="mt-1">
                        <input type="text" id="Destination" class="font-semibold border bg-Primary2 border-3 shadowBackSmall border-Shade01 text-white text-md placeholder-white rounded-tl-md h-10 w-full px-2 focus:outline focus:outline-Base focus:ring-1 focus:ring-PrimaryDark focus:ring-offset-4 focus:ring-offset-PrimaryDark" bind:value={$destination} required>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-12 px-8 mt-2 w-full mb-6" in:fly={{duration:1000, delay:300, y:-300}}>
            <div class="col-span-12 h-fit pb-3 border-4 border-Shade01 shadowBackLarge">
                <div class="px-12">
                    <h1 class="text-base font-bold mt-3">Pickup Time</h1>
                    <div class="mt-1">
                        <input class="mt-2 mr-4 font-semibold bg-Primary2 border border-3 shadowBackSmall border-Shade01 text-white text-lg placeholder-black rounded-tl-md h-10 w-full px-2 focus:outline focus:outline-Base focus:ring-1 focus:ring-PrimaryDark focus:ring-offset-4 focus:ring-offset-PrimaryDark" value={formatter.format($time)}  type="time" id="appt" name="appt">
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-12 px-8 mt-2 w-full" in:fly={{duration:1000, delay:300, y:-300}}>
            <div class="col-span-12 h-fit pb-3 border-4 border-Shade01 shadowBackLarge">
                <div class="px-12">
                    <h1 class="text-base font-bold mt-3">Car</h1>
                    <div class="mt-1">
                        <input type="text" id="Veichle" class="mt-2 font-semibold border bg-Primary2 border-3 shadowBackSmall border-Shade01 text-white text-md placeholder-white rounded-tl-md h-10 w-full px-2 focus:outline focus:outline-Base focus:ring-1 focus:ring-PrimaryDark focus:ring-offset-4 focus:ring-offset-PrimaryDark" placeholder="Select Vehicle" required>
                    </div>
                </div>
            </div>
        </div>
        <div class="absolute grid grid-cols-12 px-8 w-full inset-x-0 bottom-4" in:fly={{duration:1000, delay:50, y:300}}>
            <div class="col-span-6 flex items-center pl-3">
                <a class="text-xl underline" href="#">Clear</a>
            </div>
            <div class="col-span-6 flex justify-end items-center">
                <button class="border border-4 shadowBack font-semibold w-8/12 py-2" on:click={() => expandNavBarMobile = !expandNavBarMobile}>Search</button>
            </div>
        </div>
    </div>
</div>