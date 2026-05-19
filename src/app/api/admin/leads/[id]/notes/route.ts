import { NextResponse } from 'next/server';
import { adminLeadsService } from '@/lib/api/services/admin-leads.service';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const p = await params;
    const { content } = await request.json();
    const result = await adminLeadsService.addNote(p.id, content);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao adicionar nota ao lead' }, { status: 500 });
  }
}
