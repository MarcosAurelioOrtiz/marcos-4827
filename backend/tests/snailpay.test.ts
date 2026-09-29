import request from "supertest"
import { describe, expect, it } from "vitest"
import app from "../src/app"

describe("SnailPay", () => {
    it("debe aprobar una recarga con datos correctos", async () => {
    const response = await request(app)
        .post("/api/snailpay/recarga")
        .send({
            cardNumber: "1234123412341234",
            expirationDate: "12/26",
            cvv: "543",
            fullName: "Marcos Wayne",
            amount: 500,
            payerId: "test-user-001",
            payerEmail: "test@ejemplo.com"
        })

        expect(response.status).toBe(200)
        expect(response.body.status).toBe("approved")
        expect(response.body.status_detail).toBe("accredited")
        expect(response.body.transaction_amount).toBe(500)

        expect(response.body.payer_id).toBe("test-user-001")
        expect(response.body.payer_email).toBe("test@ejemplo.com")

        expect(response.body.card_number).toBe("1234123412341234")
        expect(response.body.cvv).toBe("543")

        expect(response.body.id).toBeDefined()
        expect(response.body.date_created).toBeDefined()
        expect(response.body.reference).toBeDefined()
        expect(response.body.authorization_code).toBeDefined()
    })

    it("debe rechazar una recarga con datos incorrectos", async () => {
        const response = await request(app)
            .post("/api/snailpay/recarga")
            .send({
                cardNumber: "1111111111111111",
                expirationDate: "12/26",
                cvv: "543",
                fullName: "Usuario Test",
                amount: 500,
                payerId: "test-user-001",
                payerEmail: "test@ejemplo.com"
            })

        expect(response.status).toBe(400)
        expect(response.body.status).toBe("rejected")
        expect(response.body.status_detail).toBe("invalid_payment_data")
    })

    it("debe responder con error interno de SnailPay", async () => {
        const response = await request(app)
            .post("/api/snailpay/recarga")
            .send({
                cardNumber: "2222222222222222",
                expirationDate: "12/26",
                cvv: "543",
                fullName: "Usuario Test",
                amount: 500,
                payerId: "test-user-001",
                payerEmail: "test@ejemplo.com"
            })

        expect(response.status).toBe(500)
        expect(response.body.status).toBe("error")
        expect(response.body.status_detail).toBe("internal_server_error")
    })

})