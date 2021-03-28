<script>
    import Header from '../components/header/Header.svelte';
    import Footer from "../components/footer/Footer.svelte";
    import Challenge from "../components/challenge/Challenge.svelte";

    const getDefaultObjectOfChallenge = () => {
        return {
            title: null,
            image: {
                path: null,
                type: null,
                total: null,
            }
        }
    }

    let challenges = [];

    const challengeVI = getDefaultObjectOfChallenge();
    challengeVI.title = 'Challenge - VI';
    challengeVI.image.path = 'images_challenge_VI';
    challengeVI.image.type = '.jpg';
    challengeVI.image.total = 21;

    const challengeVII = getDefaultObjectOfChallenge();
    challengeVII.title = 'Challenge - VII';
    challengeVII.image.path = 'images_challenge_VII';
    challengeVII.image.type = '.jpeg';
    challengeVII.image.total = 24;

    const challengeLiveArca = getDefaultObjectOfChallenge();
    challengeLiveArca.title = 'Live - A ARCA';
    challengeLiveArca.image.path = 'images_live_arca';
    challengeLiveArca.image.type = '.jpeg';
    challengeLiveArca.image.total = 3;

    const challengeReiSalomao = getDefaultObjectOfChallenge();
    challengeReiSalomao.title = 'Challenge - Rei Salomão';
    challengeReiSalomao.image.path = 'images_challenge_salomao';
    challengeReiSalomao.image.type = '.jpeg';
    challengeReiSalomao.image.total = 64;

    const challengeLegado = getDefaultObjectOfChallenge();
    challengeLegado.title = 'Challenge - O LEGADO';
    challengeLegado.image.path = 'images_challenge_o_legado';
    challengeLegado.image.type = '.jpeg';
    challengeLegado.image.total = 21;

    const challengeArca = getDefaultObjectOfChallenge();
    challengeArca.title = 'Challenge - A Arca';
    challengeArca.image.path = 'images_challenge_arca';
    challengeArca.image.type = '.jpeg';
    challengeArca.image.total = 5;

    challenges.push(challengeArca);
    challenges.push(challengeLegado);
    challenges.push(challengeReiSalomao);
    challenges.push(challengeLiveArca);
    challenges.push(challengeVII);
    challenges.push(challengeVI);

</script>

<Header/>
<Challenge challenges={challenges} />
<Footer/>
