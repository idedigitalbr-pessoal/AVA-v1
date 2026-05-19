import { NextResponse } from 'next/server';
import { publicCoursesService } from '@/lib/api/services/public-courses.service';

export async function GET() {
  try {
    const courses = await publicCoursesService.getList();
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar cursos' }, { status: 500 });
  }
}
