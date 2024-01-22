// userReducer.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const saveUsersToLocalStorage = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

const sendUsersToServer = async (users) => {
  try {
    const response = await axios.post("https://example.com/api/users", {
      users,
    });
    console.log("Data sent to server:", response.data);
  } catch (error) {
    console.error("Error sending data to server:", error.message);
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    initializeDatabase: (state) => {
      // Save users to local storage before clearing the array
      saveUsersToLocalStorage(state.users);

      // Send users to the server
      sendUsersToServer(state.users);

      // Clear the users array
      state.users = [];
    },
  },
});

export const { addUser, initializeDatabase } = userSlice.actions;
export default userSlice.reducer;
