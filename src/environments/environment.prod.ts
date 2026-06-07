// Production environment — real Firebase web config.
// Filled in at Phase 9 (deploy) from the `user-management-console` project settings.
// The Firebase web config is not a secret (it ships to the browser).
export const environment = {
  production: true,
  useEmulators: false,
  firebase: {
    projectId: 'user-management-console',
    apiKey: '__FILL_AT_DEPLOY__',
    appId: '__FILL_AT_DEPLOY__',
    authDomain: 'user-management-console.firebaseapp.com',
    storageBucket: 'user-management-console.appspot.com',
    messagingSenderId: '__FILL_AT_DEPLOY__',
  },
};
