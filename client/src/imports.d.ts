declare module '*.png' {
  const imagePath: string;
  export default imagePath;
}

declare module '*.jpg' {
  const imagePath: string;
  export default imagePath;
}

declare module '*.svg' {
  const imagePath: string;
  export default imagePath;
}

declare module 'inobounce';

declare module 'current-device' {
  export const type: string;
}

declare module 'array-to-tree' {
  const arrayToTree: <T>(
    arr: T[],
    options?: {
      parentProperty?: string;
      childrenProperty?: string;
      customID?: string;
    },
  ) => T[];

  export default arrayToTree;
}

declare module 'object-fit-images' {
  const objectFitImages: (
    images?: string | HTMLElement | HTMLElement[] | NodeList | null,
    options?: { watchMQ?: boolean; skipTest?: boolean },
  ) => void;

  export default objectFitImages;
}
