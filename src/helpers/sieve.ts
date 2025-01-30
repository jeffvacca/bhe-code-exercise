export const getNthPrime = async (n: number): Promise<number> => {
  if (n < 0) {
    throw new Error("Negative numbers are not allowed");
  }

  // Get the upper boundary - necessary for handling large numbers
  const getUpperBound = (num: number) => {
    if (num < 6) return 15; // Small n cases
    // Equation based on the Prime Number Theorem
    return Math.ceil(num * Math.log(num) + num * Math.log(Math.log(num)));
  };

  // Upper boundary for larger numbers using the segmented approach
  const upperBound = getUpperBound(n + 1);

  // Upper bound for first batch of small primes
  const limit = Math.floor(Math.sqrt(upperBound)) + 1;

  // First batch - small primes up to sqrt(upperBound)
  const smallPrimes = await sieve(limit); // Await for async sieve

  // Additional batches - Use the segmented sieve approach to find the (n + 1)-th prime
  let count = 0; // Count Primes
  let start = 2; // Starting range
  const segmentSize = 100000; // Process in chunks - avoids invalid array length error

  while (start <= upperBound) {
    const end = Math.min(start + segmentSize - 1, upperBound);

    // Create an array and set all to true asynchronously
    const primeArr = new Array(end - start + 1).fill(true);

    // Mark multiples of small primes in the current segment
    for (const prime of smallPrimes) {
      const multiple = Math.max(prime * prime, Math.ceil(start / prime) * prime);

      for (let j = multiple; j <= end; j += prime) {
        primeArr[j - start] = false;
      }
    }

    // Process the segment asynchronously to avoid blocking
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Count primes in the current segment
    for (let i = 0; i < primeArr.length; i++) {
      if (primeArr[i]) {
        count++;
        if (count === n + 1) { // Zero-indexing
          return start + i; // Return the zero-indexed prime
        }
      }
    }

    start = end + 1; // Move to the next batch
  }

  throw new Error("Uh Oh!");
};

// Base Sieve of Eratosthenes
async function sieve(limit: number): Promise<number[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const primeArr = new Array(limit + 1).fill(true);
      primeArr[0] = primeArr[1] = false; // First prime is 2

      for (let i = 2; i * i <= limit; i++) {
        if (primeArr[i]) {
          for (let j = i * i; j <= limit; j += i) {
            primeArr[j] = false; // Mark multiples as false
          }
        }
      }

      const primes = primeArr
        .map((prime, index) => (prime ? index : null)) // Convert primes to numbers
        .filter((x) => x !== null) as number[]; // Remove null values

      resolve(primes);
    }, 0);
  });
}
