import md from './markdown'

// Function to get all blog posts
export async function loadBlogPosts() {
  const posts = []

  try {
    const modules = import.meta.glob('/src/content/blog/**/*.md', {
      eager: true,
      query: '?raw',
      import: 'default',
    })

    for (const path in modules) {
      const content = modules[path]
      const { frontmatter, markdown } = parseFrontmatter(content)

      if (!frontmatter) continue

      const slug = path.replace('/src/content/blog/', '').replace('.md', '').replace(/\//g, '-')

      posts.push({
        ...frontmatter,
        slug,
        content: md.render(markdown),
        path,
      })
    }

    const categories = buildCategoryStructure(posts)
    categories.unshift({ id: 'all', name: 'All', subCategories: [] })

    return { posts, categories }
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return { posts: [], categories: [] }
  }
}

function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/)
  if (!match) return { frontmatter: null, markdown: '' }

  const frontmatter = {}
  match[1].split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim()
      frontmatter[key.trim()] = tryParseJSON(value)
    }
  })

  return {
    frontmatter,
    markdown: content.slice(match[0].length).trim(),
  }
}

function tryParseJSON(value) {
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

// Helper function to capitalize the first letter of each word
function capitalizeFirstLetter(string) {
  return string
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Function to load a single post by slug
export async function loadBlogPost(slug) {
  const { posts } = await loadBlogPosts()
  return posts.find((post) => post.slug === slug)
}

// Function to get recent posts
export async function getRecentPosts(count = 5) {
  const { posts } = await loadBlogPosts()
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, count)
}

// Function to get posts by category
export async function getPostsByCategory(category, count = null) {
  const { posts } = await loadBlogPosts()
  const filteredPosts = posts.filter((post) => category === 'all' || post.category === category)

  const sortedPosts = filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date))

  return count ? sortedPosts.slice(0, count) : sortedPosts
}

// Function to get posts by subcategory
export async function getPostsBySubCategory(category, subCategory, count = null) {
  const { posts } = await loadBlogPosts()
  const filteredPosts = posts.filter(
    (post) => post.category === category && post.subCategory === subCategory,
  )

  const sortedPosts = filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date))

  return count ? sortedPosts.slice(0, count) : sortedPosts
}

function buildCategoryStructure(posts) {
  const categoriesMap = {}

  posts.forEach((post) => {
    if (!categoriesMap[post.category]) {
      categoriesMap[post.category] = {
        id: post.category,
        name: capitalizeFirstLetter(post.category),
        subCategories: new Set(),
      }
    }

    if (post.subCategory) {
      categoriesMap[post.category].subCategories.add(capitalizeFirstLetter(post.subCategory))
    }
  })

  return Object.values(categoriesMap).map((category) => ({
    ...category,
    subCategories: Array.from(category.subCategories).sort(),
  }))
}
