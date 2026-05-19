import { EnrollmentForm } from '@/features/public-site/EnrollmentForm';
import { PublicHeader } from '@/features/public-site/PublicHeader';
import { PublicFooter } from '@/features/public-site/PublicFooter';
import { publicSiteService } from '@/lib/api/services/public-site.service';

export default async function EnrollmentPage() {
  const settings = await publicSiteService.getSettings();
  const menuItems = await publicSiteService.getMenu();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PublicHeader settings={settings} menuItems={menuItems} />
      
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8">
        <EnrollmentForm />
      </main>
      
      <PublicFooter settings={settings} />
    </div>
  );
}
