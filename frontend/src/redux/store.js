// import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
// import {
//   persistStore,
//   persistReducer,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import userReducer from './slices/userSlice';
// import adminReducer from './slices/adminSlice';
// const rootReducer = combineReducers({
//   user: userReducer,
//   admin: adminReducer,
// });
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['user', 'admin'],
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer);
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
//       },
//     }),
// });
// export const persistor = persistStore(store);
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice'; 

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user','cart'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
