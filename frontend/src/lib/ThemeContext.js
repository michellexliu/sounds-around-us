import { useContext } from 'react';

import { createContext } from 'react';
export const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
