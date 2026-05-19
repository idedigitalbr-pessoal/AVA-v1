import { apiClient } from '../api-client';
import { ENDPOINTS } from '../endpoints';
import { BlogPost, BlogCategory } from '@/types';
import { mockBlogPosts, mockBlogCategories } from '@/mocks/public-blog.mock';

export const publicBlogService = {
  getPosts: async (): Promise<BlogPost[]> => {
    // return apiClient.get(ENDPOINTS.PUBLIC_BLOG.POSTS);
    return new Promise(resolve => setTimeout(() => resolve(mockBlogPosts.filter(p => p.status === 'PUBLISHED')), 500));
  },

  getFeaturedPosts: async (): Promise<BlogPost[]> => {
    // return apiClient.get(ENDPOINTS.PUBLIC_BLOG.POSTS + '?featured=true');
    return new Promise(resolve => setTimeout(() => resolve(mockBlogPosts.filter(p => p.status === 'PUBLISHED' && p.isFeatured)), 500));
  },

  getPostBySlug: async (slug: string): Promise<BlogPost> => {
    // return apiClient.get(ENDPOINTS.PUBLIC_BLOG.POST_DETAIL(slug));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const post = mockBlogPosts.find(p => p.slug === slug);
        if (post) resolve(post);
        else reject(new Error('Post not found'));
      }, 500);
    });
  },

  getCategories: async (): Promise<BlogCategory[]> => {
    // return apiClient.get(ENDPOINTS.PUBLIC_BLOG.CATEGORIES);
    return new Promise(resolve => setTimeout(() => resolve(mockBlogCategories), 500));
  }
};
