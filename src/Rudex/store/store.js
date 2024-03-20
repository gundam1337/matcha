import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { userProfileReducer } from "../reducers/UserProfileReducer";

const rootReducer = combineReducers({
  userProfile: userProfileReducer,
  // auth: authReducer
});

const store = configureStore({
  reducer: rootReducer,
  // You can add more middleware and enhancers here
});

export default store;
