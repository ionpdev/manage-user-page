import { Timestamp } from '@angular/fire/firestore';
import { UserSchema } from './user.schema';

/**
 * UserSchema is the trust boundary: every Firestore document is parsed through it
 * before entering the app. These tests pin the contract — valid rows pass, anything
 * malformed (missing fields, bad enums, non-Timestamp dates, PII) is rejected.
 */
describe('UserSchema (Firestore boundary parse)', () => {
  const ts = new Timestamp(1_700_000_000, 0);

  const validRow = {
    id: 'abc123',
    username: 'Jane',
    role: 'Admin',
    status: 'enabled',
    createdAt: ts,
    updatedAt: ts,
  };

  it('parses a well-formed document', () => {
    const result = UserSchema.safeParse(validRow);
    expect(result.success).toBe(true);
  });

  it('accepts a null createdAt (server timestamp not yet resolved)', () => {
    const result = UserSchema.safeParse({ ...validRow, createdAt: null });
    expect(result.success).toBe(true);
  });

  it('rejects a missing role', () => {
    const { role, ...withoutRole } = validRow;
    expect(UserSchema.safeParse(withoutRole).success).toBe(false);
  });

  it('rejects an unknown role', () => {
    expect(UserSchema.safeParse({ ...validRow, role: 'God' }).success).toBe(false);
  });

  it('rejects an unknown status', () => {
    expect(UserSchema.safeParse({ ...validRow, status: 'archived' }).success).toBe(false);
  });

  it('rejects a username shorter than the minimum', () => {
    expect(UserSchema.safeParse({ ...validRow, username: 'J' }).success).toBe(false);
  });

  it('rejects a createdAt that is not a Timestamp', () => {
    expect(UserSchema.safeParse({ ...validRow, createdAt: 1_700_000_000 }).success).toBe(false);
  });

  it('rejects an extra field (no PII leaks through the boundary)', () => {
    const result = UserSchema.safeParse({ ...validRow, email: 'jane@example.com' });
    expect(result.success).toBe(false);
  });
});
