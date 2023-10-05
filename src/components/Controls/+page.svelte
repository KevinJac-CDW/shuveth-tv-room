<script>
    // INFO: importing centralized tvState
    import { tvState } from "../../stores/tvStore";

    /**
     * @name onIncrement
     * @params param<String> ["volume", "channel"]
     * @author Shuvethram Ayyasamy Ragupathy
     * @date 4th wednesday 2023
     * @description increments the specified param
     */
    const onIncrement = (param = "volume") => {
        $tvState.detailsVisible = true;
        // INFO: if params is volume and volume is not greater that one (max)
        if (param === "volume" && $tvState.volume < 1) {
            // INFO: increment the volume by 0.02 and round it to 2 decimals (to get 50 dicibels)
            $tvState.volume = Number(($tvState.volume + 0.02).toFixed(2));
            // INFO: else if param is channel and channel number is less that 49 (max)
        } else if (param === "channel") {
            // INFO: increment the channel number by one
            $tvState.channelNumber = ($tvState.channelNumber + 1) % 50;
        }
    };
    /**
     * @name onDecrement
     * @params param<String> ["volume", "channel"]
     * @author Shuvethram Ayyasamy Ragupathy
     * @date 4th wednesday 2023
     * @description decrements the specified param
     */
    const onDecrement = (param = "volume") => {
        $tvState.detailsVisible = true;
        // INFO: if params is volume and volume is greater that zero (min)
        if (param === "volume" && $tvState.volume > 0) {
            // INFO: decrement the volume by 0.02 and round it to 2 decimals (to get 50 dicibels)
            $tvState.volume = Number(($tvState.volume - 0.02).toFixed(2));
            // INFO: else if param is channel and channel number is greater that 0 (min)
        } else if (param === "channel" ) {
            if($tvState.channelNumber === 0) {
                $tvState.channelNumber = 49;
                return;
            }
            // INFO: decrement the channel number by one
            $tvState.channelNumber = $tvState.channelNumber - 1;
        }
    };
</script>

<!-- INFO: mark up stays here! -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="control-wrapper" on:mouseenter={(e) => {
    console.log(e)
}} on:mouseleave={(e) => {
    console.log(e)
}}></div>
<div id="control-system">
    <!-- INFO: Volume Control -->
    <div class="control-switch" id="volume-control">
        <p>VOL</p>
        <div>
            <!-- INFO: Increases Volume Control -->
            <button on:click={() => onIncrement("volume")}>+</button>
            <!-- INFO: Decreases Volume Control -->
            <button on:click={() => onDecrement("volume")}>-</button>
        </div>
    </div>
    <!-- INFO: Program Control -->
    <div class="control-switch" id="program-control">
        <p>PGM</p>
        <div>
            <!-- INFO: Increases Program value -->
            <button on:click={() => onIncrement("channel")}>+</button>
            <!-- INFO: Decreases Program value -->
            <button on:click={() => onDecrement("channel")}>-</button>
        </div>
    </div>
</div>

<style>
    /* INFO: styles go here */
    #control-wrapper {
        width: 300px;
        height: 300px;
        bottom: 180px;
        left: 52px;
        position: absolute;
    }
    #control-system {
        bottom: 240px;
        left: 120px;
        position: absolute;
        display: flex;
        display: flex;
        flex-direction: row;
        gap: 30px;
    }

    .control-switch {
        text-align: center;
        padding: 10px 10px;
        border-right: 2px #00000033 solid;
        border-bottom: 2px #00000033 solid;
        background-color: #ffffff;
    }
    .control-switch > p {
        color: #848484;
        margin: 0 0 20px;
    }

    .control-switch div {
        display: flex;
        flex-direction: column;
    }

    .control-switch div button {
        font-size: 42px;
        color: #848484;
        cursor: pointer;
        border: 0;
        outline: none;
        background-color: transparent;
    }
</style>
