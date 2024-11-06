import React from "react";
import { ProductItem } from "./ProductItem";

// Komponent som representerar produktsidan, där alla produkter visas

export function Productpage({products, onAddToCart }) {
  
  return (
    
      <div className="productpage">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            stock={product.stock}
            addToCart={onAddToCart}
          />
        ))}
      </div>
  );
  
}
