import { VaccineSchema } from './vaccine.schema';

describe('VaccineSchema', () => {
  it('should be defined', () => {
    expect(new VaccineSchema()).toBeDefined();
  });
});
