import axios from "axios"
import type {
  RecargaData,
  SnailPayResponse
} from "../types/payment.types"

interface SnailPayRequest extends RecargaData {
  payerId: string
  payerEmail: string
}

export const realizarRecarga = async (
  data: SnailPayRequest
): Promise<SnailPayResponse> => {
  const response = await axios.post<SnailPayResponse>(
    "http://localhost:3000/api/snailpay/recarga",
    data,
    {
      timeout: 3000
    }
  )

  return response.data
}