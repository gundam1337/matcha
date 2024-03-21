import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../UserSlice/dataReducer';

export const store = configureStore({
  reducer: {
    // Add the slice reducers here
    data: dataReducer,
  },
  // Middleware can be customized here if needed
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myCustomMiddleware),
});
