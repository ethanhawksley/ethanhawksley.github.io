interface Navigator {
  userAgentData?: {
    brands: { brand: string }[];
  };
}

interface Window {
  __getTheme: () => 'light' | 'dark';
  __setTheme: (theme: 'light' | 'dark', save?: boolean, doc?: Document) => void;
  __themeTransition?:
    | ((updateCallback: () => Promise<void> | void) => {
        ready: Promise<void>;
        finished: Promise<void>;
        updateCallbackDone: Promise<void>;
        skipTransition: () => void;
      })
    | null;
  yes: any;
  no: any;
}
