import { z } from 'zod';
import { Timestamp } from '@angular/fire/firestore';
import { NewUserSchema, UserStatus } from '@manage-users/shared';

/** A user as READ from Firestore (id from idField; timestamps resolved). Strict ⇒ no PII. */
export const UserSchema = NewUserSchema.extend({
  id: z.string(),
  status: UserStatus,
  createdAt: z.instanceof(Timestamp).nullable(), // null for one tick after write
  updatedAt: z.instanceof(Timestamp).nullable().optional(),
});
export type User = z.infer<typeof UserSchema>;
