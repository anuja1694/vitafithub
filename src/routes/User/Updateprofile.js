import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../Firebase/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { updateUserDocument } from "../../Firebase/user"; // Import the function

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    setError("");

    const updates = {};
    if (emailRef.current.value !== currentUser.email) {
      updates.email = emailRef.current.value;
    }
    if (passwordRef.current.value) {
      updates.password = passwordRef.current.value;
    }

    try {
      await updateUserDocument(currentUser.uid, updates);
      if (updates.email) {
        await currentUser.updateEmail(updates.email);
      }
      if (updates.password) {
        await updatePassword(updates.password);
      }
      history.push("/");
    } catch (error) {
      setError("Failed to update account");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center ">
          <a className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900 text-white">
            Vitafithub
          </a>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 text-white">
            update Profile
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  ref={emailRef}
                  required
                  defaultValue={currentUser.email}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900  text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  ref={passwordRef}
                  placeholder="Leave blank to keep the same"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900  text-white"
                >
                  Confrm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  ref={passwordConfirmRef}
                  placeholder="Leave blank to keep the same"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update profile
              </button>
            </div>
          </form>
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
