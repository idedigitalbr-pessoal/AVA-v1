import { PublicCoursePage } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, User, BookOpen, Target, Briefcase } from 'lucide-react';

export function CourseContentInfo({ course }: { course: PublicCoursePage }) {
  return (
    <div className="space-y-12">
      {/* Overview Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-indigo-600" />
          Sobre o Curso
        </h2>
        <div className="prose prose-indigo max-w-none text-gray-600">
          <div dangerouslySetInnerHTML={{ __html: course.description }} />
        </div>
      </section>

      {/* Target Audience & Prerequisites */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-indigo-100 shadow-sm">
          <CardContent className="pt-6">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600" />
              Público-alvo
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {course.targetAudience || 'Profissionais interessados em avançar na carreira e aprofundar conhecimentos específicos desta área.'}
            </p>
          </CardContent>
        </Card>

        <Card className="border border-indigo-100 shadow-sm">
          <CardContent className="pt-6">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" />
              Pré-requisitos
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {course.prerequisites || 'Possuir diploma de graduação (para pós-graduação) ou ensino médio completo (para cursos livres).'}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Modules/Curriculum Section */}
      {course.modulesBriefInfo && course.modulesBriefInfo.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Grade Curricular</h2>
          <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
            <ul className="divide-y divide-gray-100">
              {course.modulesBriefInfo.map((mod, index) => (
                <li key={index} className="p-4 sm:px-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{mod.name}</h4>
                      <p className="mt-1 text-sm text-gray-600">{mod.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Instructors Section */}
      {course.instructorsInfo && course.instructorsInfo.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <UsersIcon className="w-6 h-6 text-indigo-600" />
            Corpo Docente
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {course.instructorsInfo.map((instructor, index) => (
              <div key={index} className="flex gap-4 p-4 border rounded-lg bg-white shadow-sm">
                <img src={instructor.photoUrl} alt={instructor.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-gray-900">{instructor.name}</h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-3">{instructor.miniBio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Career & Market */}
      <section>
        <Card className="bg-indigo-50 border-0 shadow-none">
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-indigo-600" />
              Mercado de Trabalho
            </h2>
            <div className="prose prose-sm max-w-none text-indigo-800/80">
              {course.marketOpportunities || 'A área de atuação possui alta demanda no mercado atual, com oportunidades em diversas empresas e potencial de crescimento acelerado. Prepare-se para vagas estratégicas e seja o profissional requisitado e valorizado pela indústria.'}
            </div>
            <ul className="mt-6 space-y-3">
              {['Alta empregabilidade', 'Foco real nas necessidades das empresas', 'Apoio de tutores experientes no mercado'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-indigo-900 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

// Just an inline mock icon since lucide might not have UsersIcon exported as Users in some versions
function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
