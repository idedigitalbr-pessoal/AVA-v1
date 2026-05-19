import { NextResponse } from 'next/server';
import { adminLeadsService } from '@/lib/api/services/admin-leads.service';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const p = await params;
    const { stage } = await request.json();
    const result = await adminLeadsService.updateLeadStage(p.id, stage);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar fase do lead' }, { status: 500 });
  }
}
