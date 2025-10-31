import { configureStore } from '@reduxjs/toolkit';
import inexReducer from './slices/inexSlice';
 
export const store = configureStore({
  reducer: {
    inex: inexReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;