'use client';

import { useState, useMemo } from 'react';
import { PublicCoursePage } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, GraduationCap, Clock, Filter } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function CourseDirectory({ initialCourses }: { initialCourses: PublicCoursePage[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [formatFilter, setFormatFilter] = useState<string>('ALL');
  const [levelFilter, setLevelFilter] = useState<string>('ALL');

  const levels = Array.from(new Set(initialCourses.map(c => c.level)));

  const filteredCourses = useMemo(() => {
    return initialCourses.filter(course => {
      const matchSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (course.tags && course.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())));
      const matchFormat = formatFilter === 'ALL' || course.format === formatFilter;
      const matchLevel = levelFilter === 'ALL' || course.level === levelFilter;
      
      return matchSearch && matchFormat && matchLevel;
    });
  }, [initialCourses, searchTerm, formatFilter, levelFilter]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <div className="w-full md:w-64 flex-shrink-0 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold">Filtros</h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Busca</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Nome do curso ou área"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Modalidade</label>
              <Select value={formatFilter} onValueChange={setFormatFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Todas modalidades</SelectItem>
                  <SelectItem value="ONLINE">Online (EAD)</SelectItem>
                  <SelectItem value="HYBRID">Híbrido</SelectItem>
                  <SelectItem value="IN_PERSON">Presencial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Nível de Ensino</label>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Todos os níveis</SelectItem>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setSearchTerm('');
                setFormatFilter('ALL');
                setLevelFilter('ALL');
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="flex-1">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredCourses.length} curso{filteredCourses.length !== 1 && 's'} encontrado{filteredCourses.length !== 1 && 's'}
          </h2>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="bg-white p-12 rounded-lg border border-dashed border-gray-300 text-center">
            <GraduationCap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum curso encontrado</h3>
            <p className="text-gray-500">Tente ajustar seus filtros para encontrar o que procura.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredCourses.map(course => (
              <Card key={course.id} className="flex flex-col h-full border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <img src={course.thumbnailUrl} alt={course.title} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-indigo-600 font-semibold">{course.level}</Badge>
                    {course.format === 'ONLINE' && <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">EAD</Badge>}
                    {course.format === 'HYBRID' && <Badge variant="secondary" className="bg-amber-100 text-amber-800">Híbrido</Badge>}
                    {course.format === 'IN_PERSON' && <Badge variant="secondary" className="bg-blue-100 text-blue-800">Presencial</Badge>}
                  </div>
                </div>
                <CardHeader className="pb-4">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-2">
                    <Link href={`/cursos/${course.slug}`} className="hover:text-indigo-600">
                      {course.title}
                    </Link>
                  </h3>
                  <div className="mt-2 text-sm text-gray-500 line-clamp-2" dangerouslySetInnerHTML={{ __html: course.description }} />
                </CardHeader>
                <CardContent className="flex-1 pb-4">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{course.duration || `${course.workload}h`}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="w-full text-indigo-700 border-indigo-200" asChild>
                    <Link href={`/cursos/${course.slug}`}>Ver detalhes</Link>
                  </Button>
                  <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700" asChild>
                    <Link href={`/inscricao?curso=${course.slug}`}>Tenho interesse</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
