import { redirect } from 'next/navigation';

export default function CertificadosRedirect() {
  redirect('/admin/certificados/emitidos');
}
