import React, { useRef, useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useAuth } from "../../Firebase/AuthContext";
import { Link } from "react-router-dom";

const Forgotpassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instruction");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    // <>
    //   <Container
    //     className="d-flex align-items-center justify-content-center"
    //     style={{ minHeight: "100vh" }}
    //   >
    //     <div className="w-100" style={{ maxWidth: "400px" }}>
    //       <Card>
    //         <Card.Body>
    //           <h2 className="text-center mb-4 ">Password Reset</h2>
    //           {error && <Alert variant="danger">{error}</Alert>}
    //           {message && <Alert variant="success">{message}</Alert>}
    //           <Form onSubmit={handleSubmit}>
    //             <Form.Group id="email">
    //               <Form.Label>Email</Form.Label>
    //               <Form.Control type="email" ref={emailRef} required />
    //             </Form.Group>
    //             <Button disabled={loading} className="w-100 mt-5" type="submit">
    //               Reset Password
    //             </Button>
    //           </Form>
    //           <div className="w-100 text-center mt-2">
    //             <Link to="/login">Login</Link>
    //           </div>
    //         </Card.Body>
    //         <div className="w-100 text-center mt-5 ">
    //           Need an account?
    //           <Link to="/signup">Signup</Link>
    //         </div>
    //       </Card>
    //     </div>
    //   </Container>
    // </>

    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center ">
          <a className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900 text-white">
            Vitafithub
          </a>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 text-white">
            Reset Password
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
                Reset Password
              </button>
            </div>
          </form>
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
          {message && (
            <p className="mt-4 text-center text-green-500">{message}</p>
          )}{" "}
          <p className="mt-10 text-center text-sm text-gray-500">
            Not to login?{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 text-white"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Forgotpassword;
