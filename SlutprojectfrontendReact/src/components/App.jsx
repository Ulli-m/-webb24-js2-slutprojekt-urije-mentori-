import React, { useState, useEffect } from "react";
import { Productpage } from "./Productpage";
import { CartItem } from "./CartItem";
import { CartPage } from "./CartPage";
import { Navbar } from "./Navbar";
import { CheckoutPage } from "./CheckoutPage";
import { getAllProducts } from "../utils/fetchProducts";
import { patchProduct } from "../utils/fetchProducts";
import { Error } from "./Error";

export function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState("products");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("Something went wrong... try again!");
      }
    }
    fetchProducts(); // Anropar funktionen för att hämta produkter
  }, []);

  function onAddToCart(selectedProduct) {
    setProducts((current) => {
      return current.map((product) =>
        product.id === selectedProduct.id && product.stock > 0
          ? { ...product, stock: product.stock - 1 } // Minskar lagret om produkten finns
          : product
      );
    });

    setCart((prevCart) => {
      const cartItem = prevCart.find(
        (Item) => Item.name === selectedProduct.name // Kontrollerar om produkten redan finns i kundvagnen
      );
      if (cartItem) {
        // Om produkten redan finns, ökar kvantiteten
        return prevCart.map((Item) =>
          Item.name === selectedProduct.name
            ? { ...Item, quantity: Item.quantity + 1 }
            : Item
        );
      } else {
        return [...prevCart, { ...selectedProduct, quantity: 1 }];
      }
    });
  }

  function emptyCart() {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        const cartItem = cart.find((item) => item.id === product.id);
        if (cartItem) {
          // Återställer lagret baserat på kvantiteten i kundvagnen
          return { ...product, stock: product.stock + cartItem.quantity };
        } else {
          return product; // Ingen ändring för produkter som inte finns i kundvagnen
        }
      });
    });

    setCart([]);

    showProductsPage();
  }

  async function handleCheckout() {
    try {
      await Promise.all(
        cart.map((product) => {
          const updatedStock = { stock: product.stock - product.quantity };
          return patchProduct(product.id, updatedStock);
        })
      );

      setCart([]);
      setCurrentPage("checkout");
    } catch (err) {
      setError("Failed to complete purchase.Please try again.");
    }
  }

  function showProductsPage() {
    setCurrentPage("products");
  }

  function showCartPage() {
    setCurrentPage("cart");
  }

  const cartCount = cart.reduce((sum, product) => sum + product.quantity, 0); // Beräknar totalt antal varor i kundvagnen

  //console.log("Products:", products);
  //console.log("Cart:",cart);

  return (
    <>
      <header>
        <Navbar
          cartCount={cartCount}
          showProductsPage={showProductsPage}
          showCartPage={showCartPage}
        />
      </header>

      <main>
        {error ? (
          <Error message={error} />
        ) : (
          <>
            {currentPage === "products" && (
              <Productpage products={products} onAddToCart={onAddToCart} />
            )}

            {currentPage === "cart" && (
              <div className="cartpage">
                {cart.length > 0 ? (
                  <div>
                    {cart.map((product) => (
                      <CartItem
                        key={product.id}
                        name={product.name}
                        image={product.image}
                        price={product.price}
                        quantity={product.quantity}
                      />
                    ))}
                    <CartPage cartItems={cart} />
                    <div id="buttoncontainer">
                      <button id="buybutton" onClick={handleCheckout}>
                        Betala
                      </button>
                      <button id="emptycartbutton" onClick={emptyCart}>
                        Töm kundvagn
                      </button>
                    </div>
                  </div>
                ) : (
                  <div id="varukorgTom">
                    <p id="paragrafvarukorg">DIN VARUKORG ÄR TOM !</p>
                  </div>
                )}
              </div>
            )}

            {currentPage === "checkout" && <CheckoutPage />}
          </>
        )}
      </main>
    </>
  );
}
