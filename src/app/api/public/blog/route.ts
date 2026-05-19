import { NextResponse } from 'next/server';
import { publicBlogService } from '@/lib/api/services/public-blog.service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const post = await publicBlogService.getPostBySlug(slug);
      return NextResponse.json(post);
    }

    const posts = await publicBlogService.getPosts();
    return NextResponse.json(posts);
  } catch (error) {
    if ((error as Error).message === 'Post não encontrado') {
      return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
