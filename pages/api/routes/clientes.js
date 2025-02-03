import mongoose from "mongoose";
import dbConnect from "../utils/dbConnect";
import { getAuth } from "@clerk/nextjs/server";
import Clientes from "../models/clientes";

export default async function handler(req, res) {

    const apiKey = process.env.ASAAS_API_KEY// Aqui você já está acessando a variável corretamente
console.log("API Key:", apiKey); // Verifique se a chave está sendo lida

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { userId } = getAuth(req);

  // Conectar ao banco de dados antes de executar a lógica
  await dbConnect();

  try {
    // Verifica se req.body já é um objeto
    const { name, cpfCnpj, email } = req.body;

    if (!name || !email || !cpfCnpj) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    console.log("req.body:", req.body);
    console.log("Chave da API Asaas:", process.env.ASAAS_API_KEY); // Verifique se a chave está correta

    const url = "https://api-sandbox.asaas.com/v3/customers";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        access_token: apiKey,
      },
      body: JSON.stringify({ name, cpfCnpj, email }),
    };

    const response = await fetch(url, options);
    
    // Verifica se a resposta não está vazia antes de tentar parsear
    let data;
    try {
      const text = await response.text(); // Captura a resposta como texto primeiro
      console.log("Resposta bruta da API Asaas:", text);
      data = text ? JSON.parse(text) : null; // Converte apenas se houver conteúdo
    } catch (error) {
      console.error("Erro ao converter resposta da API Asaas:", error);
      return res.status(500).json({ error: "Resposta inválida da API externa." });
    }

    if (!response.ok || !data) {
      return res.status(response.status).json({
        error: data?.message || "Erro ao criar cliente no Asaas",
      });
    }

    const novoCliente = new Clientes({
      userId: userId,
      asaasId: data.id,
      name,
      email,
      dataCriacao: new Date(),
    });

    await novoCliente.save();

    return res.status(201).json(novoCliente);
  } catch (error) {
    console.error("Erro no cadastro de cliente:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
} // Certifique-se de que esta chave de fechamento está presente
