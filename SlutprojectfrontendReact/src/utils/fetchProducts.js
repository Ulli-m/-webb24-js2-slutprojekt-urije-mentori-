const baseURL = "http://localhost:3000/products";

export async function getAllProducts() {
  const res = await fetch(baseURL);// Skickar en GET-begäran till API
  const data = await res.json();
  return data;
}

export async function patchProduct(id, updatedValues) {
  const options = {
    method: "PATCH",
    body: JSON.stringify(updatedValues),// Omvandlar uppdaterade värden till JSON-sträng
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };
  const res = await fetch(`${baseURL}/${id}`, options);// Skickar PATCH-begäran till API:t med produktens ID
  const data = await res.json();
  return data;// Returnerar den uppdaterade produkten
}

//Funktion för att utveckla appen i framtiden
export async function deleteProduct(id) {
  const options = {
    method: "DELETE",
  };

  const res = await fetch(`${baseURL}/${id}`, options);
  const data = await res.json();
  return data;
}
