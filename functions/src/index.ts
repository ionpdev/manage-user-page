import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { RemoveUserRequest } from '@manage-users/shared';

initializeApp();

/**
 * Privileged user deletion. The only path that can delete a user — Firestore
 * rules deny client deletes, so removal must go through this callable.
 */
export const removeUser = onCall(async (request) => {
  const parsed = RemoveUserRequest.safeParse(request.data);
  if (!parsed.success) {
    throw new HttpsError('invalid-argument', 'userId is required');
  }
  await getFirestore().collection('users').doc(parsed.data.userId).delete();
  return { ok: true } as const;
});
