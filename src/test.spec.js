describe('TEST test', function() {
  let test;

  beforeEach(function() {
    test = { test: 123 };
  });

  it('should pass', function() {
    expect(test.test).toEqual(123);
  });
});
