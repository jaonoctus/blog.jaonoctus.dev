import type { NitroApp } from 'nitropack'
import { useRuntimeConfig } from '#imports'

// nuxt-feedme maps each content item's `link` to its Nuxt Content `path`,
// which is relative (e.g. "/"). RSS readers need absolute URLs, so prepend
// the configured site origin here.
//
// Note: the `replace: [[/^(?=\/)/.toString(), baseUrl]]` trick from the
// nuxt-feedme README does NOT work in v2.1.0 — the serialized RegExp is fed
// to String.match/String.replace as a literal string and never matches.
// This hook is the reliable, supported way to rewrite item fields.
export default (nitroApp: NitroApp) => {
  const feed = useRuntimeConfig().public?.feedme?.feeds?.common?.feed
  const origin = String(feed?.link ?? '').replace(/\/+$/, '')

  nitroApp.hooks.hook('feedme:handle:content:item', ({ item: { get, set } }) => {
    const item = get()
    if (!item || !origin) return

    const link = typeof item.link === 'string' && item.link.startsWith('/')
      ? origin + item.link
      : item.link

    set({
      ...item,
      link,
      // Use the absolute URL as a stable, permalink-style guid.
      id: typeof link === 'string' ? link : item.id
    })
  })
}
