import axios from "axios"

import type {
  RecargaData,
  SnailPayResponse
} from "../types/payment.types"

interface SnailPayRequest extends RecargaData {
  payerId: string
  payerEmail: string
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export const realizarRecarga = async (
  data: SnailPayRequest
): Promise<SnailPayResponse> => {
  const response = await axios.post<SnailPayResponse>(
    `${API_URL}/api/snailpay/recarga`,
    data,
    {
      timeout: 3000
    }
  )

  return response.data
}