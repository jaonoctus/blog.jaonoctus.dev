<script setup lang="ts">
const { data: posts } = await useAsyncData('posts', () =>
  queryCollection('content').order('date', 'DESC').all()
)

useSeoMeta({
  title: "@jaonoctus' blog",
  description: 'Tenho medo de falar que faço programa e as pessoas pensarem que entendo de computação.'
})
</script>

<template>
  <div>
    <p class="intro">Tenho medo de falar que faço programa e as pessoas pensarem que entendo de computação.</p>

    <section class="post-list">
      <article v-for="post in posts" :key="post.path" class="post-item">
        <NuxtLink :to="post.path">
          <h2>{{ post.title }}</h2>
          <p v-if="post.description" class="excerpt">{{ post.description }}</p>
          <time v-if="post.date" class="meta">{{ formatDate(post.date) }}</time>
        </NuxtLink>
      </article>
    </section>
  </div>
</template>
