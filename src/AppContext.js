import { createContext } from 'react';

// Shared application context (kept in a .js file so lint doesn't treat this as a component file)
export const AppContext = createContext();

export default AppContext;
