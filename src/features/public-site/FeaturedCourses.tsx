import { PublicCoursePage } from '@/types';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, GraduationCap } from 'lucide-react';

export function FeaturedCourses({ courses }: { courses: PublicCoursePage[] }) {
  if (!courses || courses.length === 0) return null;

  return (
    <div className="bg-gray-50 py-16 sm:py-24" id="cursos">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Cursos em Destaque</h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Escolha seu caminho para o sucesso com nossos cursos mais procurados.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-8 lg:max-w-none lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="flex flex-col overflow-hidden h-full border-0 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex-shrink-0 relative">
                <img className="h-48 w-full object-cover" src={course.thumbnailUrl} alt={course.title} />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-indigo-600 font-semibold">{course.level}</Badge>
                </div>
              </div>
              <CardHeader className="flex-1 pb-4">
                <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2">
                  <Link href={`#`} className="hover:text-indigo-600 block">
                    {course.title}
                  </Link>
                </h3>
                <div className="mt-3 text-base text-gray-500 line-clamp-2" dangerouslySetInnerHTML={{ __html: course.description }} />
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <div className="flex items-center text-sm text-gray-500 gap-4 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration || `${course.workload}h`}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4" />
                    <span>{course.format === 'ONLINE' ? 'EAD' : course.format === 'HYBRID' ? 'Híbrido' : 'Presencial'}</span>
                  </div>
                </div>
                {course.price && (
                  <div className="mt-2 text-lg font-bold text-gray-900">
                    A partir de {course.installmentOptions || `R$ ${course.price.toFixed(2)}`}
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-0">
                <Link href={`/cursos`} className="w-full">
                  <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                    Ver detalhes do curso
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/cursos">
            <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800">
              Ver todos os cursos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
