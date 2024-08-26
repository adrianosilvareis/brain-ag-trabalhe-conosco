import { useContext } from "react";
import { AppProdutorContext } from "../context/AppProdutorContext";

export const useProdutorContext = () => {
  const context = useContext(AppProdutorContext);
  if (context === undefined) {
    throw new Error('useProdutorContext must be used within an AppProdutorProvider');
  }
  return context;
};