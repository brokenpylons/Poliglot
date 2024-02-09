import React from 'react';

export const TabsContext = React.createContext({
  tabNames: [],
  setActiveTab: () => {}
});
