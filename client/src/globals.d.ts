
declare global {
  // Globals from Webpack
  const IN_DEVELOPMENT: boolean;
  const GIT_VERSION: string;
  const AVB_UI_VER: string;

  // Other interfaces

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

}
