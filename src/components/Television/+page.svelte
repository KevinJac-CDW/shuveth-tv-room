<script>
    // INFO: import videos from props
    /**
     * @type {any[]}
     */
    export let videos = [];
    // INFO: importing centralized tvState
    import { tvState } from "../../stores/tvStore";
    // INFO: tv on effect video
    import tvOnEffect from "../../lib/videos/tvOnEffect.mp4";
    // INFO: default value for paused to true
    let paused = true;
    // INFO: select first channel from videos list
    let channel = videos[0];
    // INFO: boolean to whether show video or not
    let showVideo = true;
    // INFO: on power off, pause the video
    $: paused = $tvState.power !== true;
    // INFO: change video when channel is changef
    $: {
        changeVideo($tvState.channelNumber);
    }

     // INFO: Flag to show video or not based on subscription
    $: { shouldShowVideo($tvState.subscribedChannels, $tvState.channelNumber) }
    // INFO: Toggles TV number and volume
    $: {
        toggleTvCaptionVisibility($tvState);
    }

        /**
     * @name shouldShowVideo
     * @params subscribedChannels<Map>
     * @params channelNumberVal<Number>
     * @author Shuvethram Ayyasamy Ragupathy
     * @date 4th wednesday 2023
     * @description decides whether to show video or not
     */
    const shouldShowVideo = (/** @type {{ has: (arg0: any) => any; }} */ subscribedChannels, /** @type {any} */ channelNumberVal) => {
        if(subscribedChannels.has(channelNumberVal)) showVideo = true;
        else showVideo = false;
    }

    /**
     * @name changeVideo
     * @params value<Number>
     * @author Shuvethram Ayyasamy Ragupathy
     * @date 4th wednesday 2023
     * @description changes video on channel change
     */
    const changeVideo = (/** @type {number} */ value) => {
        channel = videos[Number(value % 10)];
    };
    
    const toggleTvCaptionVisibility = (
        /** @type {{ power?: boolean; volume?: number; channelNumber?: number; detailsVisible: any; }} */ tvStateObj
    ) => {
        if (tvStateObj?.detailsVisible) {
            setTimeout(() => {
                $tvState.detailsVisible = false;
            }, 5000);
        }
    };
</script>

<!-- INFO: markup goes here -->
<div id="tv">
    <!-- svelte-ignore a11y-media-has-caption -->
    {#if $tvState.power}
        <!-- INFO: on channel change, re-renders the video component -->
        {#if $tvState.booting}
            <video width="100%" autoplay loop>
                <source src={tvOnEffect} type="video/mp4" />
            </video>
        {:else}
            {#key channel}
                <video
                    class={showVideo
                        ? ""
                        : "non-subscribed"}
                    width="100%"
                    bind:volume={$tvState.volume}
                    autoplay
                    loop
                >
                    <source src={channel} type="video/mp4" />
                </video>
            {/key}
            {#if !showVideo}
                <div id="subscription-view">
                    <div class="subscription-text-wrapper">
                        <p>Channel is not Subscribed.</p>
                        <button
                            class="subscription-button"
                            on:click={() => {
                                if (
                                    $tvState.subscribedChannels.has(
                                        $tvState.channelNumber
                                    )
                                )
                                    return;
                                else
                                    $tvState.subscribedChannels.set(
                                        $tvState.channelNumber,
                                        true
                                    );
                                channel = videos[Number($tvState.channelNumber % 10)]
                            }}
                        >
                            Subscribe now!
                        </button>
                    </div>
                </div>
            {/if}
            {#if $tvState.detailsVisible}
                <!-- INFO: UI to display channel number -->
                <div id="channel-number">
                    {$tvState.channelNumber}
                </div>
                <!-- INFO: UI to display volume number -->
                <div id="volume">
                    <p id="volume-number">
                        {($tvState.volume / 0.02).toFixed(0)}
                    </p>
                    <!-- INFO: loops over the volume bar based on volume count -->
                    <div class="volume-bar-container">
                        {#each { length: Number(($tvState.volume / 0.02).toFixed(0)) } as _}
                            <div class="volume-bar" />
                        {/each}
                    </div>
                </div>
            {/if}
        {/if}
    {/if}
</div>

<!-- INFO: style goes here -->
<style>
    #subscription-view {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: bold;
        font-size: 24px;
        height: 370px;
        width: 740px;
        top: 0;
        left: 0;
        background-color: #00000066;
    }
    .subscription-text-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .subscription-text-wrapper p {
        text-shadow: 2px 2px 2px #000;
    }
    .subscription-button {
        padding: 10px 20px;
        background-color: #970e0e;
        border: 0;
        color: #fff;
        outline: none;
        cursor: pointer;
    }
    video.non-subscribed {
        filter: blur(1.5rem);
    }
    video {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        object-fit: cover;
    }
    #volume {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    #volume-number {
        min-width: 30px;
    }
    .volume-bar {
        height: 20px;
        width: 10px;
        margin-right: 2px;
        background-color: #ffffff;
    }
    .volume-bar-container {
        display: flex;
        margin-left: 30px;
    }
    div#tv {
        top: calc(50vh - 275px);
        left: calc(50vw - 400px);
        height: 370px;
        width: 740px;
        position: relative;
        font-family: "Orbitron", sans-serif;
        font-weight: bold;
        border: 25px #000000 solid;
        background-color: grey;
        overflow-y: hidden;
        box-shadow: 5px 5px 10px 5px #00000066,
            5px 10px 15px 5px #00000066 inset;
    }

    div#channel-number {
        right: 0;
        top: 0;
        position: absolute;
        font-size: 20px;
        color: #ffffff;
        padding: 20px 50px;
    }
    div#volume {
        left: 0;
        bottom: 0;
        display: flex;
        position: absolute;
        color: white;
        padding: 20px 50px;
    }
</style>
