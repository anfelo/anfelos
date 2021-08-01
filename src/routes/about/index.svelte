<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/about.json');

    if (res.ok) {
      const bio = await res.json();

      return {
        props: { bio }
      };
    }

    const { message } = await res.json();

    return {
      error: new Error(message)
    };
  };
</script>

<script lang="ts">
  import tags from '$lib/constants/tags';
  import { loadImage } from '$lib/helpers/utils';

  export let bio;

  async function loadFiles() {
    if (bio.avatarUrl) {
      await loadImage(bio.avatarUrl);
    }
  }

  loadFiles();
</script>

<style>
  .picture-container {
    max-width: 150px;
    float: left;
    margin-right: 15px;
  }
  .picture-container img {
    width: 100%;
  }
  .contact-info h1,
  .contact-info p {
    display: inline;
  }
  .tag-list {
    display: flex;
    flex-wrap: wrap;
  }
  .tag-list .tag {
    margin-right: 2px;
    margin-bottom: 2px;
  }
  @media (max-width: 876px) {
    .picture-container {
      max-width: 50%;
      min-width: 200px;
      margin: auto;
      float: none;
    }
  }
</style>

<svelte:head>
  <title>anfelos - about</title>
</svelte:head>

<div class="container">
  <div class="columns">
    <div class="column is-3">
      <div class="tag-list">
        {#each tags as tag}
          <span
            class="tag"
            style={`color:${tag.color};background-color:${tag.backgroundColor}`}>
            {tag.name}
          </span>
        {/each}
      </div>
    </div>
    <div class="column">
      <div class="picture-container">
        <img src={bio.avatarUrl} alt="Anfelo Profile Pic" />
      </div>
      <h1 class="title">About Me</h1>
      <p>{bio.bio}</p>
    </div>
  </div>
  <div class="contact-info">
    <h1 class="is-size-4">Lets have a coffee</h1>
    <p>- af.osorio1341@gmail.com</p>
  </div>
  <p class="is-size-6">* A virtual coffee works this days *</p>
</div>
