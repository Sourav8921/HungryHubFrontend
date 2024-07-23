// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useContext, useEffect, useState } from "react";

// const AuthContext = useContext({});

// const AuthProvider = ({ children }) => {
//   const [auth, setAuthState] = useState(null);

//   const getAuthState = async () => {
//     try {
//       const token = await AsyncStorage.getItem("auth_token");
//       setAuthState(token);
//     } catch (error) {
//       setAuthState(null);
//     }
//   };

//   const setAuth = async (auth) => {
//     try {
//       await AsyncStorage.setItem("auth_token", auth);
//       setAuthState(auth);
//     } catch (error) {
//         return Promise.reject(error);
//     }
//   };

//   useEffect(() => {
//     getAuthState();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };
