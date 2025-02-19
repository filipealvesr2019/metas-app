import subscriptions from "../models/subscriptions";
import dbConnect from "../utils/dbConnect";

export default async function handler(req, res) {
    const token = process.env.ASAAS_TOKEN

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    await dbConnect(); // Conecta ao banco

    const { userId, customerId } = req.body; // Pegando os dados necessários
    if (!userId || !customerId) {
      return res.status(400).json({ message: "userId e customerId são obrigatórios" });
    }

    const url = "https://api-sandbox.asaas.com/v3/subscriptions";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        access_token: token, // Pegando o token da env
      },
      body: JSON.stringify({
        billingType: "PIX",
        cycle: "MONTHLY",
        customer: customerId,
        value: 20,
        nextDueDate: "2025-02-15",
        discount: { value: 0, dueDateLimitDays: 0, type: "PERCENTAGE" },
        interest: { value: 0 },
        fine: { value: null, type: "FIXED" },
        description: "Assinatura Plano Pró",
        endDate: null,
        maxPayments: null,
        externalReference: null,
        callback: { successUrl: "https://www.notion.so/", autoRedirect: true },
      }),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    const novaAssinatura = new subscriptions({ userId });
    await novaAssinatura.save();

    return res.status(201).json({ message: "Assinatura criada com sucesso", data });
  } catch (error) {
    console.log(error)
  }
}
