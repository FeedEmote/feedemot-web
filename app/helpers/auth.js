import { ref, firebaseAuth } from 'config/constants'

export default function auth () {
  const provider = new firebaseAuth.GoogleAuthProvider()
  return firebaseAuth().signInWithPopup(provider)
}

export function checkIfAuthed (store) {
  return store.getState().users.isAuthed
}

export function logout () {
  return firebaseAuth().signOut().then(console.log(firebaseAuth().currentUser))
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}`)
    .set(user)
    .then(() => user)
}
