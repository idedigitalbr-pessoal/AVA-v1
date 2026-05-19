'use client';

import { useState } from 'react';
import { BlogPost } from '@/types/public-blog';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, User, ChevronLeft, Share2, Tag as TagIcon, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { toast } from 'sonner';

export function BlogDetail({ 
  post, 
  categoryName,
  relatedPosts
}: { 
  post: BlogPost; 
  categoryName: string;
  relatedPosts: BlogPost[];
}) {
  const [leadLoading, setLeadLoading] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLeadLoading(true);
    
    // Simulate API Call
    setTimeout(() => {
      toast.success('Obrigado! Entraremos em contato em breve.');
      (e.target as HTMLFormElement).reset();
      setLeadLoading(false);
    }, 1000);
  };

  return (
    <article className="pb-16 pt-8">
      {/* Header / Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="mb-6">
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Voltar para o Blog
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-0 text-sm font-semibold px-3 py-1">
            {categoryName}
          </Badge>
          <span className="text-gray-400 text-sm flex items-center gap-1.5 font-medium">
            <Calendar className="w-4 h-4" />
            {new Date(post.publishedAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
          {post.title}
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 leading-relaxed font-medium">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between border-y border-gray-200 py-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-lg font-bold text-indigo-700">
              {post.authorName.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{post.authorName}</p>
              <p className="text-xs text-gray-500 font-medium">Autor / {new Date(post.publishedAt).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="hidden sm:flex text-gray-600 border-gray-300 hover:bg-gray-50 gap-2 font-semibold">
            <Share2 className="w-4 h-4" />
            Compartilhar
          </Button>
        </div>
      </div>

      {/* Cover Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="aspect-[21/9] relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
          <Image 
            src={post.coverImageUrl || `https://picsum.photos/seed/${post.id}/1200/600`} 
            alt={post.title}
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Content & Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1 lg:max-w-[760px] mx-auto w-full">
          <div 
            className="prose prose-lg prose-indigo max-w-none text-gray-700
              prose-headings:font-bold prose-headings:text-gray-900 
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 
              prose-h3:text-2xl 
              prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-indigo-600 prose-a:font-semibold hover:prose-a:text-indigo-800
              prose-img:rounded-xl prose-img:shadow-md
              prose-strong:text-gray-900 prose-strong:font-bold"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TagIcon className="w-5 h-5 text-gray-400" />
              Tags desta publicação
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 font-medium text-sm">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-[380px] flex-shrink-0 space-y-8 lg:sticky lg:top-24 h-fit">
          {/* Related Course CTA */}
          <Card className="bg-indigo-900 text-white border-0 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            <CardHeader className="relative pb-2">
              <Badge className="bg-indigo-500/30 text-indigo-100 hover:bg-indigo-500/40 w-max mb-3 border border-indigo-400/30">
                Curso Relacionado
              </Badge>
              <CardTitle className="text-2xl font-bold leading-tight">
                Dê o próximo passo na sua carreira
              </CardTitle>
            </CardHeader>
            <CardContent className="relative pt-4 pb-6">
              <p className="text-indigo-100 mb-6 text-sm leading-relaxed">
                Aprofunde seus conhecimentos com nosso curso de pós-graduação estruturado pelos melhores profissionais do mercado.
              </p>
              <ul className="space-y-3 mb-8">
                {['Certificação reconhecida pelo MEC', 'Metodologia prática', 'Suporte com tutores'].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-indigo-50 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
              {/* Note: the relatedCourseId is available, but for mock purposes we link to courses page */}
              <Button asChild className="w-full bg-white text-indigo-900 hover:bg-gray-100 font-bold h-12 text-base shadow-lg transition-transform hover:-translate-y-0.5">
                <Link href="/cursos">
                  Conhecer o Curso Agora <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Lead Form */}
          <Card className="border border-gray-200 shadow-md">
            <CardHeader className="bg-gray-50 border-b border-gray-100 rounded-t-xl pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">
                Gostou deste conteúdo?
              </CardTitle>
              <p className="text-sm text-gray-500 mt-2 font-medium">
                Inscreva-se em nossa newsletter para receber mais artigos como este e descontos exclusivos.
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="leadName" className="font-semibold text-gray-700">Seu Nome</Label>
                  <Input id="leadName" required placeholder="Ex: Maria" className="bg-gray-50 focus:bg-white transition-colors" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leadEmail" className="font-semibold text-gray-700">Seu E-mail</Label>
                  <Input id="leadEmail" type="email" required placeholder="maria@email.com" className="bg-gray-50 focus:bg-white transition-colors" />
                </div>
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 h-11 font-semibold text-sm shadow-md" disabled={leadLoading}>
                  {leadLoading ? 'Inscrevendo...' : 'Quero receber as novidades'}
                </Button>
                <p className="text-xs text-center text-gray-400 mt-4 leading-tight">
                  Não enviamos spam. Você pode se descadastrar a qualquer momento.
                </p>
              </form>
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-16 border-t border-gray-200">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-10 tracking-tight">Leia Também</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map(relPost => (
              <Card key={relPost.id} className="flex flex-col overflow-hidden border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <Link href={`/blog/${relPost.slug}`} className="block relative aspect-[16/9] overflow-hidden">
                  <Image 
                    src={relPost.coverImageUrl || `https://picsum.photos/seed/${relPost.id}/600/400`} 
                    alt={relPost.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <CardHeader className="pb-4">
                  <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2">
                    <Link href={`/blog/${relPost.slug}`} className="hover:text-indigo-600">
                      {relPost.title}
                    </Link>
                  </h3>
                </CardHeader>
                <CardContent className="flex-1 pb-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{relPost.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
