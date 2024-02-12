import React, { useState, useEffect } from "react";
import QuantityPicker from "../../components/Home/QuantityPicker";
import { firestore } from "../../Firebase/firebase";
import Navbar from "../../components/Home/Navrbar";
import { useAuth } from "../../Firebase/AuthContext";
import StripeCheckout from "react-stripe-checkout";
import { useHistory } from "react-router-dom";
// import { uploadproductsImage } from "../../Firebase/user";
// import stripe from "stripe";

const Products = () => {
  const { currentUser } = useAuth();
  // const [quantity, setQuantity] = useState(1);
  const [products, setProduct] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productsCollection = firestore.collection("products");
        const snapshot = await productsCollection.get();

        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          quantity: 1,
        }));

        setProduct(productsData);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, []);

  const setQuantity = (quantity, productIndex) => {
    const newProducts = [...products];
    newProducts[productIndex].quantity = quantity;
    setProduct(newProducts);
  };

  const handleBuyClick = async (product) => {
    try {
      // Get a reference to the "cart" collection
      // const imageURL = await uploadproductsImage(product.imageFile);
      const cartCollection = firestore.collection("cart");

      // Create a new document in the "cart" collection with the product details
      await cartCollection.add({
        userId: currentUser.uid, // Assuming you have a logged-in user, this will associate the cart item with the user.
        productId: product.id,
        name: product.name,
        description: product.description,
        amount: product.amount,
        quantity: product.quantity,
        // imageURL: imageURL,
        createdAt: new Date(),
        // Add any other product details you want to store in the cart collection.
      });

      console.log("Product added to cart successfully!");
      history.push("/cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-white-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 text-black">
          {products.map((product, index) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between ">
                {console.log("Product Details:", product)}
                <div>
                  <h3 className="text-sm text-white-700 ">
                    <a href={product.href}>{product.name}</a>
                  </h3>
                  <p className="mt-1 text-sm text-white-500">
                    {product.description}
                  </p>
                  <p className="mt-1 text-sm text-white-500">
                    GBP {product.amount}
                  </p>
                </div>
                <div className="flex items-center text-white">
                  <QuantityPicker
                    quantity={product.quantity}
                    setQuantity={(q) => setQuantity(q, index)}
                  />
                </div>
              </div>
              <button
                onClick={() => handleBuyClick(product)}
                className="mt-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
