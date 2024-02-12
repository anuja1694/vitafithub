import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import { createUserDocument } from "./user";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  function signup(email, password) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return createUserDocument(user, email);
      })
      .catch((error) => {
        // Handle signup error
        console.error("Error signing up:", error);
        throw error;
      });
  }

  function login(email, password) {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return user.getIdToken().then((token) => {
          return { user, token };
        });
      });
  }

  function logout() {
    return auth.signOut();
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setLoading(false);
  //     setCurrentUser(user);

  //     if (user) {
  //       user.getIdTokenResult().then((token) => {
  //         setIsAdmin(token.claims.admin);
  //       });
  //     } else {
  //       setIsAdmin(false);
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  async function onAuthStateChanged(user) {
    if (user) {
      const token = await user.getIdTokenResult();
      setIsAdmin(token.claims.admin);
    } else {
      setIsAdmin(false);
    }
    setCurrentUser(user);
    setLoading(false);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onAuthStateChanged);
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    isAdmin,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
