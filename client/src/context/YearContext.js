import React, { createContext, useState, useContext } from 'react';

// Create a context for the selected year
const YearContext = createContext();

// Provider component that wraps the app and makes the year available to any child component
export function YearProvider({ children }) {
  const [selectedYear, setSelectedYear] = useState(null);

  return (
    <YearContext.Provider value={{ selectedYear, setSelectedYear }}>
      {children}
    </YearContext.Provider>
  );
}

// Custom hook to use the year context
export function useYear() {
  const context = useContext(YearContext);
  if (context === undefined) {
    throw new Error('useYear must be used within a YearProvider');
  }
  return context;
} 