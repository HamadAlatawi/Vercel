<script>
    import { time } from '../../../../stores.js';
    import { fly } from 'svelte/transition';
    import { clickOutside } from '../../../actions/clickOutside/clicked_outside'

    const formatter = new Intl.DateTimeFormat('en', {
        hour12: false,
        hour: 'numeric',
        minute: '2-digit',
    });

    export let pickUpTime = false;
</script>

<div class="grid grid-cols-12 mb-12 -ml-24 -mt-8 z-20 absolute w-full" in:fly={{y:25, duration: 500, delay: 50}} out:fly={{y:25, duration: 500}} use:clickOutside on:outclick={() => (pickUpTime = false)}>
    <div class="col-span-5"></div>
    <div class="col-span-4 flex justify-center">
        <div class="grid grid-cols-12">
            <div class="col-span-12 h-fit w-80 border-6 border-Shade01 shadowBackLarge rounded-tl-md bg-Base pb-12">
                <div class="grid grid-cols-8">
                    <div class="col-span-4 pl-5">
                        <div class="mt-5 block">
                            <p class="font-semibold">Select a time:</p>
                            <input class="mt-2 mr-4 font-semibold bg-Primary2 border border-3 shadowBackSmall border-Shade01 text-white text-lg placeholder-black rounded-tl-md py-3 px-12 focus:outline focus:outline-Base focus:ring-1 focus:ring-PrimaryDark focus:ring-offset-4 focus:ring-offset-PrimaryDark" value={formatter.format($time)} type="time" id="appt" name="appt">
                        </div>
                    </div>
                    <div class="col-span-1"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-span-2"></div>
    <div class="col-span-2"></div>
</div>
