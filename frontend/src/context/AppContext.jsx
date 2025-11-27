import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios"; 

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [planChoosen, setPlanChoosen] = useState(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await api.get("/auth/me"); 
      setUser(res.data?.data);
      setPlanChoosen(user.planChoosen);
    } catch (err) {
      setUser(null); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = { user, setUser, bots, setBots, loading, setLoading, fetchUser };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
