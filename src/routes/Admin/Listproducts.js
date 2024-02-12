import React, { useState, useEffect } from "react";
import { firestore } from "../../Firebase/firebase";
import { useHistory } from "react-router-dom";

function Listproducts() {
  const history = useHistory();
  const [products, setProducts] = useState([]); // State variable to hold products

  const goBack = () => {
    history.push("/dashboard");
  };

  // ... (existing code)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await firestore.collection("products").get();

        const productsData = [];
        allProducts.forEach((productDoc) => {
          const productData = productDoc.data();
          productsData.push({
            productsUid: productData.productsUid,
            createdAt: productData.createdAt.toDate(),
            name: productData.name,
            description: productData.description,
            image: productData.image,
            quantity: productData.quantity,
            amount: productData.amount,
          });
        });

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // ... (rest of the code)

  // const formatDate = (timestamp) => {
  //   if (
  //     !timestamp ||
  //     !timestamp.toDate ||
  //     typeof timestamp.toDate !== "function"
  //   ) {
  //     return "Invalid Date";
  //   }

  //   const dateObject = new Date(timestamp.toDate());
  //   return dateObject.toLocaleString(); // You can use other formatting options as needed
  // };

  const deleteProduct = async (productsUid) => {
    try {
      // Perform deletion logic here
      const productRef = firestore.collection("products").doc(productsUid);
      await productRef.delete();
      console.log("Product with UID:", productsUid, "deleted successfully!");
      // After successful deletion, you can update the products state to remove the deleted product
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.productsUid !== productsUid)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const editProduct = (productsUid) => {
    history.push(`/editproducts/${productsUid}`);
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <button
        onClick={goBack}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Go Back
      </button>
      <div className="container mx-auto">
        <div className="flex items-center justify-center">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="border">productsUid</th>
                {/* <th className="border">Created At</th> */}
                <th className="border">Name</th>
                <th className="border">description</th>
                <th className="border">image</th>
                <th className="border">amount</th>
                <th className="border">quantity</th>
                <th className="border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.productsUid}>
                  <td className="border" style={{ width: "200px" }}>
                    {product.productsUid}
                  </td>
                  {/* <td className="border" style={{ width: "200px" }}>
                    {formatDate(product.createdAt.toDate())}
                  </td> */}
                  <td className="border" style={{ width: "200px" }}>
                    {product.name}
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    {product.description}
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    {product.image}
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    {product.amount}
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    {product.quantity}
                  </td>
                  <td className="border" style={{ width: "200px" }}>
                    <div className="flex justify-center">
                      <button
                        onClick={() => deleteProduct(product.productsUid)}
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          width: "80px",
                        }}
                        className="px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => editProduct(product.productsUid)}
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          width: "80px",
                          marginLeft: "10px",
                        }}
                        className="px-4 py-2 rounded"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Listproducts;
