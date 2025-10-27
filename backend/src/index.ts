import express from "express";
import { patientData, generateVital } from "./utils/dataGenerators";

const app = express();
const PORT = 3000;

app.get("/api/patient/:id", (_req, res) => {
  res.json(patientData);
});

app.get("/api/patient/:id/vitals", (_req, res) => {
  res.json(generateVital());
});

app.listen(PORT, () => {
  console.log("works");
});