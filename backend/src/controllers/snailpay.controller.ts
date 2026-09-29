import type { Request, Response } from "express"
import type { SnailPayRequest, SnailPayResponse } from "../types/snailpay.types"

export const procesarPago = async (
  req: Request<{}, {}, SnailPayRequest>,
  res: Response<SnailPayResponse>
) => {
  const {
    cardNumber,
    expirationDate,
    cvv,
    fullName,
    amount,
    payerId,
    payerEmail
  } = req.body

    if (cardNumber === "2222222222222222") {
        return res.status(500).json({
            id: Date.now().toString(),
            status: "error",
            status_detail: "internal_server_error",
            transaction_amount: amount,
            date_created: new Date().toISOString(),
            reference: `REF-${Date.now()}`,
            payer_id: payerId,
            payer_email: payerEmail,
            card_number: cardNumber,
            cvv
        })
    }

    if (cardNumber === "3333333333333333") {
        await new Promise((resolve) => setTimeout(resolve, 5000))
    }

    if (
        cardNumber === "1234123412341234" &&
        expirationDate === "12/26" &&
        cvv === "543" &&
        fullName.trim() !== "" &&
        amount > 0
    ) {
        return res.status(200).json({
        id: Date.now().toString(),
        status: "approved",
        status_detail: "accredited",
        transaction_amount: amount,
        date_created: new Date().toISOString(),
        authorization_code: "AUTH123",
        reference: `REF-${Date.now()}`,
        payer_id: payerId,
        payer_email: payerEmail,
        card_number: cardNumber,
        cvv
        })
    }

    return res.status(400).json({
        id: Date.now().toString(),
        status: "rejected",
        status_detail: "invalid_payment_data",
        transaction_amount: amount,
        date_created: new Date().toISOString(),
        reference: `REF-${Date.now()}`,
        payer_id: payerId,
        payer_email: payerEmail,
        card_number: cardNumber,
        cvv
    })
}