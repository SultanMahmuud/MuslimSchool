

import {
   getFromLocalStorage,
   removeFromLocalStorage,
   setToLocalStorage,
} from '@/utils/local-storage';

let authKey = 'user';


export const storeUserInfo = ({ accessToken }) => {
  
   return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authData = getFromLocalStorage("user");

  if (!authData) return null;

  try {
    const parsed = JSON.parse(authData); // if you're storing full user object
     // assume token is stored inside the user object

    return {
      ...parsed,
      role: parsed.role

    };

    
  } catch (error) {
    console.error("Failed to decode user info:", error);
    return null;
  }
};
export const isLoggedIn = () => {
  const authToken = getFromLocalStorage("user");
  if (!authToken) return false;

  try {
    const parsed = JSON.parse(authToken);
    return !!parsed.token; // make sure token exists
  } catch (err) {
    console.error("Invalid JSON in localStorage for 'user'", err);
    return false;
  }
};

export const removeUser = () => {
   return removeFromLocalStorage(authKey);
};

// export const getNewAccessToken = async () => {
//    return await axiosInstance({
//       url: 'http://localhost:5000/api/v1/auth/refresh-token',
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       withCredentials: true,
//    });
// };
