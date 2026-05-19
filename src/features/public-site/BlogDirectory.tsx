'use client';

import { useState, useMemo } from 'react';
import { BlogPost, BlogCategory } from '@/types/public-blog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, User, Calendar, Tag as TagIcon } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';

export function BlogDirectory({
  initialPosts,
  categories
}: {
  initialPosts: BlogPost[];
  categories: BlogCategory[];
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  
  const allTags = Array.from(new Set(initialPosts.flatMap(p => p.tags || [])));
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter(post => {
      const matchSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = activeCategory === 'ALL' || post.categoryId === activeCategory;
      const matchTag = activeTag === null || post.tags.includes(activeTag);
      
      return matchSearch && matchCategory && matchTag;
    });
  }, [initialPosts, searchTerm, activeCategory, activeTag]);

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const regularPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <div className="w-full md:w-64 flex-shrink-0 space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-900">Buscar no Blog</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Pesquisar artigos..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-900">Categorias</label>
              <ul className="space-y-2">
                <li>
                  <button 
                    className={`text-sm w-full text-left px-2 py-1.5 rounded-md transition-colors ${activeCategory === 'ALL' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                    onClick={() => setActiveCategory('ALL')}
                  >
                    Todas as Categorias
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <button 
                      className={`text-sm w-full text-left px-2 py-1.5 rounded-md transition-colors ${activeCategory === cat.id ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                      onClick={() => setActiveCategory(cat.id)}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-900">Tags Populares</label>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 15).map(tag => (
                  <Badge 
                    key={tag} 
                    variant={activeTag === tag ? "default" : "outline"}
                    className={`cursor-pointer ${activeTag === tag ? 'bg-indigo-600' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog List */}
      <div className="flex-1">
        {filteredPosts.length === 0 ? (
          <div className="bg-white p-12 rounded-lg border border-dashed border-gray-300 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum post encontrado</h3>
            <p className="text-gray-500 mb-4">Tente buscar por outros termos ou limpar os filtros.</p>
            <Button onClick={() => { setSearchTerm(''); setActiveCategory('ALL'); setActiveTag(null); }}>
              Limpar Filtros
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Featured Post */}
            {featuredPost && (
              <Card className="overflow-hidden border-0 shadow-md ring-1 ring-gray-200 p-0 sm:flex sm:flex-col lg:flex-row hover:shadow-lg transition-shadow group">
                <Link href={`/blog/${featuredPost.slug}`} className="lg:w-1/2 block aspect-video lg:aspect-auto overflow-hidden relative">
                  <Image 
                    src={featuredPost.coverImageUrl || 'https://picsum.photos/seed/featured/800/600'} 
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-indigo-600">{categories.find(c => c.id === featuredPost.categoryId)?.name || 'Blog'}</Badge>
                  </div>
                </Link>
                <div className="p-6 sm:p-8 lg:w-1/2 flex flex-col justify-center bg-white">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(featuredPost.publishedAt).toLocaleDateString('pt-BR')}</span>
                    <span className="flex items-center gap-1"><User className="w-4 h-4" /> {featuredPost.authorName}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4 line-clamp-3">
                    <Link href={`/blog/${featuredPost.slug}`} className="hover:text-indigo-600">
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                  <Button asChild className="w-max bg-indigo-600 hover:bg-indigo-700">
                    <Link href={`/blog/${featuredPost.slug}`}>Ler Artigo Completo</Link>
                  </Button>
                </div>
              </Card>
            )}

            {/* Grid Posts */}
            {regularPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {regularPosts.map(post => (
                  <Card key={post.id} className="flex flex-col overflow-hidden border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
                    <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden">
                      <Image 
                        src={post.coverImageUrl || `https://picsum.photos/seed/${post.id}/600/400`} 
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-white/90 text-indigo-700 hover:bg-white">{categories.find(c => c.id === post.categoryId)?.name || 'Categoria'}</Badge>
                      </div>
                    </Link>
                    <CardHeader className="pb-3 flex-none">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 leading-tight line-clamp-2">
                        <Link href={`/blog/${post.slug}`} className="hover:text-indigo-600">
                          {post.title}
                        </Link>
                      </h3>
                    </CardHeader>
                    <CardContent className="flex-1 pb-4">
                      <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="pt-0 justify-between items-center bg-gray-50 mt-auto rounded-b-xl border-t">
                      <div className="flex items-center gap-2 py-3">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">
                          {post.authorName.charAt(0)}
                        </div>
                        <span className="text-xs font-medium text-gray-700">{post.authorName}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">Ler mais &rarr;</Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
