<script lang="ts">
    import { Button, FileInput } from '$lib/components/ui'
	import axios from 'axios';
    import { JSONEditor } from 'svelte-jsoneditor'
    let content = {
       text: "{}" 
    };

    let mapFile: FileList;
    let srcFile: FileList;
    
    let progress: number;

    const submitFile = async(file: File) => {

        const formData: any = new FormData();
        formData.append('file', file)
        const { data } = await axios.post('http://localhost:3000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            }, 
            onUploadProgress: (data: any) => {
            progress = Math.round((100 * data.loaded) / data.total);
         }});
        return data;
          
    }

    const submitHandler= async() => {
        const map = await submitFile(mapFile[0]);
        const src = await submitFile(srcFile[0]);
        const { data } = await axios.post("http://localhost:3000/api/transform-json", {
            src: src.filename,
            map: map.filename 
        });
        content = {text: JSON.stringify(data) };
    }
</script>

<div class="mainContainer">

        <form class="form">
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
                <FileInput bind:files={mapFile} />

            </section>

            <section>
                <h2>
                    Enter Source JSON:
                </h2>
                <FileInput bind:files={srcFile} />
            </section>

            <Button onClick={submitHandler} size={'large'} label="Get target JSON!" />
        </form>

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

    form {
        width: 40%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        gap: 2rem;
        display: flex;
        align-items: center;
        flex-direction: column;
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
        gap: 1rem;
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
