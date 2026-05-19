import { publicCoursesService } from '@/lib/api/services/public-courses.service';
import { publicSiteService } from '@/lib/api/services/public-site.service';
import { notFound } from 'next/navigation';
import { PublicHeader } from '@/features/public-site/PublicHeader';
import { PublicFooter } from '@/features/public-site/PublicFooter';
import { CourseDetailHero } from '@/features/public-site/CourseDetailHero';
import { CourseContentInfo } from '@/features/public-site/CourseContentInfo';
import { CourseSidebarForm } from '@/features/public-site/CourseSidebarForm';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await params;
  try {
    const course = await publicCoursesService.getBySlug(p.slug);
    return {
      title: course.seoTitle || `${course.title} - AVA Acadêmica`,
      description: course.seoDescription || course.headline,
    };
  } catch (error) {
    return {
      title: 'Curso não encontrado',
    };
  }
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  
  let course, settings, menuItems;
  try {
    const data = await Promise.all([
      publicCoursesService.getBySlug(p.slug),
      publicSiteService.getSettings(),
      publicSiteService.getMenu()
    ]);
    course = data[0];
    settings = data[1];
    menuItems = data[2];
  } catch (error) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PublicHeader settings={settings} menuItems={menuItems} />
      
      <main className="flex-1">
        <CourseDetailHero course={course} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 w-full order-2 lg:order-1">
              <CourseContentInfo course={course} />
            </div>
            
            <div className="w-full lg:w-96 flex-shrink-0 order-1 lg:order-2 sticky top-[5rem]">
              <CourseSidebarForm course={course} />
            </div>
          </div>
        </div>
      </main>
      
      <PublicFooter settings={settings} />
    </div>
  );
}
