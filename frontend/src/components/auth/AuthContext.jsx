import {
  createContext,
  useState,
  useContext,
  useEffect
} from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetch("http://localhost:8080/api/auth/user", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data.firstname ? { name: data.firstname } : null);
          console.log("User data:", data);
          setIsLoggedIn(true);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  console.log("isLoggedin:", isLoggedIn); // Log the isLoggedin state


  const value = { user, setUser };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};