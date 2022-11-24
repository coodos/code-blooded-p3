<script lang="ts">
	import { Button } from "$lib/components/ui"

	export let files: FileList; 
	let inputButton: any;

	const onClick = () => {
		inputButton.click()
	}
</script>

<Button variant="secondary" label="Select File" {onClick} />
<input class="fileInput" type="file" bind:this={inputButton} bind:files={files}>

{#if files && files[0]}
	<p>
		{files[0].name}
	</p>
{/if}

<style>
	.fileInput {
		display: none;
	}
	p {
		margin: 0 0;
		color: var(--header-bg) ;
	}

	.fileInput:hover::before {
		cursor: pointer;
		background-color: var(--secondary-hover);
	}

</style>