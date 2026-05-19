import { NextResponse } from 'next/server';
import { publicPreEnrollmentsService } from '@/lib/api/services/public-pre-enrollments.service';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const result = await publicPreEnrollmentsService.create(payload);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar inscrição' }, { status: 500 });
  }
}
