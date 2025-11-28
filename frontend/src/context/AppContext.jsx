import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios"; 

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bot, setBot] = useState([]);
  const [loading, setLoading] = useState(false);
  const [planChoosen, setPlanChoosen] = useState(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await api.get("/auth/me"); 
      const userData = res.data?.data;
      console.log("user data", userData);
      setUser(userData);
      setPlanChoosen(userData?.planChoosen);
    } catch (err) {
      setUser(null);
      setBot([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBots = async (userId) => {
    try {
      setLoading(true);
      const res = await api.get(`/bots/${userId}`); 
      setBot(res.data?.data || []);
    } catch (err) {
      setBot([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(); 
  }, []);

  const value = {
    user,
    setUser,
    bot,
    setBot,
    loading,
    setLoading,
    fetchUser,
    fetchUserBots,
    planChoosen,
    setPlanChoosen
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
