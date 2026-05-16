"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, PlusCircle, Edit2, Trash2 } from "lucide-react";
import { useStudents } from "@/hooks/use-queries";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Can } from "@/lib/auth/Can";
import { Student } from "@/types";
import { ConfirmDeleteModal } from "@/components/ui/confirm-delete-modal";

export function AdminStudents() {
  const { data: students, isLoading, error, refetch } = useStudents();
  const [searchTerm, setSearchTerm] = useState("");

  if (error) {
    return <ErrorState onRetry={() => refetch()} error={error as Error} />
  }

  const filteredStudents = students?.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Alunos</h1>
          <p className="text-slate-500 text-sm mt-1">Gerencie os alunos da instituição.</p>
        </div>
        <Can I="MANAGE_USERS">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <PlusCircle className="mr-2 h-4 w-4" /> Novo Aluno
          </Button>
        </Can>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative w-full sm:max-w-sm mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Buscar por nome..." 
            className="pl-9" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center p-8 text-slate-500">Carregando alunos...</div>
        ) : filteredStudents.length === 0 ? (
          <EmptyState 
            title="Nenhum aluno encontrado"
            description="Você ainda não cadastrou nenhum aluno ou a busca não retornou resultados."
          />
        ) : (
          <>
            {/* Mobile View: Cards */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {filteredStudents.map((student) => (
                <div key={student.id} className="bg-white border border-slate-200 rounded-lg p-4 space-y-3 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{student.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{student.email}</p>
                    </div>
                    <Badge variant="success">Ativo</Badge>
                  </div>
                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                    <Can I="MANAGE_USERS">
                      <Button variant="ghost" size="sm" className="text-slate-500 hover:text-indigo-600">
                        <Edit2 className="h-4 w-4 mr-2" /> Editar
                      </Button>
                    </Can>
                    <Can I="DELETE_USERS">
                      <ConfirmDeleteModal
                        title="Excluir aluno"
                        description={`Deseja excluir o aluno ${student.name}?`}
                        onConfirm={() => console.log('Apagar aluno', student.id)}
                      >
                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" /> Excluir
                        </Button>
                      </ConfirmDeleteModal>
                    </Can>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium text-slate-900">{student.name}</TableCell>
                      <TableCell className="text-slate-500">{student.email}</TableCell>
                      <TableCell>
                        <Badge variant="success">Ativo</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Can I="MANAGE_USERS">
                          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </Can>
                        <Can I="DELETE_USERS">
                          <ConfirmDeleteModal
                            title="Excluir aluno"
                            description={`Deseja excluir o aluno ${student.name}?`}
                            onConfirm={() => console.log('Apagar aluno', student.id)}
                          >
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </ConfirmDeleteModal>
                        </Can>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
