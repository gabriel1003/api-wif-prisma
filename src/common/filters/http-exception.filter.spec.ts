import { HttpExceptionFilter } from './http-exception.filter';

describe('FiltersFilter', () => {
  it('should be defined', () => {
    expect(new HttpExceptionFilter()).toBeDefined();
  });
});
