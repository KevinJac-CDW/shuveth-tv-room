<script>
	// INFO: style import
	import "./styles.css";
	// INFO: imported required components
	import Television from "../components/Television/+page.svelte";
	import Controls from "../components/Controls/+page.svelte";
	import MainSwitch from "../components/Switch/+page.svelte";
	// INFO: imported background ambient noise (optional)
	import thunderstorm from "$lib/audio/thunderstorm.mp3";
	// INFO: tvState maintained on centralized store
	import { tvState } from "../stores/tvStore";
	// INFO: data has the videos that comes in from static content loading
	export let data;
</script>

<!-- INFO: heading of the Page -->
<svelte:head>
	<title>My TV Room!</title>
	<meta name="description" content="My TV room" />
</svelte:head>

<section id="room">
	<!-- INFO: Television component mounted on wall -->
	<Television videos={data.videos} />
	<!-- INFO: swtich to turn on/ off the TV -->
	<MainSwitch />
	<!-- INFO: if power is on, TV controls would appear -->
	{#if $tvState.power}
		<Controls />
	{/if}
	<!-- INFO: ambient noise in the room to make it more realistic -->
	<audio autoplay loop volume={0.1}>
		<source src={thunderstorm} type="audio/mpeg" />
	</audio>
</section>

 <!-- INFO: styling section  -->
<style>
	section {
		width: 100vw;
		height: 100vh;
		position: absolute;
		background-image: url("../lib/images/background.png");
		background-size: 100vw 100vh;
		background-attachment: fixed;
	}
</style>
