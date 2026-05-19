import { NextResponse } from 'next/server';
import { adminPreEnrollmentsService } from '@/lib/api/services/admin-pre-enrollments.service';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const p = await params;
    const { stage } = await request.json();
    const result = await adminPreEnrollmentsService.updateStage(p.id, stage);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar fase' }, { status: 500 });
  }
}
