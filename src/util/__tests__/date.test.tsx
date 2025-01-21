import { getAge } from "../date.util";

describe("Date", () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDate = new Date().getDate();

  it("should properly calculate age", () => {
    const birthYear = 1990;
    const birthDate = new Date(`01/01/${birthYear}`);
    const age = getAge(birthDate.toISOString().split("T")[0]);
    let expectedAge = currentYear - birthYear;
    if (
      currentMonth < birthDate.getMonth() ||
      (currentMonth === birthDate.getMonth() &&
        currentDate < birthDate.getDate())
    ) {
      expectedAge--;
    }
    expect(age).toEqual(expectedAge);
  });

  it("should properly calculate age when date is in the future", () => {
    const birthYear = currentYear + 5;
    const age = getAge(`01/01/${birthYear}`);
    expect(age).toEqual(0);
  });

  it("should properly calculate age when date is in the past", () => {
    const birthYear = 1980;
    const birthDate = new Date(`01/01/${birthYear}`);
    const age = getAge(birthDate.toISOString().split("T")[0]);
    let expectedAge = currentYear - birthYear;
    if (
      currentMonth < birthDate.getMonth() ||
      (currentMonth === birthDate.getMonth() &&
        currentDate < birthDate.getDate())
    ) {
      expectedAge--;
    }
    expect(age).toEqual(expectedAge);
  });

  it("should properly calculate age when date is invalid", () => {
    const age = getAge("invalid-date");
    expect(age).toEqual(0);
  });

  it("should properly calculate age when date is empty", () => {
    const age = getAge("");
    expect(age).toEqual(0);
  });
});
