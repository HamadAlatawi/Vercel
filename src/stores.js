import {writable, readable, derived} from 'svelte/store'

export const time = readable(new Date(), function start(set) {
    const interval =
        set(new Date());
    ;

});

export const startingPoint = writable("Starting Point");

export const destination = writable("Destination")