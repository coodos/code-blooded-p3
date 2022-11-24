<script lang="ts">
    import { Button } from '$lib/components/ui'
    import { JSONEditor } from 'svelte-jsoneditor'
	import FileInput from '$lib/components/ui/FileInput/FileInput.svelte';
    let content = {
        text: JSON.stringify({
            array: [1, 2, 3],
            bool: true,
            object: {
            foo: 'bar',
            },
        })
    };
    
    let mapFile: any;
    let sourceFile: any;

    const submitHandler = () => {
        return
    }
</script>

<div class="mainContainer">
    <div class="form">
        <form>
            <h2 class="team-name">
                The Grind's 
            </h2>
            <h1 class="">
                Awesome JSON Transformer
            </h1>
            <section>

                <h2>
                    Enter Mapping:
                </h2>
                <FileInput bind:value={mapFile} />

            </section>

            <section>
                <h2>
                    Enter Source JSON:
                </h2>
                <FileInput bind:value={sourceFile} />
            </section>

            <Button onClick={submitHandler} size={'large'} label="Get target JSON!" />
        </form>

    </div>
    <div class="jsonView jse-theme-dark">
        <JSONEditor bind:content />
    </div>
</div>

<style>
    @import 'svelte-jsoneditor/themes/jse-theme-dark.css';
    .mainContainer {
        display: flex;
        width: 100vw;
        height: 100vh;
        cursor: default;
    }
    .form {
        width: 40%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 1rem;
        gap: 2rem;
    }

    form {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 5vh;
    }

    h1 {
        text-align: center;
    }
    .team-name:hover {
        background: linear-gradient(to right,var(--primary), var(--primary-hover));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    section {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 5vh;
    }

    .jsonView {
        padding: 10px;
        box-sizing: border-box;
        
        width: 60%;
        height: 100%;
        background: var(--backdrop);
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 0 1rem var(--backdrop);
    }
</style>
