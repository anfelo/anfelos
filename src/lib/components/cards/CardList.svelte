<script>
  import Card from './Card.svelte';
  export let entries;
</script>

<style>
  .card-list {
    display: flex;
    flex-wrap: wrap;
  }
</style>

<div class="card-list">
  {#each entries as entry}
    <Card size="is-4" {entry} />
  {/each}
</div>
