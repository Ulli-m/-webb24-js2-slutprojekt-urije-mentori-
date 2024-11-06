import React from "react";


export function Navbar({cartCount,showProductsPage,showCartPage}) {

 

  return (
    <ul>
      <li>
        <a href="#!" onClick={showProductsPage}>Produkter</a>
      </li>
      <li>
        <a href="#!" onClick={showCartPage}>Kundvagn  ( {cartCount} )</a>
      </li>
    </ul>
  );
}
