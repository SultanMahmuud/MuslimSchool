import { baseApi } from './api/baseApi';
import { alertReducer } from './features/reducer/alertReducer';

import authReducer from './features/slice/authSlice';
export const rootReducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    alert: alertReducer,
    
    auth: authReducer
};
