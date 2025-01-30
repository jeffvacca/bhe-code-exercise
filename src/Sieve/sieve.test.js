const { getNthPrime } = require("./sieve");

describe("Sieve", () => {
  test("valid results", async () => {
    await expect(getNthPrime(0)).resolves.toBe(2);
    await expect(getNthPrime(19)).resolves.toBe(71);
    await expect(getNthPrime(99)).resolves.toBe(541);
    await expect(getNthPrime(500)).resolves.toBe(3581);
    await expect(getNthPrime(986)).resolves.toBe(7793);
    await expect(getNthPrime(2000)).resolves.toBe(17393);
    await expect(getNthPrime(1000000)).resolves.toBe(15485867);
  });
});

describe("Sieve Longer", () => {
  test("valid results", async () => {
    await expect(getNthPrime(10000000)).resolves.toBe(179424691);
  }, 10000);
});

describe("Sieve Longest", () => {
  test("valid results", async () => {
    await expect(getNthPrime(100000000)).resolves.toBe(2038074751);
  }, 200000);
});

