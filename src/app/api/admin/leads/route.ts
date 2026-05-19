import { NextResponse } from 'next/server';
import { adminLeadsService } from '@/lib/api/services/admin-leads.service';

export async function GET() {
  try {
    const leads = await adminLeadsService.getLeads();
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar leads' }, { status: 500 });
  }
}
