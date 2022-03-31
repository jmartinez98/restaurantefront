import { createContext, useEffect } from "react";
import { useSocket } from "./useSocket";
export const Context = createContext(null);

const SocketCotext = ({ children }) => {
  const { socket, online } = useSocket({
    serverPath: process.env.REACT_APP_SOCKET_URL,
  });
  useEffect(() => {
    console.log(online);
  }, [online]);

  return (
    <Context.Provider value={{ socket, online }}>{children}</Context.Provider>
  );
};

export default SocketCotext;
