// TODO: Add other globals here

import { Store } from 'redux';
import { NextRouter } from 'next/router';
import { Config } from 'types/Config';
import { AffirmCheckoutInfo } from 'types/CartAffirm';
import { AcimaCheckoutInfo } from 'types/CartAcima';
import { CategoryItem } from 'types/Categories';
import { MenuItem } from 'types/Menus';
import { CMSBlock, CMSBlockItem } from 'types/Blocks';
import { CMSPage } from 'types/Pages';
import type { AppState } from 'store/reducer';
import {
  CartEventPayload,
  PurchaseEventPayload,
  LocationEvent,
} from 'externals/facebook';

declare global {
  // Globals from Webpack
  const IN_DEVELOPMENT: boolean;
  const GIT_VERSION: string;
  const AVB_UI_VER: string;

  // Other interfaces
  interface NodeModule {
    hot?: {
      accept: (path: string, callback: () => void) => void;
    };
  }

  type CMSBlocksMap = {
    [blockIdentifier: string]: CMSBlockItem;
  };

  interface AcimaClient {
    merchantId: string;
    iframeUrl?: string;
    iframeContainer?: HTMLElement | string;
  }

  interface AcimaPreApproval {
    iframe: null | HTMLIFrameElement;
    waiting: boolean;
    initied: boolean;
    start: () => void;
    init: () => void;
  }

  interface ChargeAfterCheckoutArgs {
    callback: (token?: string, chargeAfterData?: unknown) => void;
    cartDetails: {
      items: ChargeAfterCheckoutItems[];
      shippingAmount: number;
      taxAmount: number;
      totalAmount: number;
    };
    consumerDetails: {
      billingAddress: {
        city: string;
        line1: string;
        line2: string;
        state: string;
        zipCode: string;
      };
      email: string;
      firstName: string;
      lastName: string;
      mobilePhoneNumber: string;

      shippingAddress: {
        city: string;
        line1: string;
        line2: string;
        state: string;
        zipCode: string;
      };
    };
  }

  interface ChargeAfterCheckoutItems {
    leasable?: boolean;
    name?: string;
    price: number;
    productCategory?: string;
    quantity?: number;
    sku: string;
  }

  interface ChargeAfterCheckout {
    apply?: {
      present: (args: ChargeAfterCheckoutArgs) => void;
    };

    cfg?: {
      apiKey: string;
    };

    checkout?: {
      present: (args: ChargeAfterCheckoutArgs) => void;
    };

    dispose?: () => void;
    /**
     * Promotions widget.
     */
    promotions?: {
      /**
       * Update the ChargeAfter widget with new product info.
       */
      update: (updateObject: { items: ChargeAfterCheckoutItems[] }) => void;
      /**
       * Rebuild the ChargeAfter widget.
       */
      rebuild: () => void;
    };

    /**
     * Promotions widget.
     */
    promotions?: Window['ChargeAfter']['promotionalWidget'];

    ui?: {
      update: () => Promise<void>;
    };
  }

  interface AffirmCheckout {
    checkout: ((checkoutData: Partial<AffirmCheckoutInfo>) => void) & {
      open: (callbacks: {
        onFail: (error: { reason: string }) => void;
        onSuccess: (token: { checkout_token: string }) => void;
      }) => void;
    };

    ui: {
      ready: (callback: () => void) => void;
      refresh: () => void;
    };
  }

  interface MonerisCheckout {
    /** Configure Moneris to test or production mode. */
    setMode: (mode: 'qa' | '') => void;

    /** Determine which `<div>` with the `id` to look for when setting the Moneris modal. */
    setCheckoutDiv: (divIdName: string) => void;

    /**
     * Set event handlers for Moneris.
     * In the callback, the param returns a JSON object but it is a string.  Generally
     * not used but if you need to use the param, you must use `JSON.parse()` in the
     * callback.
     */
    setCallback: (
      eventName:
        | 'page_loaded'
        | 'cancel_transaction'
        | 'error_event'
        | 'payment_receipt'
        | 'payment_complete',
      callback: (jsonResp: string) => void,
    ) => void;

    /** Start the Moneris checkout process and launch the modal. */
    startCheckout: (ticketNumber: string[]) => void;

    /** Aborts the Moneris checkout process.  Does not close the modal. */
    closeCheckout: (ticketNumber: string[]) => void;
  }

  interface VideolyData {
    actions: {
      closePlayer: () => void;
      startPlayer: (videoData: VideolyData['videos'][number]) => void;
    };
    videos: {
      id: string;
      videoId: string;
      type: string;
      genre: string;
      duration: string;
      language: string;
      title: string;
      providerVideoId: null; // Unclear what this is
      thumbs: {
        default: {
          url: string;
        };
        high: {
          url: string;
        };
        medium: {
          url: string;
        };
      };
    }[];
  }

  interface Window {
    appFooter: Promise<CMSBlock>;
    appPage: Promise<CMSPage | {}>;
    appLoad: Promise<[Config, CMSBlocksMap, CategoryItem[], MenuItem[]]>;
    VCredit: {
      create: (options: { secureSessionUrl: string; target?: string }) => {
        on: (
          event: string,
          callback: (event: {
            data: unknown;
            event: string;
            element: {
              destroy: () => void;
              dom: HTMLElement;
            };
          }) => void,
        ) => void;

        launch: (flow: string, options: VersatileApplicationOptions) => void;
      };
    };
    app: {
      baseUrl: string;
      historyPush: typeof any;
      brandsLandingEnabled: boolean;
      acima?: typeof window.Acima.Client; // TODO: This is wrong and should be an instance of `Acima.Client`.  Fix this.
      facebookConversion: {
        sendSearchEvent: (searchTerm: string) => void;
        sendAddToCartEvent: (cartItem: CartEventPayload) => void;
        sendPurchaseEvent: (cart: PurchaseEventPayload) => void;
        sendViewContentEvent: (path: string, contentType: string) => void;
        sendFindLocationEvent: (type: LocationEvent) => void;
        sendLeadEvent: () => void;
        sendSubscribeEvent: () => void;
        sendContactEvent: () => void;
      };
    };

    ApplePaySession: {
      new (
        version: number,
        paymentRequest: ApplePayJS.ApplePayPaymentRequest,
      ): ApplePaySession;
    };

    objectFitImages: (cssClass: string) => boolean;
    version: string;
    amazon: any;

    altaDebug: {
      altaVersion: string;
      branch: string;
      commit: string;
      lastBuild: string;
    };

    _katapult_config: {
      api_key: string;
      environment: string;
    };

    katapult: {
      checkout?: {
        load: () => void;
        set: (response: object) => void;
      };

      timeout?: {
        start: () => void;
        reset: () => void;
      };

      about?: () => void;
      preapprove?: () => void;
      setConfig?: (key: string) => void;
    };

    zibby: Window['katapult'];
    _zibby_config: Window['_katapult_config'];

    Acima: {
      Client: {
        new (options: {
          merchantId: string;
          iframeUrl?: string;
          iframeContainer?: HTMLElement | string;
        }): {
          checkout: (checkoutData: AcimaCheckoutInfo) => Promise<{
            leaseId: string;
            leaseNumber: string;
            checkoutToken: string;
          }>;
        };
      };
    };

    AcimaCreditPreApproval: AcimaPreApproval;

    ChargeAfter: ChargeAfterCheckout;

    monetateQ: {
      /**
       * Data to push to Kibo/Monetate.
       * @param dataToPush Tuple with the event name and data, if any.
       * `data` is `any` typing since the data can vary in type based on event.
       */
      push: (
        dataToPush: [eventName: string, data: any] | [eventName: string],
      ) => void;
    };
    monerisCheckout: new () => MonerisCheckout;
    appMoneris: MonerisCheckout;

    affirm?: AffirmCheckout;

    fetchCmsPage?: Promise<CMSPage | null>;
    gapi: any;
    /**
     * Object for Google reCAPTCHA.
     * @docs https://developers.google.com/recaptcha/docs/display#js_api
     */
    grecaptcha?: {
      /**
       * Render the reCAPTCHA v2 widget.
       *
       * @return
       * An id associated with the reCAPTCHA widget.
       * You would use to reference the widget for resetting or getting a response.
       */
      render?: (
        container: HTMLElement,
        parameters: {
          sitekey: string;
          theme?: 'dark' | 'light';
          size?: 'compact' | 'normal';
          tabindex?: number;
          callback?: (respToken: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
        },
      ) => string;
    };

    POWERREVIEWS?: {
      display: {
        render: (
          api_key: string,
          locale: string,
          merchant_group_id: string,
          merchant_id: string,
          page_id: string,
          components: {
            Write: string;
          },
          on_submit: () => void,
        ) => void;
      };
    };
    /**
     * Webcollage/Syndigo object.
     */
    Webcollage?: {
      loadProductContent: (
        siteCode: string,
        cpi: string,
        contentPackages: {
          'mosaic-board'?: {
            containerSelector: string;
          };
          'power-page'?: {
            autoPlayAndStop: boolean;
          };
        },
      ) => void;
    };

    /**
     * CNET script data properties.
     * CNET uses this array to determine what to show for its syndicated content.
     */
    ccs_cc_args: [string, string][];

    FB: {
      init: (params: {
        appId?: string;
        version: string;
        cookie?: boolean;
        status?: boolean;
        xfbml?: boolean;
        frictionlessRequests?: boolean;
        hideFlashCallback?: boolean;
        autoLogAppEvents?: boolean;
      }) => void;

      api: (
        path: string,
        method: 'get' | 'post' | 'delete',
        params: unknown,
        callback: (response: unknown) => void,
      ) => void;
    };

    fbAsyncInit: () => void;

    _wq?: {
      id: string | null;
      // See the docs for more info: https://wistia.com/doc/embed-options
      options?: {
        autoPlay?: boolean;
        controlsVisibleOnLoad?: boolean;
        copyLinkAndThumbnailEnabled?: boolean;
        doNotTrack?: boolean;
        email?: string;
        endVideoBehavior?: 'default' | 'reset' | 'loop';
        fakeFullscreen?: boolean;
        fitStrategy?: 'contain' | 'cover' | 'fill' | 'none';
        fullscreenButton?: boolean;
        fullscreenOnRotateToLandscape?: boolean;
        googleAnalytics?: boolean;
        muted?: boolean;
        playbackRateControl?: boolean;
        playbar?: boolean;
        playButton?: boolean;
        playerColor?: string;
        playlistLinks?: string;
        playlistLoop?: boolean;
        playsinline?: boolean;
        playPauseNotifier?: boolean;
        playSuspendedOffScreen?: boolean;
        popoover?: boolean;
        preload?: boolean;
        qualityControl?: boolean;
        qualityMax?: 224 | 360 | 540 | 720 | 1080 | 3840;
        qualityMin?: 224 | 360 | 540 | 720 | 1080 | 3840;
        resumable?: 'auto' | boolean;
        seo?: boolean;
        settingsControl?: boolean;
        silentAutoPlay?: 'allow' | boolean;
        smallPlayButton?: boolean;
        stillUrl?: string;
        time?: string;
        thumbnailAltText?: string;
        videoFoam?: boolean;
        volume?: number;
        volumeControl?: boolean;
        wmode?: string;
      };
      onReady?: (video: WistiaVideo) => void;
      onHasData?: (video: WistiaVideo) => void;
      onEmbedded?: (video: WistiaVideo) => void;
    }[];

    SYNDI?:
      | {
          push: (productId: string) => void;
        }
      | string[];

    /** Videoly's initial callback */
    videolyInitCallbacks?: {
      onVideoDataLoaded: ((_: undefined, data: VideolyData) => void)[];
      onVideoPlayStarted: ((
        _: undefined,
        data: {
          currentVideo: VideolyData['video'][number];
        },
      ) => void)[];
    };

    /** Videoly's widget */
    VideolyWidget?: {
      widgetApiInstance?: {
        registerCallbacks: (
          eventName: string,
          callbacks: ((error: unknown, data: VideolyData) => void)[],
        ) => void;
      };
    };

    /**
     * AVB's Google Analytics data layer containing events.
     */
    avbData: ({
      /**
       * The event name to push on to the data layer.
       * Must always be present for any data layer pushes.
       */
      event?: string;
    } & {
      /** Additional key-value data to send alongside the event. */
      [dataKeyName: string]: any;
    })[];
  }
}

declare module 'next' {
  // All of the `getInitialProps` in the app include the
  // Redux store and the Next router passed in.
  interface NextPageContext {
    store: Store<AppState> | undefined; // TODO: Store has a second generic, '<A>' for actions, not sure what how to type that yet if any
    router: NextRouter;
  }
}

declare module 'react-redux' {
  // Ensures that all useSelector and useDispatch in the App
  // have the correct typings for the state, which includes
  // the app's reducer.
  interface DefaultRootState extends AppState {}
}

// partial typing, see https://wistia.com/support/developers/player-api for more
interface WistiaVideo {
  chrome: HTMLElement;
  controls: unknown;
  uuid: string;
  params: {
    bpbTime: boolean;
    container: string;
    controlsVisibleOnLoad: boolean;
    fullscreenButton: boolean;
    newStillLogic: boolean;
    pageUrl: string;
    playerBackgroundColor: string;
    playerColor: string;
    playsinline: boolean;
    unalteredStillImageAsset: {
      height: number;
      url: string;
      width: number;
    };
    options: {
      bpbTime: boolean;
      container: string;
      controlsVisibleOnLoad: boolean;
      fullscreenButton: boolean;
      playerColor: string;
      playsinline: boolean;
      plugin: unknown;
      unalteredStillImageAsset: {
        height: number;
        url: string;
        width: number;
      };
      useMediaDataHostLogic: boolean;
      videoFoam: boolean;
      videoQuality: string;
      volumeControl: boolean;
      vulcan: boolean;
    };
  };
  pause: () => void;
  play: () => void;
  time: (val: number) => void;
  remove: () => void;
  _hashedId: string;
}
