const circomlibjs = require("circomlibjs");

async function calculateHash() {
  // Build the Poseidon hasher
  const poseidon = await circomlibjs.buildPoseidon();

  // Calculate Poseidon hash of the password
  const password = BigInt("123456");
  const hash = poseidon([password]);

  console.log("Password:", password.toString());
  console.log("Poseidon Hash:", poseidon.F.toString(hash));

  // Create the correct input file
  const input = {
    password: password.toString(),
    hash: poseidon.F.toString(hash),
  };

  require("fs").writeFileSync("input.json", JSON.stringify(input, null, 2));
  console.log("Updated input.json with correct hash");
}

calculateHash().catch(console.error);
