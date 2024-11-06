import fs from "fs/promises";

// Hämtar alla produkter från JSON-filen
async function getAllProducts() {
  const rawdata = await fs.readFile("./src/productdata.json");
  return JSON.parse(rawdata);// Returnerar den parsade produktlistan
}

// Funktionen finns med för att kunna utveckla appen i framtiden.
async function postProduct(postedproduct) {
  const product = await getAllProducts();
  product.push(postedproduct);

  
  await fs.writeFile(
    "./src/productdata.json",
    JSON.stringify(product, null, 2)
  );
}

// Uppdaterar en produkt baserat på dess ID och sparar ändringarna
async function patchProduct(productID, updatedValues) {
  const products = await getAllProducts();

  // Loopar igenom produkterna för att hitta produkten med rätt ID
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === productID) {
      products[i] = { ...products[i], ...updatedValues };

      // Sparar de uppdaterade produkterna tillbaka till JSON-filen
      await fs.writeFile(
        "./src/productdata.json",
        JSON.stringify(products, null, 2)
      );

      return products[i]; // Returnerar den uppdaterade produkten
    }
  }

  throw new Error(`Product with ID ${productID} not found`);
}

// Funktionen finns med för att kunna utveckla appen i framtiden.
async function deleteProduct(deleteProduct) {
  const products = await getAllProducts();

  
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === deleteProduct.id) {
      products.splice(i, 1);
      break;
    }
  }

  await fs.writeFile(
    "./src/productdata.json",
    JSON.stringify(products, null, 2)
  );
}

export { getAllProducts, postProduct, patchProduct, deleteProduct };
