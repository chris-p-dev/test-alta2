import { initStore } from 'store';
import { initialState } from 'store/reducer';

                            export const storeFactory = (state = initialState, host = 'jest') => {
                            return initStore(host, state);
                            };

export const findbyTestAttribute = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};
