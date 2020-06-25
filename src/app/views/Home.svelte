<script>
    import Header from '../components/header/Header.svelte';
    import ImageBoxChallengeVI from '../components/imageBox/ImageBoxChallengeVI.svelte';
    import ImageBoxChallengeVII from '../components/imageBox/ImageBoxChallengeVII.svelte';
    import Footer from "../components/footer/Footer.svelte";
</script>

<Header/>
<div class="md:max-w-screen-lg max-w-screen-md contents">
    <div class="flex flex-row items-center justify-center font-Righteous text-rc-v2-orange w-full mt-8">
        <div class="text-2xl md:text-4xl uppercase">Challenge - VI</div>
    </div>
    <ImageBoxChallengeVI/>
    <div class="flex flex-row items-center justify-center font-Righteous text-rc-v2-orange w-full my-8">
        <div class="text-2xl md:text-4xl uppercase">Challenge - VII</div>
    </div>
    <ImageBoxChallengeVII/>
</div>
<Footer/>
