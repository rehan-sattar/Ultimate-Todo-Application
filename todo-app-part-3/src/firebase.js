import * as firebase from "firebase";
const config = {
    apiKey: "AIzaSyB95qumETKn5oHkm_iCpUV5EGbdcJeQODQ",
    authDomain: "ultimate-todo-list-partiii.firebaseapp.com",
    databaseURL: "https://ultimate-todo-list-partiii.firebaseio.com",
    projectId: "ultimate-todo-list-partiii",
    storageBucket: "ultimate-todo-list-partiii.appspot.com",
    messagingSenderId: "241672973104"
};
firebase.initializeApp(config);

const fireStore = firebase.firestore();
fireStore.settings({
    timestampsInSnapshots: true
});
export {
    fireStore
};
