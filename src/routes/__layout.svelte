<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from '$lib/store/stores';
  import * as fromLocalStorage from '$lib/services/local-storage';

  import Navbar from '$lib/components/navbar/Navbar.svelte';
  import Footer from '$lib/components/footer/Footer.svelte';

  let themeValue = 'dark-theme';

  onMount(async () => {
    const unsubscribe = theme.subscribe(value => {
      fromLocalStorage.saveEntry({ key: 'theme', value: value });
      document.body.className = "";
      document.body.classList.add(value);
      themeValue = value;
    });
  });
</script>

<Navbar isDark={themeValue === 'dark-theme'} />

<main class={themeValue === 'dark-theme' ? 'has-background-dark' : ''}>
  <slot />
</main>

<Footer isDark={themeValue === 'dark-theme'} />

<style lang="scss" global>
  @import "../lib/styles/global.scss";
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
