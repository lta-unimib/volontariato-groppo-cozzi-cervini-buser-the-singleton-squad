import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.unimib.it',
  appName: 'DoIT',
  webDir: 'out',
  server: {
    androidScheme: 'http',
  },
};

export default config;
