/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const BadgeContext = createContext();

export const BadgeProvider = ({ children }) => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [wishlistItemsCount, setWishlistItemsCount] = useState(0);

  return (
    <BadgeContext.Provider value={{ cartItemsCount, setCartItemsCount, wishlistItemsCount, setWishlistItemsCount }}>
      {children}
    </BadgeContext.Provider>
  );
};

export default BadgeContext;