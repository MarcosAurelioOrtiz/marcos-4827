import express from "express"
import cors from "cors"
import snailPayRoutes from "./routes/snailpay.routes"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/snailpay", snailPayRoutes)

app.get("/", (_req, res) => {
  res.json({
    message: "Backend funcionando"
  })
})

export default app