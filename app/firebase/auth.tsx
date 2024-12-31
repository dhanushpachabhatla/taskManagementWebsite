import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
// var uid = ''
export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user
    // console.log("User ID:", user.uid);
    localStorage.setItem('userId', user.uid);
    // uid = user.uid;
    return userCredential.user;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// export const senduid =  () =>{
//   return uid;
// }

export const signup = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user
    console.log("User ID:", user.uid);
    return userCredential.user;
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('userId');
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};
