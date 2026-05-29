<template>
  <div class="site">
    <header class="site-header">
      <NuxtLink to="/" class="brand">@jaonoctus' blog</NuxtLink>
      <nav class="site-nav">
        <a href="https://jaonoctus.dev" class="nav-link">About</a>
        <a href="/feed.xml" class="nav-link rss">RSS</a>
      </nav>
    </header>

    <main class="site-main">
      <slot />
    </main>

    <footer class="site-footer">
      <a
        href="https://commons.wikimedia.org/wiki/File:Copying_is_not_theft.ogv"
        target="_blank"
        rel="noopener noreferrer"
      >Copying is not theft</a>
      <span class="footer-license">
        This work is licensed under <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="license noopener noreferrer"
        >CC BY 4.0</a>.
      </span>
    </footer>
  </div>
</template>
