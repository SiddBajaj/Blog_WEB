import type { BlogPost, CreateBlogPostData } from '@/types/blog';

const STORAGE_KEY = 'modern_blog_posts';

export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const saveBlogPosts = (posts: BlogPost[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error('Failed to save blog posts:', error);
  }
};

export const loadBlogPosts = (): BlogPost[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load blog posts:', error);
    return [];
  }
};

export const createBlogPost = (data: CreateBlogPostData): BlogPost => {
  return {
    id: generateId(),
    title: data.title,
    content: data.content,
    createdAt: new Date().toISOString(),
    excerpt: data.content.substring(0, 150) + (data.content.length > 150 ? '...' : ''),
  };
};

export const addBlogPost = (data: CreateBlogPostData): BlogPost[] => {
  const existingPosts = loadBlogPosts();
  const newPost = createBlogPost(data);
  const updatedPosts = [newPost, ...existingPosts];
  saveBlogPosts(updatedPosts);
  return updatedPosts;
};

export const updateBlogPost = (id: string, data: CreateBlogPostData): BlogPost[] => {
  const existingPosts = loadBlogPosts();
  const updatedPosts = existingPosts.map(post => {
    if (post.id === id) {
      return {
        ...post,
        title: data.title,
        content: data.content,
        excerpt: data.content.substring(0, 150) + (data.content.length > 150 ? '...' : '')
      };
    }
    return post;
  });
  saveBlogPosts(updatedPosts);
  return updatedPosts;
};

export const deleteBlogPost = (id: string): BlogPost[] => {
  const existingPosts = loadBlogPosts();
  const updatedPosts = existingPosts.filter(post => post.id !== id);
  saveBlogPosts(updatedPosts);
  return updatedPosts;
};

// Initialize with some sample posts if none exist
export const initializeSamplePosts = (): void => {
  const existingPosts = loadBlogPosts();
  if (existingPosts.length === 0) {
    const samplePosts: BlogPost[] = [
      {
        id: 'sample-1',
        title: 'Welcome to Modern Blog',
        content: `# Welcome to Modern Blog! 🎉

This is your beautiful mini blogging platform built with React and modern design principles.

## Features

- **Markdown Support**: Write posts using Markdown syntax
- **Modern UI**: Clean, professional design with beautiful gradients
- **Responsive**: Looks great on all devices
- **Local Storage**: Your posts are saved in your browser

## Getting Started

1. Click "Write Post" to create your first blog post
2. Use Markdown syntax for formatting
3. Publish and share your thoughts!

## Markdown Examples

You can use various markdown features:

- **Bold text**
- *Italic text*
- [Links](https://example.com)
- Lists (like this one!)

### Code Blocks

\`\`\`javascript
console.log('Hello, Modern Blog!');
\`\`\`

> This is a blockquote for important information.

Happy blogging! ✨`,
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        excerpt: 'Welcome to your beautiful mini blogging platform built with React and modern design principles...',
      },
      {
        id: 'sample-2',
        title: 'The Power of Markdown',
        content: `# The Power of Markdown

Markdown is a lightweight markup language that's perfect for blogging. Here's why it's amazing:

## Why Markdown?

1. **Simple**: Easy to learn and write
2. **Readable**: Looks good even in plain text
3. **Portable**: Works everywhere
4. **Fast**: Quick to type and format

## Common Syntax

### Headers
Use # for headers (# H1, ## H2, ### H3)

### Emphasis
- *Italic* with single asterisks
- **Bold** with double asterisks
- ~~Strikethrough~~ with tildes

### Lists
Unordered lists with dashes:
- Item one
- Item two
- Item three

Ordered lists with numbers:
1. First item
2. Second item
3. Third item

### Code
Inline code with \`backticks\` or code blocks:

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

### Links and Images
[Link text](https://example.com)

Start writing your own markdown content and see the magic happen! ✨`,
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        excerpt: 'Markdown is a lightweight markup language that\'s perfect for blogging. Here\'s why it\'s amazing...',
      }
    ];
    
    saveBlogPosts(samplePosts);
  }
};