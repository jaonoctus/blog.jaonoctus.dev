<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(`post:${route.path}`, () =>
  queryCollection('content').path(route.path).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

useSeoMeta({
  title: post.value.title,
  description: post.value.description
})
</script>

<template>
  <article v-if="post" class="prose">
    <NuxtLink to="/" class="back">← back</NuxtLink>

    <header class="article-head">
      <h1>{{ post.title }}</h1>
      <time v-if="post.date" class="meta">{{ formatDate(post.date) }}</time>
    </header>

    <ContentRenderer :value="post" />
  </article>
</template>
