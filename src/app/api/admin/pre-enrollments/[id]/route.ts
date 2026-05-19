import { NextResponse } from 'next/server';
import { adminPreEnrollmentsService } from '@/lib/api/services/admin-pre-enrollments.service';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const p = await params;
    const detail = await adminPreEnrollmentsService.getById(p.id);
    return NextResponse.json(detail);
  } catch (error) {
    if ((error as Error).message === 'PreEnrollment not found') {
      return NextResponse.json({ error: 'Pré-matrícula não encontrada' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Erro ao buscar pré-matrícula' }, { status: 500 });
  }
}
