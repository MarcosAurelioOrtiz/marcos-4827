import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
  Typography,
  message
} from "antd"

import axios from "axios"

import { realizarRecarga } from "../../services/snailpay.service"
import { useAuth } from "../../hooks/useAuth"
import { saveSnailPayResponse } from "../../utils/storage"

import type { RecargaData } from "../../types/payment.types"

const { Text } = Typography

interface RecargaSaldoModalProps {
  open: boolean
  onClose: () => void
}

function RecargaSaldoModal({
  open,
  onClose
}: RecargaSaldoModalProps) {
  const { user, actualizarSaldo } = useAuth()
  const [form] = Form.useForm()

  const handleRecarga = async (data: RecargaData) => {
    if (!user) {
      return
    }

    try {
      const response = await realizarRecarga({
        ...data,
        payerId: user.id,
        payerEmail: user.email
      })

      saveSnailPayResponse(response)

      if (response.status === "approved") {
        const nuevoSaldo =
          user.saldo + response.transaction_amount

        actualizarSaldo(nuevoSaldo)

        form.resetFields()
        onClose()

        message.success("Recarga aprobada")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          message.error(
            "SnailPay tardó demasiado en responder"
          )

          return
        }

        if (error.response?.data) {
          saveSnailPayResponse(error.response.data)
        }

        const status =
          error.response?.data?.status

        if (status === "rejected") {
          message.error(
            "La transacción fue rechazada"
          )

          return
        }

        if (status === "error") {
          message.error(
            "Ocurrió un error interno en SnailPay"
          )

          return
        }
      }

      message.error(
        "No se pudo realizar la recarga"
      )
    }
  }

  return (
    <Modal
      title="Cargar saldo"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      centered
    >
      <Space
        direction="vertical"
        size="middle"
        style={{ width: "100%" }}
      >
        <Text type="secondary">
          Ingresa los datos de tu tarjeta ficticia para realizar la recarga.
        </Text>

        <Divider style={{ margin: "4px 0 8px" }} />

        <Form
          form={form}
          layout="vertical"
          onFinish={handleRecarga}
          preserve={false}
          size="large"
        >
          <Form.Item
            label="Número de tarjeta"
            name="cardNumber"
            rules={[
              {
                required: true,
                message: "Ingresa el número de tarjeta"
              },
              {
                pattern: /^\d{16}$/,
                message: "La tarjeta debe tener exactamente 16 números"
              }
            ]}
          >
            <Input
              placeholder="1234123412341234"
              maxLength={16}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Fecha de vencimiento"
                name="expirationDate"
                rules={[
                  {
                    required: true,
                    message: "Ingresa la fecha de vencimiento"
                  },
                  {
                    pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
                    message: "Usa el formato MM/YY"
                  }
                ]}
              >
                <Input
                  placeholder="12/26"
                  maxLength={5}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="CVV"
                name="cvv"
                rules={[
                  {
                    required: true,
                    message: "Ingresa el CVV"
                  },
                  {
                    pattern: /^\d{3}$/,
                    message: "El CVV debe tener exactamente 3 números"
                  }
                ]}
              >
                <Input
                  placeholder="543"
                  maxLength={3}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Nombre completo"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Ingresa el nombre completo"
              }
            ]}
          >
            <Input placeholder="Nombre completo" />
          </Form.Item>

          <Form.Item
            label="Monto de recarga"
            name="amount"
            validateTrigger="onChange"
            rules={[
              {
                required: true,
                message: "Ingresa el monto de la recarga"
              },
              {
                validator: (_, value) => {
                  if (
                    value === undefined ||
                    value === null
                  ) {
                    return Promise.resolve()
                  }

                  if (value > 0) {
                    return Promise.resolve()
                  }

                  return Promise.reject(
                    new Error(
                      "El monto debe ser mayor a 0"
                    )
                  )
                }
              }
            ]}
          >
            <InputNumber
              placeholder="500"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
          >
            Realizar recarga
          </Button>
        </Form>
      </Space>
    </Modal>
  )
}

export default RecargaSaldoModal