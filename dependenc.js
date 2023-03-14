/*
This is rough estimate of unique selector and actions per slice
for _app.tsx imports for 4 levels deep,
the JIRA task is ALTA-1982.
    

DYNAMIC and NONDYNAMIC
    -refers to whether an import is imported dynamically or not
*/

const SELECTORS = {
    nonDynamicImportsUniqueSelectorCount: 51,
  
    dynamicImportsUniqueSelectorCount: 60,
  
    totalSelectors: 111,
  
    NONDYNAMIC: {
      app: [
        { number: 26 },
        'getAppConfig',
        'getAppConfigDisplayProp65Warning',
        'getAppConfigEnterprisePreCartEnabled',
        'getAppConfigLocaleActual',
        'getAppConfigSiteStylesInlineHTML',
        'getAppConfigBaseUrl',
        'getAppConfigHeaderLayout',
        'getAppConfigIframeUrl',
        'getAppConfigLocales',
        'getAppConfigUseBrandsPage',
        'getAppConfigPhone',
        'getAppConfigTitle',
        'getAppConfigFavicon',
        'getAppConfigName',
        'getAppConfigLogoSrc',
        'getAppConfigLogoAlt',
        'getAppConfigFacebookId',
        'getAppConfigHrefLang',
        'getAppConfigHrefGtmId',
        'getAppConfigStaticBlock',
        'getAppMenuItemsTree',
        'getAppBlocksSeoIndentifiers',
        'getAppInitPageLoadCompleteStatus',
        'getAppCategories',
        'getAppPageTitle',
        'getCmsBlockId',
      ],
  
      header: [
        { number: 22 },
        'getLanguage',
        'getLogoAlt',
        'getLogoUrl',
        'getLogoUrlSmall',
        'getLocales',
        'getLanguageSwitcherUrlOverrides',
        'getHeaderLayout',
        'getCmsBlocks',
        'getEnterpriseCategoryMenuBlockEnabled',
        'getSelectMenu',
        'getCategories',
        'getCategoriesTree',
        'getMenuItems',
        'getMenuItemsTree',
        'getSearchTerm',
        'getSearchSuggestedSearches',
        'getSearchDisplaySearch',
        'getCartQty',
        'getHasMultipleLocations',
        'getPhoneNumber',
        'getUserFirstName',
        'getMobileMenuOpen',
      ],
  
      cms: [{ number: 2 }, 'getCmsBlockContent', 'getCmsBlock'],
  
      status: [{ number: 1 }, 'getEventPayload'],
    },
  
    DYNAMIC: {
      app: [
        { number: 9 },
        'getAppConfigDisplayEmailCart',
        'getAppConfigCitiApplyEnabled',
        'getAppConfigDisplayCCPA',
        'getAppConfigDisplayGeneralPrivacyPolicy',
        'getAppConfigDisplayCookieBanner',
        'getAppConfigDisplayAccessibilityStatement',
        'getAppConfigDisplayCanadianTermsAndConditions',
        'getAppConfigGooglePlaceKey',
        'getAppConfigDefaultCountry',
      ],
  
      user: [
        { number: 21 },
        'getUserCreateAccountStatus',
        'getUserSignInStatus',
        'getUserIsSignedIn',
        'getUserSignInErrors',
        'getUserCreateErrors',
        'getUserRequestNewPasswordStatus',
        'getUserFirstName',
        'getUserLastName',
        'getUserEmail',
        'getUserSignOutStatus',
        'getUserIsSubscribed',
        'getUserUpdateNewsletterStatus',
        'getUserAddresses',
        'getUserFetchAddressesStatus',
        'getUserCreateAddressStatus',
        'getUserUpdateAddressStatus',
        'getUserDeleteAddressStatus',
        'getUserAddressRegionOptions',
        'getUserOrders',
        'getUserFetchOrdersStatus',
        'getUserCompareFull',
      ],
  
      cart: [
        { number: 14 },
        'getCartAmazonAvailable',
        'getCartQty',
        'getCartItemsList',
        'getCartAddons',
        'getCartSelectedPaymentMethod',
        'getCartFreedomPayLogo',
        'getCartFreedomPayPurchaseEnabled',
        'getCartFreedomPayMinPurchase',
        'getCartFreedomPayApplyUrl',
        'getCartFreedomPayApplyPostData',
        'getCartFreedomPayApplyPostData',
        'updatePaymentMethodStatusIsLoading',
        'freedomPayApplyInfoIsLoading',
        'getCartFreedomPayApplyAutoRoute',
      ],
  
      product: [
        { number: 6 },
        'getProductName',
        'getProductImageSmall',
        'getProductModelNumber',
        'getProductFinalPriceWithoutTax',
        'getProductCrossSells',
        'getProductSelectedProductId',
      ],
  
      cartEmailStatus: [
        { number: 2 },
        'cartEmailStatusIsLoading',
        'cartEmailStatusIsSuccess',
      ],
  
      view: [
        { number: 6 },
        'getAccountOpenSource',
        'getIsAccountDisplayOpen',
        'getAccountAutoClose',
        'getViewBottomNotificationInfo',
        'getIsAddToCartNotificationOpen',
        'getAddToCartNotificationProduct',
      ],
  
      kibo: [{ number: 2 }, 'getKiboCarouselProductIds', 'getKiboPreCartConfig'],
    },
  };
  
  ACTIONS = {
    nonDyamicImportsUniqueActionsCount: 23,
  
    dyamicImportsUniqueActionsCount: 23,
  
    totalActions: 46,
  
    NONDYNAMIC: {
      app: [
        { number: 11 },
        'fetchInitial',
        'fetchAppConfig',
        'fetchAppCategories',
        'fetchAppMenus',
        'fetchAppBlocks',
        'fetchCmsBlock',
        'fetchCmsPage',
        'fetchCartAndSession',
        'setAmazonConfigFromRedux',
        'analyticsAppInit',
      ],
  
                header: [
                    { number: 9 },
                    'openMobileMenu',
                    'hideSearchBar',
                    'updateSearchResultDisplay',
                    'clearSearchSuggestions',
                    'fetchEnhancedSearchSuggestions',
                    'updateSearchTerm',
                    'clearSearchSuggestions',
                    'fetchEnhancedSearchSuggestions',
                    'showSearchBar',
                ],
  
      view: [{ number: 2 }, 'openAccountDisplay', 'close'],
  
      cart: [{ number: 1 }, 'emailCart'],
    },
  
                                                    DYNAMIC: {
                                                    user: [
                                                        { number: 12 },
                                                        'createAccount',
                                                        'signIn',
                                                        'requestNewPassword',
                                                        'signOut',
                                                        'updateAccount',
                                                        'updateNewsletter',
                                                        'fetchUserAddressRegionOptions',
                                                        'fetchAddresses',
                                                        'createAddress',
                                                        'updateAddress',
                                                        'deleteAddress',
                                                        'fetchOrders',
                                                    ],
                                                
                                                    view: [
                                                        { number: 4 },
                                                        'openAccountDisplay',
                                                        'closeAccountDisplay',
                                                        'closeBottomNotification',
                                                        'closeAddToCartNotification',
                                                    ],
                                                
                                                    cart: [
                                                        { number: 6 },
                                                        'setCitiApplyAutoRoute',
                                                        'fetchCartFreedomPayApplyInfo',
                                                        'setCartPaymentMethod',
                                                        'updateCartPaymentMethod',
                                                        'addCartAddon',
                                                        'removeCartAddon',
                                                    ],
                                                
                                                    kibo: [{ number: 1 }, 'fetchKiboProducts'],
    },
  };
  