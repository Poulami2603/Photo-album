import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./Slice";

export const Store = configureStore({
    reducer: {
        Auth: AuthSlice.reducer
    }
})