import React from "react";

// Komponent som representerar en enskild produkt i kundvagn-sidan
export function CartItem({ name, image, price, quantity }) {
  

  return (
    <div className="cartItem">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Pris:{price}:-</p>
      <p>Antal:{quantity}</p>
      <p>Total:{price * quantity}:-</p>
    </div>
  );
}
