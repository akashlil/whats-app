import "../styles/globals.css";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./login";
import Loading from "../components/Loading/Loading";
import { doc, setDoc, collection, Timestamp } from "firebase/firestore";
import { useEffect } from "react";
function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const userRef = collection(db, "users");
      const data = {
        displayName: user.displayName,
        email: user.email,
        lastSeen: Timestamp.fromDate(new Date()),
        photoURL: user.photoURL,
      };
      setDoc(doc(userRef, user.uid), data, { merge: true }).catch(alert);
    }
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;
  return <Component {...pageProps} />;
}

export default MyApp;
