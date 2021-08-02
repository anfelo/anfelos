<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/work.json');

    if (res.ok) {
      const workEntries = await res.json();

      return {
        props: { workEntries }
      };
    }

    const { message } = await res.json();

    return {
      error: new Error(message)
    };
  };
</script>

<script lang="ts">
  import CardList from '$lib/components/cards/CardList.svelte';
  export let workEntries;
  let type = 'website';
  $: filteredEntries = workEntries.filter(entry => entry.type === type);
  function changeType(newType: string) {
    if (newType === type) return;
    type = newType;
  }
</script>

<style>
</style>

<svelte:head>
  <title>anfelos - work</title>
</svelte:head>

<div class="container">
  <h1 class="title">My Work</h1>
  <div class="tabs is-centered">
    <ul>
      <li class={type === 'website' ? 'is-active' : ''}>
        <a on:click={() => changeType('website')}>websites</a>
      </li>
      <li class={type === 'webapp' ? 'is-active' : ''}>
        <a on:click={() => changeType('webapp')}>webapps</a>
      </li>
      <li class={type === 'api' ? 'is-active' : ''}>
        <a on:click={() => changeType('api')}>apis</a>
      </li>
      <li class={type === 'otherstuff' ? 'is-active' : ''}>
        <a on:click={() => changeType('otherstuff')}>other stuff</a>
      </li>
    </ul>
  </div>
  <div class="tab-content">
    <CardList entries={filteredEntries} />
  </div>
</div>
