import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { firestore } from "../../Firebase/firebase";
import { useAuth } from "../../Firebase/AuthContext";
import StripeCheckout from "react-stripe-checkout";
import { useHistory } from "react-router-dom";

function Cart() {
  const [open, setOpen] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Assuming you have a logged-in user, use their UID to fetch their cart items.
        if (currentUser) {
          const cartCollection = firestore.collection("cart");
          const querySnapshot = await cartCollection
            .where("userId", "==", currentUser.uid)
            .get();

          const cartItemsData = querySnapshot.docs.map((doc) => doc.data());
          setCartItems(cartItemsData);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [currentUser]);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.amount * item.quantity,
      0
    );
  };

  const handleRemoveItemClick = async (productId) => {
    try {
      // Get a reference to the document in the "cart" collection based on productId
      const cartCollection = firestore.collection("cart");
      const productDoc = await cartCollection.doc(productId).get();

      // Check if the document exists before attempting to delete
      if (productDoc.exists) {
        await productDoc.ref.delete();
        // Remove the item from the cartItems state
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item.productId !== productId)
        );
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const handleToken = (token) => {
    try {
      const ordersCollection = firestore.collection("orders");
      const createdAt = new Date();
      cartItems.forEach((item) => {
        ordersCollection.add({
          userId: currentUser.uid,
          createdAt,
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          amount: item.amount,
        });
      });

      // Clear the cart after successful payment and saving the order details
      setCartItems([]);
      history.push("/orders");
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cartItems.map((product) => (
                              <li key={product.productId} className="flex py-6">
                                {/* <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div> */}

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-black">
                                      <h3>
                                        <a
                                          href={product.href}
                                          className="text-black"
                                        >
                                          {product.name}
                                        </a>
                                      </h3>
                                      <p className="ml-4 text-black">
                                        GBP {product.amount * product.quantity}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-black">
                                      {product.description}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-black">
                                      Qty {product.quantity}
                                    </p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() =>
                                          handleRemoveItemClick(
                                            product.productId
                                          )
                                        }
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-black">
                        <p className="text-black">Subtotal</p>
                        <p className="text-black">
                          GBP {calculateSubtotal().toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <StripeCheckout
                          stripeKey={
                            process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
                          }
                          key={process.env.REACT_APP_STRIPE_SECRET}
                          token={handleToken}
                          amount={calculateSubtotal() * 100} // Amount in cents
                          currency="GBP"
                          name="Your Store Name"
                          description="Shopping Cart"
                        >
                          <button className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                            Checkout
                          </button>
                        </StripeCheckout>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Cart;
