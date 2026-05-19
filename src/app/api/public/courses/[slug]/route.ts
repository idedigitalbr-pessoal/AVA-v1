import { NextResponse } from 'next/server';
import { publicCoursesService } from '@/lib/api/services/public-courses.service';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const p = await params;
    const course = await publicCoursesService.getBySlug(p.slug);
    return NextResponse.json(course);
  } catch (error) {
    if ((error as Error).message === 'Curso não encontrado') {
      return NextResponse.json({ error: 'Curso não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Erro ao buscar curso' }, { status: 500 });
  }
}
