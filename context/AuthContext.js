// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useContext, useEffect, useState } from "react";

// const AuthContext = useContext({});

// const AuthProvider = ({ children }) => {
//   const [auth, setAuthState] = useState(false);

//   const getAuthState = async () => {
//     try {
//       const authData = JSON.parse(authDataString || {});
//       setAuthState(authData);
//     } catch (error) {
//       setAuthState({});
//     }
//   };

//   const setAuth = async (auth) => {
//     try {
//       await AsyncStorage.setItem("auth_token", JSON.stringify(auth));
//       setAuthState(auth);
//     } catch (error) {
//       Promise.reject(error);
//     }
//   };

//   useEffect(() => {
//     getAuthState();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//         {children}
//     </AuthContext.Provider>
//   )
// };

// export { AuthContext, AuthProvider };