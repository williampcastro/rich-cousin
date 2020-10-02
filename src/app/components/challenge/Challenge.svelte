<script>
    import ImageBox from '../imageBox/ImageBox.svelte';
    import TitleChallenge from '../titleChallange/TitleChallenge.svelte';

    export let challenges;

</script>


<div class="md:max-w-screen-lg max-w-screen-md contents">

    {#each challenges as challenge}
        <TitleChallenge title={challenge.title}/>
        <ImageBox path={challenge.image.path}
                  typeImage={challenge.image.type}
                  totalImages={challenge.image.total}/>
    {/each}

</div>
