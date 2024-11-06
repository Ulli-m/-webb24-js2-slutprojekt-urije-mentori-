import express from "express";
import * as database from "./handledatabase.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get("/products", async (req, res) => {
  const productsGet = await database.getAllProducts(); // Hämtar alla produkter från databasen
  res.json(productsGet); // Returnerar produkterna som JSON-svar
});

//Funktionen finns med för att kunna utveckla appen i framtiden.
app.post("/products", async (req, res) => {
  const newProduct = req.body; // Tar emot den nya produkten från request body
  await database.postProduct(newProduct);  // Lägger till produkten i databasen
  res.json({ message: "Product added!", product: newProduct });
});

app.patch("/products/:id", async (req, res) => {
  const product = Number(req.params.id);
  const updatedValues = req.body;// Hämtar uppdaterade värden från request body
  const updatedProduct = await database.patchProduct(product, updatedValues);// Uppdaterar produkten i databasen

  res.json({ message: "Product updated", product: updatedProduct });
});

// Funktionen finns med för att kunna utveckla appen i framtiden.
app.delete("/products/:id", async (req, res) => {
  const product = Number(req.params.id);// Hämtar produktens ID från URL-parametern
  await database.deleteProduct({ id: product });
  res.json({ message: "Product is deleted!" });
});

// Startar servern och lyssnar på port
app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
