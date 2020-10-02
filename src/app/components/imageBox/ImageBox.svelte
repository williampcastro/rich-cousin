<script>
    import jQuery from 'jquery';
    export let path;
    export let typeImage;
    export let totalImages;
    let basePath = './images/' + path + '/';
    let imageNames = [ ...Array (totalImages).keys () ];

    function handleClick (){
        jQuery('.parent-div').magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery:{
                enabled:true
            }
        });
    }

</script>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 md:p-8 parent-div">
    {#each imageNames as imageName}
        <a on:click={handleClick} href="{basePath}{imageName}{typeImage}" class="m-4 justify-self-center shadow-bottom h-026 w-018">
            <div class="hover:shadow-2xl h-full" style="background-image:url({basePath}{imageName}{typeImage}); background-size: cover;"></div>
        </a>
    {/each}
</div>
