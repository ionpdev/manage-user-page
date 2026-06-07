import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { RemoveUserRequest } from '@manage-users/shared';

initializeApp();

/**
 * Privileged user deletion. The only path that can delete a user — Firestore
 * rules deny client deletes, so removal must go through this callable.
 *
 * `invoker: 'public'` allows the unauthenticated client to call it (the app has
 * no auth). Deletion is still gated server-side: only this function holds the
 * Admin SDK privilege to delete, and it validates its input.
 */
export const removeUser = onCall({ invoker: 'public' }, async (request) => {
  const parsed = RemoveUserRequest.safeParse(request.data);
  if (!parsed.success) {
    throw new HttpsError('invalid-argument', 'userId is required');
  }
  await getFirestore().collection('users').doc(parsed.data.userId).delete();
  return { ok: true } as const;
});
