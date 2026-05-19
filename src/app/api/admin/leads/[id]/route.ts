import { NextResponse } from 'next/server';
import { adminLeadsService } from '@/lib/api/services/admin-leads.service';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const p = await params;
    const lead = await adminLeadsService.getLeadById(p.id);
    return NextResponse.json(lead);
  } catch (error) {
    if ((error as Error).message === 'Lead not found') {
      return NextResponse.json({ error: 'Lead não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Erro ao buscar lead' }, { status: 500 });
  }
}
