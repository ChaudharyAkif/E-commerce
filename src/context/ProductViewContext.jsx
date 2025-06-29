import React, { createContext, useContext, useState } from "react";

// 1. Create context
const ProductViewContext = createContext();

export const ProductViewProvider = ({ children }) => {
  // 2. state to hold which product is currently "quick view"-ed
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <ProductViewContext.Provider value={{ quickViewProduct, setQuickViewProduct }}>
      {children}
    </ProductViewContext.Provider>
  )
};

export const useProductView = () => useContext(ProductViewContext);
