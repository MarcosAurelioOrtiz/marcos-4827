export interface RecargaData {
  cardNumber: string
  expirationDate: string
  cvv: string
  fullName: string
  amount: number
}

export interface SnailPayResponse {
  id: string
  status: "approved" | "rejected" | "error"
  status_detail: string
  transaction_amount: number
  date_created: string
  authorization_code?: string
  reference: string
  payer_id: string
  payer_email: string
  card_number: string
  cvv: string
}