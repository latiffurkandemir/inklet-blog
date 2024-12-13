import React, { createContext, useMemo, useState, useContext, useEffect } from "react";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function useColorMode() {
  return useContext(ColorModeContext);
}

export function ColorModeProvider({ children }) {
  const [mode, setMode] = useState("light");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const contextValue = useMemo(() => ({ toggleColorMode }), []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={contextValue}>
      {children(mode)}
    </ColorModeContext.Provider>
  );
}
