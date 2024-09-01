import React from 'react';
import { AuthStore } from '../stores/AuthStore';
import { AppStore } from '../stores/AppStore';
import { IntlStore } from '../stores/IntlStore';
import { ThemeStore } from '../stores/ThemeStore';
import { CartStore } from '../stores/CartStore';

export const storesContext = React.createContext({
    themeStore: new ThemeStore(),
    authStore: new AuthStore(),
    appStore: new AppStore(),
    intlStore: new IntlStore(),
    cartStore: new CartStore() // Default value (you may choose to make this a placeholder)
});
