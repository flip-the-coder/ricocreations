import { action, observable, makeAutoObservable } from 'mobx';
import { BuilderBranding } from '../models/BuilderBranding';
import { getImageUrl } from '../utils/ImageUtils';

export const DEFAULT_THEME = {
   colors: {
      primary: '#3498db',
      secondary: '#2ecc71',
      text: '#333',
      background: '#fff',
   },
   typography: {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
   },
   spacing: {
      small: '8px',
      medium: '16px',
      large: '24px',
   },
};

export class ThemeStore {
   @observable theme: any = DEFAULT_THEME;
   @observable themeName: string = 'RicoCreations';
   @observable isLoadingTheme: boolean = true;
   @observable DefaultTheme = DEFAULT_THEME;
   constructor() {
      makeAutoObservable(this);
   }

   setDefaultValues(builderBranding: BuilderBranding) {
      const currentTheme = Object.assign({}, this.theme);

      const logo =
         builderBranding && builderBranding.fullPathLogoUrl
            ? builderBranding.fullPathLogoUrl
            : builderBranding && builderBranding.logo
            ? getImageUrl(builderBranding.logo, true)
            : undefined;
      currentTheme.brand = logo || this.theme.brand;
      currentTheme.myHomesBrand = logo || this.theme.myHomesBrand;
      currentTheme.homePDF.logoPNG = logo || this.theme.homePDF.logoPNG;

      currentTheme.colors.primary =
         builderBranding && builderBranding.mainColor
            ? builderBranding.mainColor
            : this.theme.colors.primary;
      currentTheme.colors.secondaries[0] =
         builderBranding && builderBranding.secondaryColor
            ? builderBranding.secondaryColor
            : this.theme.colors.secondaries[0];

      if (currentTheme && currentTheme.colors.primary) {
         currentTheme.sideMenu.color = currentTheme.colors.primary;
         currentTheme.sidePanel.lookingForMore.titleColor =
            currentTheme.colors.primary;
         currentTheme.sidePanel.lookingForMore.buttonBackgroundColor =
            currentTheme.colors.primary;
         currentTheme.sidePanel.lookingForMore.buttonHoverBackgroundColor =
            currentTheme.colors.primary;
         currentTheme.topNavigationBar.color.buttonColorActive =
            currentTheme.colors.primary;
         currentTheme.topNavigationBar.color.buttonColorHover =
            currentTheme.colors.primary;
         currentTheme.topNavigationBar.color.buttonTextColorActive =
            currentTheme.colors.primary;
         currentTheme.topNavigationBar.changeButton.colorTitle =
            currentTheme.colors.primary;
         currentTheme.configuratorPanel.color.marketingTextColor =
            currentTheme.colors.primary;
         currentTheme.configuratorPanel.color.marketingTextLinkIconColor =
            currentTheme.colors.primary;
         currentTheme.configuratorPanel.color.optionListingHeaderHRlineColor =
            currentTheme.colors.primary;
         currentTheme.configuratorPanel.color.tooltipHoverColor =
            currentTheme.colors.primary;
         currentTheme.configuratorPanel.color.tooltipHoverTextColor =
            currentTheme.colors.primary;
         currentTheme.scheduleVisit.backgroundColorButton =
            currentTheme.colors.primary;
         currentTheme.scheduleVisit.hoverBackgroundColor =
            currentTheme.colors.primary;
         currentTheme.socialMediaButton.onHoverBackgroundColor =
            currentTheme.colors.primary;
         currentTheme.socialMediaButton.onButtonHoverBackgroundColor =
            currentTheme.colors.primary;
      }
      if (currentTheme && currentTheme.colors.primary) {
         if (
            currentTheme.topNavigationBar.changeButton.textDecoration === 'none'
         ) {
            currentTheme.topNavigationBar.changeButton.changeButtonHoverColor =
               currentTheme.colors.common[0];
         } else {
            currentTheme.topNavigationBar.changeButton.changeButtonHoverColor =
               currentTheme.colors.primary;
         }
         currentTheme.socialMediaButton.backgroundColor =
            currentTheme.colors.primary;
         currentTheme.sideMenu.hoverColor = currentTheme.colors.primary;
      }
      this.setTheme(currentTheme);
   }

   loadTheme(location: Location, subDomain: string) {
      this.setIsLoadingTheme(true);
      let theme = null;

      let themeName: string | null = subDomain;
      this.setThemeName(themeName);
      theme = this.getTheme();

      if (!theme && process.env.NODE_ENV === 'development') {
         // If we can't get a theme from first part of url, we try seeing if we can get one from url query parameter, and we only in dev
         const params = new URLSearchParams(location.search);
         themeName = params.get('theme');
         theme = this.getTheme();
      }

      if (!theme) {
         this.setThemeName('paradigm');
         theme = this.getTheme();
      }

      if (theme) {
         this.setTheme((theme! as any).default);
      }
      this.setIsLoadingTheme(false);
   }

   private getTheme() {
      let theme: any;
      return theme;
   }

   @action
   setTheme(theme: any) {
      this.theme = DEFAULT_THEME;
   }

   @action
   setThemeName(themeName: string) {
      this.themeName = themeName;
   }

   @action
   setIsLoadingTheme(isLoadingTheme: boolean) {
      this.isLoadingTheme = isLoadingTheme;
   }
}
