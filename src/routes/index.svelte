<script lang="ts">
  import Orbits from '$lib/components/orbits/Orbits.svelte';
</script>

<style>
  .hero {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
</style>

<svelte:head>
  <title>anfelos - home</title>
</svelte:head>

<div class="container">
  <section class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">Andres Osorio</h1>
        <p class="subtitle">Entrepreneur ● Software Engineer ● Home Barista</p>
        <a rel="prefetch" href="about" class="button button-callout is-link">
          lets have a coffee
        </a>
      </div>
    </div>
  </section>
  <Orbits />
</div>
