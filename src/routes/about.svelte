<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch("about.json");
    const data = await res.json();
    if (res.status === 200) {
      return {
        bioEntry: data
      };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import TECH_TAGS from "../constants/tags";
  export let bioEntry;
  const profileImage = bioEntry.profileImage.fields;
  const tags = TECH_TAGS;
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
        <img src={profileImage.file.url} alt={profileImage.title} />
      </div>
      <h1 class="title">About Me</h1>
      <p>{bioEntry.bio}</p>
    </div>
  </div>
  <div class="contact-info">
    <h1 class="is-size-4">Lets have a coffee</h1>
    <p>- af.osorio1341@gmail.com</p>
  </div>
  <p class="is-size-6">* A virtual coffee works this days *</p>
</div>
