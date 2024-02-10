import { createSlice } from "@reduxjs/toolkit"; // a state management library tool for react redux

// Initial state of the user before login
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

// state reducer for the authorization of the user..
export const authSlice = createSlice({
  name: "auth", // to represent auth workflow
  initialState,
  //actions (like functions) modifying the state according to the actions done by the user..
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light"; // changes light to dark and vice versa(here inital state cant be directly changed and so new value is assigned)
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends not exists!");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post; // return posts that are matched with the given post id (essentially means that the old post is replaced with yhe new post from payload) this occurs when like of post is changed etc.
        return post; // what post are in database (original post is returned)
      });

      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
