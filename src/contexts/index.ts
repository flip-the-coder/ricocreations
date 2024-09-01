import React from 'react';
import { AuthStore } from '../stores/AuthStore';
import { AppStore } from '../stores/AppStore';
import { IntlStore } from '../stores/IntlStore';
import { ThemeStore } from '../stores/ThemeStore';

export const storesContext = React.createContext({
   themeStore: new ThemeStore(),
   authStore: new AuthStore(),
   appStore: new AppStore(),
   intlStore: new IntlStore(),
});
