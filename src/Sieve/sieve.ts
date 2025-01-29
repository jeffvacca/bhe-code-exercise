const getNthPrime = (n:number) => {
  if (n < 0) {
    throw new Error("Parameter can not be negative");
  }

  // Get the upper boundary - necessary for handling large numbers
  const getUpperBound = (num:number) => {
    if (num < 6) return 15; // Small n cases
    //equation based on the Prime Number Theorum
    return Math.ceil(num * Math.log(num) + num * Math.log(Math.log(num)));
  };

  // Upper boundary for larger numbers using the semented approach
  const upperBound = getUpperBound(n + 1);

  // Upper bound for first batch of small primes
  const limit = Math.floor(Math.sqrt(upperBound)) + 1;

  // First batch - small primes up to sqrt(upperBound)
  const smallPrimes = sieve(limit);

  // Additional batches - Use the segmented sieve approach to find the (n + 1)-th prime
  let count = 0; // Prime counter
  let start = 2; // Starting range
  const segmentSize = 100000; // Process in chunks - avoids invalid array length error

  while (start <= upperBound) {
    const end = Math.min(start + segmentSize - 1, upperBound);

    // Per the Sieve rules, generate an array and set all to true
    const primeArr = new Array(end - start + 1).fill(true);

    // Mark multiples of small primes in the current segment
    for (const prime of smallPrimes) {
      const multiple = Math.max(prime * prime, Math.ceil(start / prime) * prime);

      for (let j = multiple; j <= end; j += prime) {
        primeArr[j - start] = false;
      }
    }

    // Count primes in the current segment
    for (let i = 0; i < primeArr.length; i++) {
      if (primeArr[i]) {
        count++;
        if (count === n + 1) { // zero-indexing
          return start + i; // return the zero-indexed prime
        }
      }
    }

    start = end + 1; // On to the next batch
  }

  throw new Error("Uh Oh!");
}

// Base Sieve of Eratosthenes
function sieve(limit:number) {
  // Create array and set all values to true
  const primeArr = new Array(limit + 1).fill(true);
  // First prime is 2 - so we set index 0 and 1 to false
  primeArr[0] = primeArr[1] = false;

  for (let i = 2; i * i <= limit; i++) {
    if (primeArr[i]) {
      for (let j = i * i; j <= limit; j += i) {
        primeArr[j] = false; //set multiples to false
      }
    }
  }

  return primeArr
    .map((prime, index) => (prime ? index : null)) // non primes are set to null
    .filter((x) => x !== null); // filter out all null values
}
module.exports = {getNthPrime};
