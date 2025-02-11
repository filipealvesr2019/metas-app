import mongoose from "mongoose";

const Subscriptionschema = new mongoose.Schema({
  userId: { type: String, required: true }, // Relaciona o produto ao cliente

  dataCriacao: { type: Date, default: Date.now },
});


export default mongoose.models.Subscriptions || mongoose.model("Subscriptions", Subscriptionschema);
