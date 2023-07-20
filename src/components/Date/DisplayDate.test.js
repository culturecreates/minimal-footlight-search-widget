import DisplayDate from './DisplayDate.js';

describe('DisplayDate', () => {
  it('formats date', () => {
    expect(DisplayDate({ date: "2020-12-19T20:00:00-04:00" } )).toBe("19 Dec 20");
  });
});
