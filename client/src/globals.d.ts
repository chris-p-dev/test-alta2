// TODO: Add other globals here

import { Store } from 'redux';
import { NextRouter } from 'next/router';
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
}
