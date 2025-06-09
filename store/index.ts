import { combineReducers, configureStore } from '@reduxjs/toolkit';
import SessionReducer from '@/slices/loginSlice';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileReducer from '@/slices/profileSlice';
import UsersReducer from '@/slices/usersSlice';
import OrganizationsReducer from '@/slices/organizationSlice';
import { thunk } from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['session', 'profile', 'users', 'organizations'],
};

const persistedSessionReducer = persistReducer(persistConfig, SessionReducer);
const persistedProfileReducer = persistReducer(persistConfig, ProfileReducer);
const persistedUsersReducer = persistReducer(persistConfig, UsersReducer);
const persistedOrganizationsReducer = persistReducer(persistConfig, OrganizationsReducer);

export const rootReducer = combineReducers({
    session: persistedSessionReducer,
    profile: persistedProfileReducer,
    users: persistedUsersReducer,
    organizations: persistedOrganizationsReducer,
})

// Create store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 👇 Ignore redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});

// Create persistor
export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;