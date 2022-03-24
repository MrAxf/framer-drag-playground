import React, { useState, useContext } from 'react';

const ThemeContext = React.createContext({
  curTheme: 'default',
  setTheme: () => {},
});

export function Theme({ theme, children }) {
  const [curTheme, setTheme] = useState(theme);
  return (
    <ThemeContext.Provider value={(curTheme, setTheme)}>
      <ThemeContext.Consumer>
        {({ curTheme }) =>
          React.Children.map(children, (child) => React.cloneElement(child))
        }
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const { curTheme, setTheme } = useContext(ThemeContext);
  return { theme: curTheme, setTheme };
}
