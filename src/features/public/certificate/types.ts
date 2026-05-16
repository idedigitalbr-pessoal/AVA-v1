export interface CertificateInfo {
  studentName: string;
  course: string;
  workloadHours: number;
  issueDate: string;
  validationCode: string;
  status: "VALIDO" | "REVOGADO";
}

export const MOCK_CERTIFICATES: Record<string, CertificateInfo> = {
  "12345678900-ABC123DEF": {
    studentName: "Ana Oliveira Silva",
    course: "Análise e Desenvolvimento de Sistemas",
    workloadHours: 3200,
    issueDate: "15/12/2025",
    validationCode: "ABC123DEF",
    status: "VALIDO"
  },
  "11122233344-XYZ987KJH": {
    studentName: "Carlos Roberto Sousa",
    course: "Engenharia de Software",
    workloadHours: 3600,
    issueDate: "10/01/2026",
    validationCode: "XYZ987KJH",
    status: "REVOGADO"
  }
};
