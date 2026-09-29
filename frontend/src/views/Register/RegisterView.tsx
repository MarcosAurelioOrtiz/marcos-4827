import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Typography,
  message
} from "antd"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import type { RegisterData } from "../../types/auth.types"

const { Title, Text, Link } = Typography

function RegisterView() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleRegister = (data: RegisterData) => {
    const success = register(data)

    if (!success) {
      message.error("Las contraseñas no coinciden")
      return
    }

    message.success("Usuario registrado correctamente")
    navigate("/dashboard")
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        background: "#f5f5f5"
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 760
        }}
      >
        <Space
          direction="vertical"
          size="large"
          style={{ width: "100%" }}
        >
          <div>
            <Title
              level={2}
              style={{ marginBottom: 4 }}
            >
              Crear cuenta
            </Title>

            <Text type="secondary">
              Regístrate para acceder al dashboard
            </Text>
          </div>

          <Form
            layout="vertical"
            onFinish={handleRegister}
            size="large"
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Nombre completo"
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: "Ingresa tu nombre completo"
                    }
                  ]}
                >
                  <Input placeholder="Nombre completo" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Correo electrónico"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Ingresa tu correo electrónico"
                    },
                    {
                      type: "email",
                      message: "Ingresa un correo válido"
                    }
                  ]}
                >
                  <Input placeholder="correo@ejemplo.com" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Contraseña"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Ingresa una contraseña"
                    },
                    {
                      min: 6,
                      message: "La contraseña debe tener al menos 6 caracteres"
                    }
                  ]}
                >
                  <Input.Password placeholder="Mínimo 6 caracteres" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Confirmar contraseña"
                  name="confirmPassword"
                  rules={[
                    {
                      required: true,
                      message: "Confirma tu contraseña"
                    }
                  ]}
                >
                  <Input.Password placeholder="Repite tu contraseña" />
                </Form.Item>
              </Col>
            </Row>

            <Button
              type="primary"
              htmlType="submit"
              block
            >
              Registrarme
            </Button>
          </Form>

          <Text
            type="secondary"
            style={{
              display: "block",
              textAlign: "center"
            }}
          >
            ¿Ya tienes cuenta?{" "}
            <Link onClick={() => navigate("/login")}>
              Inicia sesión
            </Link>
          </Text>
        </Space>
      </Card>
    </div>
  )
}

export default RegisterView