// Type definitions for Google Identity Services
interface Window {
  google?: {
    accounts: {
      id: {
        initialize: (config: any) => void;
        renderButton: (element: HTMLElement, options: any) => void;
        prompt: () => void;
      };
      oauth2: {
        initCodeClient: (config: {
          client_id: string;
          scope: string;
          ux_mode: 'popup' | 'redirect';
          callback: (response: { code?: string; error?: string }) => void;
          error_callback?: (error: any) => void;
        }) => {
          requestCode: () => void;
        };
      };
    };
  };
}
