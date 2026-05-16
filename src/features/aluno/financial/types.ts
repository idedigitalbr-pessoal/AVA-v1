export type InvoiceStatus = "EM_ABERTO" | "PAGO" | "VENCIDO" | "CANCELADO";

export interface Invoice {
  id: string;
  description: string;
  amount: number;
  dueDate: string; // "DD/MM/YYYY" format
  status: InvoiceStatus;
  barcode: string;
  boletoUrl: string;
}

export interface FinancialSummary {
  status: "REGULAR" | "INADIMPLENTE";
  nextDueDate: string | null;
  totalOpen: number;
}

export const MOCK_INVOICES: Invoice[] = [
  {
    id: "inv-1",
    description: "Mensalidade - Março/2026",
    amount: 549.90,
    dueDate: "10/03/2026",
    status: "PAGO",
    barcode: "34191.09008 63571.277308 71444.640008 1 89130000054990",
    boletoUrl: "#boleto"
  },
  {
    id: "inv-2",
    description: "Mensalidade - Abril/2026",
    amount: 549.90,
    dueDate: "10/04/2026",
    status: "PAGO",
    barcode: "34191.09008 63571.277308 71444.640008 1 89440000054990",
    boletoUrl: "#boleto"
  },
  {
    id: "inv-3",
    description: "Mensalidade - Maio/2026",
    amount: 549.90,
    dueDate: "10/05/2026",
    status: "EM_ABERTO",
    barcode: "34191.09008 63571.277308 71444.640008 3 89740000054990",
    boletoUrl: "#boleto"
  },
  {
    id: "inv-4",
    description: "Mensalidade - Junho/2026",
    amount: 549.90,
    dueDate: "10/06/2026",
    status: "EM_ABERTO",
    barcode: "34191.09008 63571.277308 71444.640008 4 90050000054990",
    boletoUrl: "#boleto"
  },
  {
    id: "inv-tax",
    description: "Taxa de Emissão de Documento",
    amount: 35.00,
    dueDate: "25/03/2026",
    status: "CANCELADO",
    barcode: "34191.09008 63571.277308 71444.640008 5 89280000003500",
    boletoUrl: "#boleto"
  }
];

export const MOCK_FINANCIAL_SUMMARY: FinancialSummary = {
  status: "REGULAR",
  nextDueDate: "10/05/2026",
  totalOpen: 1099.80,
};
