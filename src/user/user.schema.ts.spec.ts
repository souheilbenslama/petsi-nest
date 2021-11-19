import { UserSchema.Ts } from './user.schema.ts';

describe('UserSchema.Ts', () => {
  it('should be defined', () => {
    expect(new UserSchema.Ts()).toBeDefined();
  });
});
