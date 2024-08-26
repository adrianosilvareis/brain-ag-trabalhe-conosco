import { useContext } from "react";
import { AppCulturaContext } from "../context/AppCulturaContext";

export const useCulturaContext = () => {
  const context = useContext(AppCulturaContext);
  if (context === undefined) {
    throw new Error('useCulturaContext must be used within an AppCulturaProvider');
  }
  return context;
};