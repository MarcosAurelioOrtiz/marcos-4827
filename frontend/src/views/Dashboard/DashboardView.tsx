import { useState } from "react"
import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Statistic,
  Typography
} from "antd"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../../hooks/useAuth"
import ApuestasDonut from "../../components/dashboard/ApuestasDonut"
import VictoriasCaracoles from "../../components/dashboard/VictoriasCaracoles"
import RecargaSaldoModal from "../../components/dashboard/RecargaSaldoModal"

const { Title, Text } = Typography

function DashboardView() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: 24 }}
      >
        <Col>
          <Title
            level={2}
            style={{ marginBottom: 4 }}
          >
            Dashboard
          </Title>

          <Text type="secondary">
            Bienvenido, {user?.fullName}
          </Text>
        </Col>

        <Col>
          <Button
            danger
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col
          xs={24}
          md={12}
        >
          <Card
            style={{
              height: "100%"
            }}
          >
            <Space
              direction="vertical"
              size="large"
              style={{
                width: "100%"
              }}
            >
              <div>
                <Text type="secondary">
                  Saldo disponible
                </Text>

                <Statistic
                  value={user?.saldo || 0}
                  prefix="$"
                  precision={2}
                  valueStyle={{
                    fontSize: 32,
                    fontWeight: 600
                  }}
                />
              </div>

              <Button
                type="primary"
                size="large"
                onClick={() => setIsModalOpen(true)}
              >
                Cargar saldo
              </Button>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={12}
        >
          <Card title="Apuestas ganadas y perdidas">
            <ApuestasDonut />
          </Card>
        </Col>
      </Row>

      <Row
        gutter={[16, 16]}
        style={{ marginTop: 16 }}
      >
        <Col span={24}>
          <Card title="Victorias de los caracoles">
            <VictoriasCaracoles />
          </Card>
        </Col>
      </Row>

      <RecargaSaldoModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default DashboardView