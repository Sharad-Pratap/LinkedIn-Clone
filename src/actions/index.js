import { async } from "@firebase/util";
import auth, { storage, db } from "../firebase";
import { ref } from "firebase/storage";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { query, onSnapshot, orderBy } from "firebase/firestore";
import { SET_LOADING_STATUS, GET_ARTICLES } from "./actionType";

// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// import auth from "../firebase"
// export const signInAPI = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider)
//         .then((payload) => {
//             console.log(payload);
//         })
//         .catch((error) => alert(error.message));
// };


// export function getUserAuth() {
//     return (dispatch) => {
//         auth.onAuthStateChanged(async (user) => {
//             if (user) {
//                 dispatch(setUser(user));
//             }
//         });
//     };
// }


export const setLoading = (status) => ({
    type: SET_LOADING_STATUS,
    status: status,
});

export const getArticles = (payload) => ({
    type: GET_ARTICLES,
    payload: payload,
})

export function postArticleAPI(payload) {
    return (dispatch) => {
        dispatch(setLoading(true));

        if (payload.image != "") {
            const storageRef = ref(storage, `images/${payload.image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, payload.image);
            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Progress : ${progress}%`);
                if (snapshot.state === 'RUNNING') {
                    console.log(`Progress : ${progress}%`)

                }
            }, error => console.log(error.code),
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    // db.collection("articles").add({
                    //     actor: {
                    //         description: payload.use.email,
                    //         title: payload.user.displayname,
                    //         date: payload.timestamp,
                    //         image: payload.user.photoURL,
                    //     },
                    //     video: payload.video,
                    //     sharedImage: downloadURL,
                    //     comments: 0,
                    //     description: payload.description,
                    // })
                    try {
                        const docRef = await addDoc(collection(db, "articles"), {
                            actor: {
                                description: payload.user.email,
                                title: payload.user.displayName,
                                date: payload.timestamp,
                                image: payload.user.photoURL,
                            },
                            video: payload.video,
                            sharedImage: downloadURL,
                            comments: 0,
                            description: payload.description,
                        });
                        dispatch(setLoading(false));

                        // console.log("Document written with ID: ", docRef.id);
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }

                });
        } else if (payload.video) {
            try {
                const docRef = addDoc(collection(db, "articles"), {
                    actor: {
                        description: payload.user.email,
                        title: payload.user.displayName,
                        date: payload.timestamp,
                        image: payload.user.photoURL,
                    },
                    video: payload.video,
                    sharedImage: "",
                    comments: 0,
                    description: payload.description,
                });
                dispatch(setLoading(false));
                // console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }

        }

    };
}


export function getArticlesAPI() {
    return (dispatch) => {
        let payload;
        const q = query(collection(db, "articles")
            , orderBy("actor.date", "desc"));
        const unsub = onSnapshot(q, (snapshot) => {
            payload = snapshot.docs.map((doc) => doc.data());
            // console.log(payload);
            dispatch(getArticles(payload));
        })
    }
}