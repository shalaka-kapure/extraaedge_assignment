import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { updateUser, deleteUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
