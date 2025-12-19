import { combineReducers, configureStore } from '@reduxjs/toolkit';
import SessionReducer from '@/slices/loginSlice';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileReducer from '@/slices/profileSlice';
import UsersReducer from '@/slices/usersSlice';
import OrganizationsReducer from '@/slices/organizationSlice';
import ExplorerReducer from '@/slices/explorerSlice';
import AdminCompanyReducer from '@/slices/adminCompanySlice';
import AdminCompanyRouteReducer from '@/slices/adminCompanyRouteSlice';
import AdminCompanyGuideReducer from '@/slices/adminCompanyGuideSlice';
import AdminCompanyAppointmentsReducer from '@/slices/adminCompanyAppoinmentsSlice';
import { thunk } from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['session', 'profile', 'users', 'organizations', 'adminCompany', 'adminCompanyRoute', 'adminCompanyGuide', 'adminCompanyAppointments'],
};

export const rootReducer = combineReducers({
  session: SessionReducer,
  profile: ProfileReducer,
  users: UsersReducer,
  organizations: OrganizationsReducer,
  explorer: ExplorerReducer,
  adminCompany: AdminCompanyReducer,
  adminCompanyRoute: AdminCompanyRouteReducer,
  adminCompanyGuide: AdminCompanyGuideReducer,
  adminCompanyAppointments: AdminCompanyAppointmentsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
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