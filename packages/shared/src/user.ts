import { z } from 'zod';

export const UserStatus = z.enum(['enabled', 'disabled']);
export type UserStatus = z.infer<typeof UserStatus>;

export const UserRole = z.enum(['Admin', 'Editor', 'Viewer']); // extend here to add roles
export type UserRole = z.infer<typeof UserRole>;

export const USERNAME = { min: 2, max: 50 } as const;

/** Editable fields — form input and the create/edit payload. Trims input. */
export const NewUserSchema = z.strictObject({
  username: z.string().trim().min(USERNAME.min, 'At least 2 characters').max(USERNAME.max),
  role: UserRole,
});
export type NewUser = z.infer<typeof NewUserSchema>;
