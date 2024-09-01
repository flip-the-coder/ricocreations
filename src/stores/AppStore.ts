import { action, observable, makeAutoObservable } from 'mobx';
// import { SavedDesign } from '../models/SavedDesign';

export class AppStore {
   public static readonly CONFIG_ELEM_ID_PREFI = 'CP_';
   public static readonly MY_SELECTIONS_CONTAINER = 'mySelectionsContainer';
   public static readonly QUESTION_CONTAINER = 'questionContainer';
   public static readonly SIDE_PANEL = 'side_panel';
   public static readonly DRAG_HANDLE = 'drag_handle';
   public static readonly HIDE_SCROLLBAR = 'hide-scrollbar';
   public static readonly STEP_ITEM = 'step_item';
   public static readonly QUESTION_ITEM = 'question_item';
   public static readonly SCROLL_HELPER = 'ScrollHelper';
   public static readonly SUMMARY_STEP_ITEM = 'Summary_Step_Item';
   public static readonly QUESTION_SEARCH_TOOLBAR = 'question-search-toolbar';
   public static readonly SAVE_FOOTER = 'save-footer';
   public static readonly SCENE_LIST_SELECT = 'scene-list-select';
   public static readonly CONFIGURATOR = 'Configurator';
   public static readonly NAVIGATION_HEADER = 'navigation-header';
   public static readonly NAVIGATION_INFO_HEADER = 'navigation-info-header';
   public static readonly FLOOR_PLAN_IMAGE_SVG_ID = 'floor-plan-container';
   public static readonly PENDO_PREFIX = 'pendo_';
   public static readonly APP_SCOPE = 'VISUALIZER';

   @observable openDrawerMenu: boolean = false;
   @observable homeNavigation: boolean = true;
   @observable homeNavigationToggle: boolean = false;
   @observable homeVisualizerLoading: boolean = false;
   @observable openMyHomesDrawerMenu: boolean = false;
   // @observable selectedModelHome: SavedDesign | undefined = undefined;
   @observable showAddNewModelHomeModal: boolean;
   @observable isSceneChangefromDropdown: boolean;
   @observable selectBookScroll: number | null = null;
   @observable isFullScreenLoading: boolean = false;
   @observable enableScelectionBookScroll: boolean = false;
   @observable enableConfiguratorScroll: boolean = true;
   @observable timerEnabled: boolean = false;
   @observable isAutoScrollEnabled: boolean = true;
   @observable isAutoScroll: boolean = false;
   @observable visualizerHeight: number = 0;
   @observable cssHeaderHeight: string = '0px';
   @observable pageTitle2: string | null = null;
   @observable pendoDataReady: boolean = false;

   constructor() {
      makeAutoObservable(this);
   }

   @action
   setOpenDrawerMenu(openDrawerMenu: boolean) {
      this.openDrawerMenu = openDrawerMenu;
   }

   @action
   setPageTitle2(value: string | null) {
      this.pageTitle2 = value;
   }

   @action
   toggleHomeNavigation() {
      this.homeNavigation = !this.homeNavigation;
   }

   @action
   setHomeNavigationToggle(homeNavigationToggle: boolean) {
      this.homeNavigationToggle = homeNavigationToggle;
   }

   @action
   setHomeVisualizerLoading(homeVisualizerLoading: boolean) {
      this.homeVisualizerLoading = homeVisualizerLoading;
   }

   @action
   setOpenMyHomesDrawerMenu(openMyHomesDrawerMenu: boolean) {
      this.openMyHomesDrawerMenu = openMyHomesDrawerMenu;
   }

   // @action
   // setSelectedModelHome(selectedModelHome: SavedDesign | undefined) {
   //     this.selectedModelHome = selectedModelHome;
   // }

   @action
   setShowAddNewModelHomeModal = (showAddNewModelHomeModal: boolean) => {
      this.showAddNewModelHomeModal = showAddNewModelHomeModal;
   };

   @action
   setIsSceneChangefromDropdown(isSceneChangefromDropdown: boolean) {
      this.isSceneChangefromDropdown = isSceneChangefromDropdown;
   }

   @action configPanelElementId(answerId: string | null): string {
      return answerId
         ? `${AppStore.CONFIG_ELEM_ID_PREFI}${answerId}`
         : 'noAnswer';
   }

   @action setSelectBookScroll(value: number | null) {
      this.selectBookScroll = value;
   }

   @action setScrollPositions = (
      element: HTMLElement | null,
      scrollSelectionBook: boolean
   ) => {
      if (element) {
         if (scrollSelectionBook) {
            this.setSelectBookScroll(element.scrollTop);
         } else {
            this.setSelectBookScroll(null);
         }
      }
   };

   @action
   setIsFullScreenLoading(isFullScreenLoading: boolean) {
      this.isFullScreenLoading = isFullScreenLoading;
   }

   @action
   setEnableConfiguratorScroll(value: boolean) {
      this.enableConfiguratorScroll = value;
   }

   @action
   setIsAutoScrollEnabled(isAutoScrollEnabled: boolean) {
      this.isAutoScrollEnabled = isAutoScrollEnabled;
   }

   @action
   setIsAutoScroll(isAutoScroll: boolean) {
      this.isAutoScroll = isAutoScroll;
   }

   @action
   setVisualizerHeight(value: number) {
      this.visualizerHeight = value;
   }

   @action
   setCSSHeaderHeight(value: string) {
      this.cssHeaderHeight = value;
   }

   @action setPendoDataReady(value: boolean) {
      this.pendoDataReady = value;
   }
}
