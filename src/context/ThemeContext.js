import { createContext, useReducer } from "react";
const ThemeContexttt = createContext();

const initialData = {
  theme:
    localStorage.getItem("myTheme") === null
      ? "Light"
      : localStorage.getItem("myTheme") === "Light"
      ? "Light"
      : "Dark",
};

//
const reducer = (firstState, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...firstState, theme: action.newValue };
    default:
      return firstState;
  }
};

export function ThemeProvider({ children }) {
  const [firstState, dispatch] = useReducer(reducer, initialData);
  const toggleTheme = (newTheme) => {
    localStorage.setItem("myTheme", newTheme);
    dispatch({ type: "CHANGE_THEME", newValue: newTheme });
  };
  return (
    <ThemeContexttt.Provider value={{ ...firstState, toggleTheme }}>
      {children}
    </ThemeContexttt.Provider>
  );
}

export default ThemeContexttt;
