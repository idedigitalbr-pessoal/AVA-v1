import { NextResponse } from 'next/server';
import { adminPreEnrollmentsService } from '@/lib/api/services/admin-pre-enrollments.service';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const p = await params;
    const result = await adminPreEnrollmentsService.convertToEnrollment(p.id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao converter para matrícula' }, { status: 500 });
  }
}
