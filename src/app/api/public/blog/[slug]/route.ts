import { NextResponse } from 'next/server';
import { publicBlogService } from '@/lib/api/services/public-blog.service';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const p = await params;
    const post = await publicBlogService.getPostBySlug(p.slug);
    return NextResponse.json(post);
  } catch (error) {
    if ((error as Error).message === 'Post não encontrado') {
      return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
