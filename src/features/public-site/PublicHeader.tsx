import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PublicSiteSettings, PublicMenuItem } from '@/types';

export function PublicHeader({ settings, menuItems }: { settings: PublicSiteSettings; menuItems: PublicMenuItem[] }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-indigo-700 tracking-tight">
              {settings.logoUrl && !settings.logoUrl.includes('placehold') ? (
                // If it's a real logo, you could use an img tag, but for now we'll stick to text if there's no real logo
                <img src={settings.logoUrl} alt="Logo" className="h-8 object-contain" />
              ) : (
                "AVA Acadêmica"
              )}
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6 h-full items-center">
          {menuItems.sort((a, b) => a.order - b.order).map((item) => (
            <Link 
              key={item.id} 
              href={item.url} 
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              target={item.isOpenInNewTab ? "_blank" : "_self"}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/portal/aluno/login">
            <Button variant="ghost" className="hidden sm:inline-flex">Área do Aluno</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" className="hidden sm:inline-flex border-indigo-200 text-indigo-700 hover:bg-indigo-50">Portal Docente</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
