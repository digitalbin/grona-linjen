interface ImportMetaEnv {
  readonly STRIPE_PUB_KEY: string;
  readonly STRIPE_SECRET_KEY: string;
  readonly STRIPE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const process: {
  env: {
    readonly STRIPE_PUB_KEY: string;
    readonly STRIPE_SECRET_KEY: string;
    readonly STRIPE_BASE_URL: string;
  };
};
