import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      // `title` and `description` come built-in with the `page` type.
      // We add `date` so we can sort posts and emit a feed pubDate.
      schema: z.object({
        date: z.string().optional()
      })
    })
  }
})

