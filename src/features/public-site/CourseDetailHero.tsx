import { PublicCoursePage } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Clock, Book, Video, MonitorPlay } from 'lucide-react';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export function CourseDetailHero({ course }: { course: PublicCoursePage }) {
  return (
    <div className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="text-slate-400 hover:text-white">Início</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-slate-500" />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/cursos" className="text-slate-400 hover:text-white">Cursos</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-slate-500" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white">{course.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge className="bg-indigo-500 hover:bg-indigo-600">{course.level}</Badge>
              {course.format === 'ONLINE' && <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border-0">EAD</Badge>}
              {course.format === 'HYBRID' && <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border-0">Híbrido</Badge>}
              {course.tags && course.tags.map(tag => (
                <Badge key={tag} variant="outline" className="border-slate-700 text-slate-300">{tag}</Badge>
              ))}
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">
              {course.title}
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 max-w-2xl">
              {course.headline}
            </p>
            
            <div className="flex items-center gap-6 text-slate-300">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-400" />
                <span>{course.duration || `${course.workload}h`}</span>
              </div>
              <div className="flex items-center gap-2">
                <Book className="w-5 h-5 text-indigo-400" />
                <span>MEC Avaliação 5</span>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-800 ring-1 ring-white/10 shadow-2xl">
            {course.videoUrl ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Video className="w-16 h-16 text-white/50" />
                <span className="sr-only">Assista ao vídeo do curso</span>
              </div>
            ) : (
              <img 
                src={course.coverImageUrl || course.thumbnailUrl} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
            )}
            
            {!course.videoUrl && (
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-center justify-center">
                <button className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-600/90 text-white hover:bg-indigo-500 transition-colors backdrop-blur-sm shadow-xl">
                  <MonitorPlay className="w-8 h-8 ml-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
