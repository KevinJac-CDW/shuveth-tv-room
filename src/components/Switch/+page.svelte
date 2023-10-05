<script>
    // INFO: importing centralized tvState 
    import { tvState } from "../../stores/tvStore";
    // INFO: if power is on, keep the on button active
    let isOnActive = $tvState.power;
    // INFO: reactive statememt when power changes, isOnActive changes accordingly
    $: isOnActive = $tvState.power === true;
</script>

<!-- INFO: markup (zero or more items) goes here -->
<div id="switch-frame">
    <div id="main-switch">
        <!-- INFO: ON Button Component -->
        <button
            id="on"
            class={isOnActive ? "active" : ""}
            on:click={() => {
                $tvState.detailsVisible = true;
                // INFO: on clicked, power ons the TV
                $tvState.booting = true;
                $tvState.power = true;
                setTimeout(() => {
                    $tvState.booting = false;
                }, 3000);
            }}
        >
            ON
        </button>
         <!-- INFO: OFF Button Component -->
        <button
            id="off"
            class={!isOnActive ? "active" : ""}
            on:click={() => {
                // INFO: on clicked, power offs the TV
                $tvState.power = false;
            }}
        >
            OFF
        </button>
    </div>
</div>

<style>
    /* INFO: styles go here */
    #switch-frame {
        bottom: 200px;
        right: 340px;
        position: absolute;
        font-size: 12px;
        padding: 10px 20px;
        border-radius: 5px;
        border-right: 2px #ffffff solid;
        border-bottom: 3px #f5f5f5 solid;
        background-color: #f0ffff;
        box-shadow: 3px 3px 3px #00000044;
    }
    #main-switch {
        display: flex;
        flex-direction: column;
        background-color: #f0ffff;
        border: 1px solid #919191;
    }

    #main-switch button {
        width: 35px;
        height: 30px;
    }

    #on.active , #off.active {
        color: #919191;
    }

    #off:not(.active) {
        border-bottom: 3px solid #00000066;
    }

    #on:not(.active) {
        border-top: 3px solid #00000066;
    }


    #main-switch button {
        cursor: pointer;
        outline: none;
        border: none;
        background-color: transparent;
    }
</style>
