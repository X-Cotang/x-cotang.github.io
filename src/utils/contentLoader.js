import { marked } from 'marked'

// Function to get all blog posts
export async function loadBlogPosts() {
  const posts = []
  const categoriesMap = {}

  try {
    // Import all markdown files from the content/blog directory
    const modules = import.meta.glob('/src/content/blog/**/*.md', {
      eager: true,
      query: '?raw',
      import: 'default',
    })

    for (const path in modules) {
      const content = modules[path]

      // Extract frontmatter manually
      const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/)
      if (!frontmatterMatch) {
        continue
      }

      const frontmatter = frontmatterMatch[1]

      const data = {}
      frontmatter.split('\n').forEach((line) => {
        const [key, ...valueParts] = line.split(':')
        if (key && valueParts.length) {
          const value = valueParts.join(':').trim()
          try {
            data[key.trim()] = JSON.parse(value)
          } catch {
            data[key.trim()] = value
          }
        }
      })

      // Create slug from path (remove .md extension and src/content/blog prefix)
      const slug = path.replace('/src/content/blog/', '').replace('.md', '').replace(/\//g, '-')

      // Get the markdown content (everything after frontmatter)
      const markdownContent = content.slice(frontmatterMatch[0].length).trim()

      // Build post object with all metadata
      const postData = {
        ...data,
        slug,
        content: marked(markdownContent),
        path: path,
      }

      posts.push(postData)

      // Build category and subcategory structure
      if (!categoriesMap[postData.category]) {
        categoriesMap[postData.category] = {
          id: postData.category,
          name: capitalizeFirstLetter(postData.category),
          subCategories: new Set(),
        }
      }

      if (postData.subCategory) {
        categoriesMap[postData.category].subCategories.add(postData.subCategory)
      }
    }

    // Convert subCategories sets to arrays
    const categories = Object.values(categoriesMap).map((category) => ({
      ...category,
      subCategories: Array.from(category.subCategories).map(capitalizeFirstLetter).sort(),
    }))

    // Add 'All' category
    categories.unshift({
      id: 'all',
      name: 'All',
      subCategories: [],
    })

    return {
      posts,
      categories,
    }
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return {
      posts: [],
      categories: [],
    }
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
