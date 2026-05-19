import { publicBlogService } from '@/lib/api/services/public-blog.service';
import { publicSiteService } from '@/lib/api/services/public-site.service';
import { Metadata } from 'next';
import { PublicHeader } from '@/features/public-site/PublicHeader';
import { PublicFooter } from '@/features/public-site/PublicFooter';
import { BlogDirectory } from '@/features/public-site/BlogDirectory';

export const metadata: Metadata = {
  title: 'Blog - AVA Acadêmica',
  description: 'Notícias, artigos e dicas sobre carreira e educação.',
};

export default async function BlogPage() {
  const [posts, categories, settings, menuItems] = await Promise.all([
    publicBlogService.getPosts(),
    publicBlogService.getCategories(),
    publicSiteService.getSettings(),
    publicSiteService.getMenu()
  ]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PublicHeader settings={settings} menuItems={menuItems} />
      
      <main className="flex-1">
        <div className="bg-indigo-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl tracking-tight">
              Blog e Notícias
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-indigo-100 mx-auto">
              Fique por dentro das novidades do mercado, e-books gratuitos e dicas de carreira.
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <BlogDirectory initialPosts={posts} categories={categories} />
        </div>
      </main>
      
      <PublicFooter settings={settings} />
    </div>
  );
}
