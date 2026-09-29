import {
  Button,
  Card,
  Form,
  Input,
  Space,
  Typography,
  message
} from "antd"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../../hooks/useAuth"
import type { LoginData } from "../../types/auth.types"

const { Title, Text, Link } = Typography

function LoginView() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = (data: LoginData) => {
    const success = login(data)

    if (!success) {
      message.error("Correo o contraseña incorrectos")
      return
    }

    message.success("Inicio de sesión correcto")
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
          maxWidth: 420
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
              Iniciar sesión
            </Title>

            <Text type="secondary">
              Ingresa con tu correo y contraseña
            </Text>
          </div>

          <Form
            layout="vertical"
            onFinish={handleLogin}
            size="large"
          >
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

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Ingresa tu contraseña"
                }
              ]}
            >
              <Input.Password placeholder="Ingresa tu contraseña" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
            >
              Iniciar sesión
            </Button>
          </Form>

          <Text
            type="secondary"
            style={{
              display: "block",
              textAlign: "center"
            }}
          >
            ¿No tienes cuenta?{" "}
            <Link onClick={() => navigate("/register")}>
              Regístrate
            </Link>
          </Text>
        </Space>
      </Card>
    </div>
  )
}

export default LoginView