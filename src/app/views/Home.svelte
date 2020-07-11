<script>
    import Header from '../components/header/Header.svelte';
    import ImageBox from '../components/imageBox/ImageBox.svelte';
    import TitleChallenge from '../components/titleChallange/titleChallenge.svelte';
    import Footer from "../components/footer/Footer.svelte";
</script>

<Header/>
<div class="md:max-w-screen-lg max-w-screen-md contents">

    <TitleChallenge title={'Challenge - Rei Salomão'}/>
    <ImageBox path={'images_challenge_salomao'}
              typeImage={'.jpeg'}
              totalImages={23}/>

    <TitleChallenge title={'Challenge - A Arca'}/>
    <ImageBox path={'images_challenge_arca'}
              typeImage={'.PNG'}
              totalImages={5}/>

    <TitleChallenge title={'Challenge - VII'}/>
    <ImageBox path={'images_challenge_VII'}
              typeImage={'.jpeg'}
              totalImages={24}/>

    <TitleChallenge title={'Challenge - VI'}/>
    <ImageBox path={'images_challenge_VI'}
              typeImage={'.jpg'}
              totalImages={21}/>

</div>
<Footer/>
