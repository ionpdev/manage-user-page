// Dev environment — talks to the Firebase Emulator Suite.
// A `demo-` projectId tells the emulators to run fully offline (no real credentials).
export const environment = {
  production: false,
  useEmulators: true,
  firebase: {
    projectId: 'demo-user-management-console',
    apiKey: 'demo',
    appId: 'demo',
  },
};
