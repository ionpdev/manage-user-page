import { z } from 'zod';

/** removeUser callable — shared by the client and the function. */
export const RemoveUserRequest = z.object({ userId: z.string().min(1) });
export const RemoveUserResponse = z.object({ ok: z.literal(true) });
export type RemoveUserRequest = z.infer<typeof RemoveUserRequest>;
export type RemoveUserResponse = z.infer<typeof RemoveUserResponse>;
