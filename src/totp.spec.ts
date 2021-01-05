import { getTotp } from "./totp";

//tools.ietf.org/html/rfc4226#page-32

describe("rfc tests", () => {
  const rfcSecret = "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ"; // b32 value of ascii 12345678901234567890

  const expected = [
    755224,
    287082,
    359152,
    969429,
    338314,
    254676,
    287922,
    162583,
    399871,
    520489,
  ];

  it("all work", () =>
    expected.forEach((expected, t) =>
      expect(getTotp(rfcSecret, t)).toBe(`${expected}`)
    ));
});

describe("actual cognito seed tests", () => {
  it("works in basic case", () => {
    const secret = "6C727YG4LRZRAMYD5YBNMTKPUFGIN5ZUNPBB2RJ74D5GE5OCWD7A";
    const t = 53660783; // 625224
    expect(getTotp(secret, t)).toBe(`${625224}`);
  });

  it("works with aws secret", () => {
    const secret = "6C727YG4LRZRAMYD5YBNMTKPUFGIN5ZUNPBB2RJ74D5GE5OCWD7A";
    const t = 53660783; // 625224
    expect(getTotp(secret, t)).toBe(`625224`);
  });

  it("works with leading 0", () => {
    const secret = "6C727YG4LRZRAMYD5YBNMTKPUFGIN5ZUNPBB2RJ74D5GE5OCWD7A";
    const t = 53660796; // 625224
    expect(getTotp(secret, t)).toBe(`057397`);
  });
});
