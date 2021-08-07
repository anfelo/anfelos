<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ fetch, page }) => {
    const url = `/blog/${page.params.slug}.json`;
    const res = await fetch(url);

    if (res.ok) {
      const post = await res.json();

      return {
        props: { post }
      };
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`)
    };
  };
</script>

<script>
  import * as fromParsers from '$lib/helpers/parsers';
  import Markdown from '$lib/components/markdown/Markdown.svelte';

  export let post;
</script>

<style>
  .article {
    margin-bottom: 25px;
  }
  .article .article-date {
    text-transform: uppercase;
    font-size: 0.8em;
    font-weight: bold;
  }
  .topics-list {
    display: flex;
    margin: 0;
    list-style: none;
    align-items: center;
  }
  .topics-list .topic-img {
    width: 20px;
    margin: 0 5px 0 0;
  }
  .topic-img img {
    width: 100%;
  }
</style>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<div class="container">
  <div class="article">
    <ul class="topics-list">
      {#each post.topics as topic}
        <li key={topic} class="topic-img">
          <img src={`/img/${topic}.svg`} alt="" />
        </li>
      {/each}
    </ul>
    <span class="article-date">{fromParsers.parseDate(post.publishedOn)}</span>
    <h2 class="article-title title">{post.title}</h2>
    <div class="article-content">
      <Markdown markdown={post.content} />
    </div>
  </div>
</div>
