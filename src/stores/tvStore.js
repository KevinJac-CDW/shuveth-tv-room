import { writable } from "svelte/store";

// INFO: default subscribed channels
const getDefaultSubscribedChannels = () => {
    let subscribedMap = [];
    for(let i = 0; i < 25; i++) {
        subscribedMap.push([i, true])
    }
    return subscribedMap;
}

// INFO: state to maintain TV's parameters like power, volume and channel number
export const tvState = writable({
    power: false,
    volume: 0.2,
    channelNumber: 0,
    detailsVisible: true,
    isTogglingVisible: false,
    booting: false,
    // @ts-ignore
    subscribedChannels: new Map(getDefaultSubscribedChannels())
});

