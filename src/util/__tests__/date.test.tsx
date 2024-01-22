import { getAge } from "../date.util";

describe("Date", () => {
  it("should properly calculate age", () => {
    const age = getAge("01/01/1990");
    expect(age).toEqual(34);
  });

  it("should properly calculate age when date is in the future", () => {
    const age = getAge("01/01/2029");
    expect(age).toEqual(0);
  });

  it("should properly calculate age when date is in the past", () => {
    const age = getAge("01/01/1980");
    expect(age).toEqual(44);
  });

  it("should properly calculate age when date is invalid", () => {
    const age = getAge("01/01/1990");
    expect(age).toEqual(34);
  });

  it("should properly calculate age when date is empty", () => {
    const age = getAge("");
    expect(age).toEqual(0);
  });
});
