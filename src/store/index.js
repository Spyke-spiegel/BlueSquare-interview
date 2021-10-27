import { createStore } from "vuex";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  onSnapshot,
  addDoc,
  serverTimestamp,
  collection,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import "../firebase/init";

const db = getFirestore();

const initialState = () => {
  if (localStorage.getItem("user")) {
    let retrieveOBJ = localStorage.getItem("user");
    let objJSON = JSON.parse(retrieveOBJ);
    console.log(objJSON);
    return {
      user: objJSON,
      error: null,
      projectList: [],
    };
  } else {
    return { user: null, error: null, projectList: [] };
  }
};

export default createStore({
  state: initialState(),
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    addProject(state, paylaod) {
      state.projectList.push(paylaod);
    },
    setProject(state, payload) {
      state.projectList = payload
    }
  },
  actions: {
    async signInGoogle({ commit }) {
      const provider = await new GoogleAuthProvider();
      const auth = await getAuth();
      await signInWithPopup(auth, provider)
        .then(async (response) => {
          // await console.log(response);
          const newUser = await {
            uid: response.user.uid,
            displayName: response._tokenResponse.displayName,
            email: response._tokenResponse.email,
            photo: response._tokenResponse.photoUrl,
            firstName: response._tokenResponse.firstName,
            lastname: response._tokenResponse.lastName,
          };
          await commit("setUser", newUser);
          let objStringify = await JSON.stringify(newUser);
          await localStorage.setItem("user", objStringify);
          if (response._tokenResponse.isNewUser) {
            // Create a new user entry in firestore
            await console.log(newUser.uid);
            // await fireSet("users", newUser.uid, newUser);
            try {
              await setDoc(doc(db, "users", newUser.uid), {
                uid: response.user.uid,
                displayName: response._tokenResponse.displayName,
                email: response._tokenResponse.email,
                photo: response._tokenResponse.photoUrl,
                firstName: response._tokenResponse.firstName,
                lastname: response._tokenResponse.lastName,
              });
              // await console.log("Document written with ID: ", docRef.id);
            } catch (e) {
              await console.error("Error adding document: ", e);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          commit("setError", error.message);
        });
    },

    getProjectList({ commit }) {
      // retrieve the list of project the user have access
      const unsub = onSnapshot(doc(db, "users", this.state.user.uid), (doc) => {
        console.log("Current data: ", doc.data().projectList);
        if (doc.data().projectList) {
          commit("setProject", doc.data().projectList);
          console.log("Project List Updated => ", this.state.projectList);
        } else {
          console.log("No Project subscribed");
        }
      });

      // const data = await getDoc(doc(db, "users", this.state.user.uid))
      // await console.log(data.data())
    },

    async createProject({ commit }, projectName) {
      //Add a project to firestore
      let projectCreation = await setDoc(doc(db, "projects", projectName), {
        Admin: this.state.user.uid,
        Members: [this.state.user.uid],
        Name: projectName,
      });
      // await console.log("Project Id = ", docId);
      //add the project to the user document
      await commit("addProject", projectName);
      const addToUser = await updateDoc(doc(db, "users", this.state.user.uid), {
        projectList: arrayUnion({ projectId: projectName }),
      });
    },

    unsub() {}
  },
  modules: {},
  getters: {
    getUser(state) {
      return state.user;
    },
    isUserAuth(state) {
      return !!state.user;
    },
    getError(state) {
      return state.error;
    },
    getProject(state) {
      return state.projectList;
    },
  },
});
