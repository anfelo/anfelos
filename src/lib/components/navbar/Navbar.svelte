<script lang="ts">
  import { theme } from "$lib/store/stores";
  import { page } from '$app/stores';
  export let isDark = true;
  let isNavbarOpen = false;
  function handleBurgerClick(e) {
    e.preventDefault();
    isNavbarOpen = !isNavbarOpen;
  }
  function handleThemeChange(e, value) {
    e.preventDefault();
    theme.update(v => value);
  }
</script>

<style lang="scss">
  @import "../../styles/theme.scss";
  .navbar-item {
    text-decoration: none;
    padding: 1em 0.5em 0;
    display: block;
  }
  .navbar-item.active::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: $primary;
    display: block;
    bottom: -1px;
  }
  .navbar-brand .navbar-item {
    display: flex;
    min-width: 120px;
  }
  .navbar-brand .navbar-item span {
    margin-left: 5px;
    font-family: menlo, inconsolata, monospace;
    font-weight: bold;
  }
  .navbar-icon {
    width: 25px;
    margin: auto;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    .navbar-item {
      text-align: center;
    }
    .navbar-item.active::after {
      display: none;
    }
  }
</style>

<div class="container">
  <nav
    class={`navbar ${isDark ? 'is-dark' : ''}`}
    role="navigation"
    aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="/img/logo-orange.svg" height="28" alt="Anfelo Logo" />
        <span>anfelos</span>
      </a>

      <a
        href="."
        role="button"
        class={`navbar-burger burger ${isNavbarOpen ? 'is-active' : ''}`}
        aria-label="menu"
        aria-expanded="false"
        data-target="mainNavbar"
        on:click={handleBurgerClick}>
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div
      id="mainNavbar"
      class={`navbar-menu ${isNavbarOpen ? 'is-active' : ''}`}>
      <div class="navbar-end">
        <a
          class="navbar-item"
          class:active={$page.path === '/'}
          href="/">
          home
        </a>
        <a
          class="navbar-item"
          sveltekit:prefetch
          class:active={$page.path === '/about'}
          href="/about">
          about
        </a>
        <a
          class="navbar-item"
          sveltekit:prefetch
          class:active={$page.path === '/work'}
          href="/work">
          work
        </a>
        <a
          class="navbar-item"
          sveltekit:prefetch
          class:active={$page.path === '/blog'}
          href="/blog">
          blog
        </a>
        <div class="navbar-item has-dropdown is-hoverable">
          <div class="navbar-icon">
            <img
              src={`/img/${isDark ? 'switches-dark.png' : 'switches-light.png'}`}
              alt="" />
          </div>
          <div class="navbar-dropdown">
            <a
              href="."
              on:click={e => handleThemeChange(e, 'dark-theme')}
              class="navbar-item">
              dark
            </a>
            <a
              href="."
              on:click={e => handleThemeChange(e, 'light-theme')}
              class="navbar-item">
              light
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</div>