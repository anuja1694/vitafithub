import React, { useState } from "react";
import Navbar from "../../components/Home/Navrbar";
import Footer from "../../components/Home/Footer";

function Faq() {
  const [questionStates, setQuestionStates] = useState({});

  const handleToggleAnswer = (questionId) => {
    setQuestionStates((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  };

  return (
    <div>
      <Navbar />

      <section className="py-24 lg:py-32 bg-white overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap -m-8">
            <div className="w-full md:w-1/2 p-8">
              <h2 className="font-heading text-6xl tracking-tighter text-black">
                Provide some additional information with this FAQ Accordion.
              </h2>
            </div>
            <div className="w-full md:w-1/2 p-8">
              <div className="flex flex-wrap -m-1.5">
                <div className="w-full p-1.5">
                  <button
                    onClick={() => handleToggleAnswer("question1")}
                    className="block p-6 border border-gray-200 hover:border-gray-300 rounded-lg transition duration-200"
                  >
                    <div className="flex flex-wrap items-center justify-between -m-2">
                      <div className="w-auto p-2">
                        <h3 className="font-semibold tracking-tight text-black">
                          How can I register as a user?
                        </h3>
                      </div>
                      <div className="w-auto p-2">
                        <svg
                          width="9"
                          height="14"
                          viewBox="0 0 9 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.5 1.16683L7.33333 7.00016L1.5 12.8335"
                            stroke="#171A1F"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </button>
                  {questionStates["question1"] && (
                    <p className="mt-6 tracking-tight text-black">
                      To register, go to the registration page and provide the
                      required information, such as email, and password.
                    </p>
                  )}
                </div>
                <div className="w-full p-1.5">
                  <button
                    onClick={() => handleToggleAnswer("question2")}
                    className="block p-6 border border-gray-200 hover:border-gray-300 rounded-lg transition duration-200"
                  >
                    <div className="flex flex-wrap items-center justify-between -m-2">
                      <div className="w-auto p-2">
                        <h3 className="font-semibold tracking-tight text-black">
                          What if I forget my password?
                        </h3>
                      </div>
                      <div className="w-auto p-2">
                        <svg
                          width="9"
                          height="14"
                          viewBox="0 0 9 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.5 1.16683L7.33333 7.00016L1.5 12.8335"
                            stroke="#171A1F"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </button>
                  {questionStates["question2"] && (
                    <p className="mt-6 tracking-tight text-black">
                      If you forget your password, you can use the "Forgot
                      Password" option on the login page. You will receive an
                      email with instructions to reset your password securely.
                    </p>
                  )}
                </div>
                <div className="w-full p-1.5">
                  <button
                    onClick={() => handleToggleAnswer("question3")}
                    className="block p-6 border border-gray-200 hover:border-gray-300 rounded-lg transition duration-200"
                  >
                    <div className="flex flex-wrap items-center justify-between -m-2">
                      <div className="w-auto p-2">
                        <h3 className="font-semibold tracking-tight text-black">
                          How can I view the list of available activities and
                          book them?
                        </h3>
                      </div>
                      <div className="w-auto p-2">
                        <svg
                          width="9"
                          height="14"
                          viewBox="0 0 9 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.5 1.16683L7.33333 7.00016L1.5 12.8335"
                            stroke="#171A1F"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </button>
                  {questionStates["question3"] && (
                    <p className="mt-6 tracking-tight text-black">
                      After logging in, navigate to the "Activities" section
                      where you can find a user-friendly list of available
                      activities. Click on an activity to view details and book
                      it.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Faq;
