<script lang="ts">
  import TECH_TAGS from '$lib/constants/tags';
  export let size;
  export let entry;
  $: tags = TECH_TAGS.filter(tag =>
    entry.topics.some(topic => topic === tag.name)
  );
  let imageFile = entry.image ? entry.image.fields : null;
</script>

<style>
  .card {
    height: 250px;
  }
  .card-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .tag-list {
    display: flex;
    flex-wrap: wrap;
  }
  .tag-list .tag {
    margin-right: 2px;
    margin-bottom: 2px;
  }
</style>

<div class={`column ${size}`}>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-5">{entry.name}</p>
        </div>
      </div>

      <div class="content is-small">{entry.description}</div>
      <div class="columns">
        <div class="column is-10">
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
          <a href={entry.url} target="_black">
            <span class="icon is-small">
              <i class="fas fa-link" />
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
