import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'
import { loadBlogPosts } from '../src/utils/contentLoader'

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: 'https://x-cotang.github.io/' })

  // Add static routes
  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 })
  sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.8 })
  sitemap.write({ url: '/blog', changefreq: 'daily', priority: 0.9 })

  // Add blog posts
  const { posts } = await loadBlogPosts()
  posts.forEach((post) => {
    sitemap.write({
      url: `/blog/${post.slug}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: post.date,
    })
  })

  sitemap.end()

  // Write sitemap to file
  const sitemapXML = await streamToPromise(sitemap)
  createWriteStream('./public/sitemap.xml').write(sitemapXML.toString())
}

generateSitemap()
