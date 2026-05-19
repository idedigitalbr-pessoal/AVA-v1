import { NextResponse } from 'next/server';
import { adminPreEnrollmentsService } from '@/lib/api/services/admin-pre-enrollments.service';

export async function GET() {
  try {
    const list = await adminPreEnrollmentsService.getPreEnrollments();
    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao listar pré-matrículas' }, { status: 500 });
  }
}
