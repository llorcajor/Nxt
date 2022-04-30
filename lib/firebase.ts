import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDIW4gUZO9_of8Qyf_KBQyqxBOcF612zf0",
  authDomain: "nextfire-b2365.firebaseapp.com",
  projectId: "nextfire-b2365",
  storageBucket: "nextfire-b2365.appspot.com",
  messagingSenderId: "1094493348741",
  appId: "1:1094493348741:web:df6b8494513902b60fdaec",
  measurementId: "G-F58MN1FZMK",
};

//A veces en producción por la forma que esta hecho next intentara inicializar 2 veces firebase, pero con la siguiente linea de código hacemos que unicamente lo haga una vz
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
