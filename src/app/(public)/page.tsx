import { publicSiteService } from '@/lib/api/services/public-site.service';
import { publicCoursesService } from '@/lib/api/services/public-courses.service';
import { publicBlogService } from '@/lib/api/services/public-blog.service';
import { publicLeadsService } from '@/lib/api/services/public-leads.service';

import { PublicHeader } from '@/features/public-site/PublicHeader';
import { PublicHero } from '@/features/public-site/PublicHero';
import { LeadCaptureForm } from '@/features/public-site/LeadCaptureForm';
import { FeaturedCourses } from '@/features/public-site/FeaturedCourses';
import { EntryMethodsSection } from '@/features/public-site/EntryMethodsSection';
import { PublicBenefits } from '@/features/public-site/PublicBenefits';
import { AvaHowItWorks } from '@/features/public-site/AvaHowItWorks';
import { TestimonialsSection } from '@/features/public-site/TestimonialsSection';
import { BlogPreview } from '@/features/public-site/BlogPreview';
import { PublicFAQ } from '@/features/public-site/PublicFAQ';
import { PublicFooter } from '@/features/public-site/PublicFooter';

export default async function HomePage() {
  const [
    settings,
    menuItems,
    banners,
    faqs,
    testimonials,
    featuredCourses,
    featuredPosts,
    leadForm
  ] = await Promise.all([
    publicSiteService.getSettings(),
    publicSiteService.getMenu(),
    publicSiteService.getBanners(),
    publicSiteService.getFaqs(),
    publicSiteService.getTestimonials(),
    publicCoursesService.getFeatured(),
    publicBlogService.getFeaturedPosts(),
    publicLeadsService.getForm('form-1').catch(() => undefined) // fallback in case form not found
  ]);

  const mainBanner = banners.length > 0 ? banners[0] : undefined;

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader settings={settings} menuItems={menuItems} />
      
      <main>
        <PublicHero banner={mainBanner} />
        
        {leadForm && (
          <div className="relative -mt-16 sm:-mt-24 z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <LeadCaptureForm formConfig={leadForm} />
            </div>
          </div>
        )}

        <div className={leadForm ? 'pt-16 sm:pt-24' : ''}>
          <FeaturedCourses courses={featuredCourses} />
        </div>

        <EntryMethodsSection />
        
        <PublicBenefits />
        
        <AvaHowItWorks />
        
        <TestimonialsSection testimonials={testimonials} />
        
        <BlogPreview posts={featuredPosts} />
        
        <PublicFAQ faqs={faqs} />
      </main>

      <PublicFooter settings={settings} />
    </div>
  );
}
