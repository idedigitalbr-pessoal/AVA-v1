import { publicCoursesService } from '@/lib/api/services/public-courses.service';
import { CourseDirectory } from '@/features/public-site/CourseDirectory';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cursos - AVA Acadêmica',
  description: 'Conheça nossos cursos de graduação, pós, extensão e livres.',
};

export default async function CursosPage() {
  const courses = await publicCoursesService.getList();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-indigo-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl tracking-tight">
            Nossos Cursos
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-indigo-100 mx-auto">
            Escolha o caminho para o seu futuro. Oferecemos diversas opções com metodologias inovadoras.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CourseDirectory initialCourses={courses} />
      </div>
    </div>
  );
}
