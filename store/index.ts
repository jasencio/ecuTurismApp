import { combineReducers, configureStore } from '@reduxjs/toolkit';
import SessionReducer from '@/slices/loginSlice';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileReducer from '@/slices/profileSlice';
import UsersReducer from '@/slices/usersSlice';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['session', 'profile', 'users'],
};

export const rootReducer = combineReducers({
    session: persistReducer(  persistConfig, SessionReducer),
    profile: ProfileReducer,
    users: UsersReducer,
})

// Create store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

// Create persistor
export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;