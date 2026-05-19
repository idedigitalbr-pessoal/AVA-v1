import { NextResponse } from 'next/server';
import { adminLeadsService } from '@/lib/api/services/admin-leads.service';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const p = await params;
    const result = await adminLeadsService.convertToPreEnrollment(p.id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao converter lead' }, { status: 500 });
  }
}
