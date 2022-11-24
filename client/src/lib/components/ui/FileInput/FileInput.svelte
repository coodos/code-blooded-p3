<script lang="ts">
	let files: any;
</script>

<input class="fileInput" type="file" bind:files>

{#if files && files[0]}
	<p>
		{files[0].name}
	</p>
{/if}

<style>
	.fileInput {
		visibility: hidden;
	}
	.fileInput::before {
		visibility: visible;
		display: inline-block;
		white-space: nowrap;
		cursor: pointer;
		background-color: var(--secondary);
		padding: 8px 16px;
		color: var(--secondary-alt);
		border: 0;
		transition: all 0.5s;
		border-radius: 5px;
		font-size: 1rem;
		outline: none;
		content: 'Choose File!';
		transform: translateX(50%);
	}

	.fileInput:hover::before {
		cursor: pointer;
		background-color: var(--secondary-hover);
	}

</style>