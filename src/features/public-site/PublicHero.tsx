import { Button } from '@/components/ui/button';
import { PublicBanner } from '@/types';
import Link from 'next/link';

export function PublicHero({ banner }: { banner?: PublicBanner }) {
  if (!banner) {
    return null;
  }

  return (
    <div className="relative bg-indigo-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-indigo-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20 px-4 sm:px-6 lg:px-8">
          <main className="mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">{banner.title}</span>{' '}
              </h1>
              {banner.subtitle && (
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {banner.subtitle}
                </p>
              )}
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                {banner.linkUrl && (
                  <div className="rounded-md shadow">
                    <Link href={banner.linkUrl}>
                      <Button size="lg" className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                        {banner.linkText || 'Saiba Mais'}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src={banner.imageUrl}
          alt={banner.title}
        />
      </div>
    </div>
  );
}
