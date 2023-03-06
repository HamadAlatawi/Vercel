<script>
    import { fly } from 'svelte/transition';
    import { clickOutside } from '../../../actions/clickOutside/clicked_outside'

    export let toBar = false;

</script>

<div class="grid grid-cols-12 mb-12 -ml-24 -mt-8 z-20 absolute w-full" in:fly={{y:25, duration: 500, delay: 50}} out:fly={{y:25, duration: 500}} use:clickOutside on:outclick={() => (toBar = false)}>
    <div class="col-span-4"></div>
    <div class="col-span-4 flex justify-center">
        <div class="grid grid-cols-12">
            <div class="col-span-12 h-fit w-80 border-6 border-Shade01 shadowBackLarge rounded-tl-md bg-Base pb-12">
                <div class="grid grid-cols-8">
                    <div class="col-span-4 pl-5">
                        <div class="mt-5">
                            <label for="Destination" class="block mb-2 text-md font-semibold text-black">Search Address</label>
                            <input type="text" id="Destination" class="mt-2 font-semibold border bg-Primary2 border-3 shadowBackSmall border-Shade01 text-white text-md placeholder-white rounded-tl-md py-3 px-12 focus:outline focus:outline-Base focus:ring-1 focus:ring-PrimaryDark focus:ring-offset-4 focus:ring-offset-PrimaryDark" placeholder="Address" required>
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
