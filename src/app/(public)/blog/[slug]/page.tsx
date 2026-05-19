import { publicBlogService } from '@/lib/api/services/public-blog.service';
import { publicSiteService } from '@/lib/api/services/public-site.service';
import { notFound } from 'next/navigation';
import { PublicHeader } from '@/features/public-site/PublicHeader';
import { PublicFooter } from '@/features/public-site/PublicFooter';
import { BlogDetail } from '@/features/public-site/BlogDetail';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await params;
  try {
    const post = await publicBlogService.getPostBySlug(p.slug);
    return {
      title: post.seoTitle || `${post.title} - Blog AVA Acadêmica`,
      description: post.seoDescription || post.excerpt,
    };
  } catch (error) {
    return {
      title: 'Post não encontrado',
    };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  
  let post, settings, menuItems, relatedPosts, allCategories;
  try {
    const data = await Promise.all([
      publicBlogService.getPostBySlug(p.slug),
      publicSiteService.getSettings(),
      publicSiteService.getMenu(),
      publicBlogService.getPosts(),
      publicBlogService.getCategories(),
    ]);
    post = data[0];
    settings = data[1];
    menuItems = data[2];
    
    // Simple logic for related posts: same category, excluding current
    relatedPosts = data[3].filter(item => item.categoryId === post.categoryId && item.id !== post.id).slice(0, 3);
    allCategories = data[4];
  } catch (error) {
    notFound();
  }

  // Find category name
  const category = allCategories?.find((c: {id: string; name: string}) => c.id === post.categoryId)?.name || 'Blog';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PublicHeader settings={settings} menuItems={menuItems} />
      
      <main className="flex-1">
        <BlogDetail post={post} categoryName={category} relatedPosts={relatedPosts} />
      </main>
      
      <PublicFooter settings={settings} />
    </div>
  );
}
