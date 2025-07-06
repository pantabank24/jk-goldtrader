export interface QuotationModel { 
  goldType: string,
  goldPrice: number, 
  weightBaht: number, 
  percentage: number, 
  laborCost: number, 
  costPerBaht: number, 
  totalAmount: number,
  remark?: string
}