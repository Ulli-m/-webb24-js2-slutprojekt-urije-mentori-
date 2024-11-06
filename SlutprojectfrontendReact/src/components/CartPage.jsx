import React from "react";


export function CartPage({ cartItems }) {

  const theTotalPrice = cartItems.reduce( 
    (sum, product) => sum + product.price * product.quantity,0); 

   
  return (
    
    
      <h2 id="h2TotalPris"> Totalt pris: {theTotalPrice} :-</h2>
    
  );
}
