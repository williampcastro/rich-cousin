<script>
    import { version } from '../../../../package.json';
    import { developers } from "../../utils/constants";
    let versionApp = version;
</script>

<footer class="-m-2 inset-x-0 bottom-0 flex justify-center items-center h-12 bg-rc-v2-blue-dark font-Righteous  text-rc-v2-orange">
    Powered By <a class="px-2" target="_blank" href="{developers[0].github}"> @{developers[0].name} </a> And <a class="px-2" target="_blank" href="{developers[1].github}"> @{developers[1].name} </a> - v{versionApp}</footer>
