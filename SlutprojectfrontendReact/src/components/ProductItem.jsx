import React from "react";

// Komponent som representerar en enskild produkt i produkt-sidan

export function ProductItem({ id, name, image, price, stock, addToCart }) {
  
  const handleAddButton = () => {
   addToCart({id, name, image, price, stock }); // Skickar produktens information till onAddToCart-funktionen
  };


  return (
    <div className="productcard">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p> Pris: {price}:-</p>
      <p>Lagersaldo:{stock}</p>

      <button onClick={handleAddButton} disabled={stock === 0}>
        {stock > 0 ? "Lägg till i kundvagnen" : "Slut i lager"}
      </button>
    </div>
  );
}
