export type PaymentStatus = "not_started" | "ready" | "in_progress" | "paid" | "default";

interface MerchantInfo {
  name: string; // The merchant name
}

export interface PaymentPlan {
  id: string; //The installment id
  status: PaymentStatus; // he installment current status (not_started, ready, in_progress, paid, default)
  amount: number; // The amount of installment in cents
  fee: number; // The customer fee for the installment in cents
  due_date: number;
}

export interface Payment {
  status: PaymentStatus; // The payment current status (not_started, ready, in_progress, paid, default)
  id: string; // The payment id.
  customer_name: string; // The customer name.
  merchant: MerchantInfo;
  amount: number; // The purchase amount in cents
  installmentsCount: number; // The number of installments
  created: number;
  paymentPlan?: PaymentPlan[];
}
