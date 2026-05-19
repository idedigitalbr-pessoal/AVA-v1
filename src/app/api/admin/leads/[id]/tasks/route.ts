import { NextResponse } from 'next/server';
import { adminLeadsService } from '@/lib/api/services/admin-leads.service';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const p = await params;
    const task = await request.json();
    const result = await adminLeadsService.addTask(p.id, task);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar tarefa para o lead' }, { status: 500 });
  }
}
