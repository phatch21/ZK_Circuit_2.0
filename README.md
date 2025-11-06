# Zero-Knowledge Password Proof Circuit

A complete zero-knowledge proof system for password verification using Circom and snarkjs.

## 🔐 What This Does

This project demonstrates a zero-knowledge proof system where:

- You can prove you know a password without revealing it
- The verifier only sees the hash of the password
- The proof is cryptographically sound and cannot be faked

## 📁 Project Structure

```
├── password.circom          # The main circuit definition
├── input.json              # Input file with password and hash
├── calculate_hash.js        # Helper script to calculate Poseidon hashes
├── zk_visualization.html    # Interactive visualization of the ZK process
├── verification_key.json   # Public verification key
├── proof.json              # Generated zero-knowledge proof
├── public.json             # Public inputs (just the hash)
└── password_final.zkey     # Final proving key
```

## 🚀 Quick Start

### Prerequisites

- Node.js and npm installed
- Circom compiler (build from source or install binary)

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Compile the circuit:

   ```bash
   circom password.circom --r1cs --wasm --sym
   ```

3. Generate witness:

   ```bash
   node password_js/generate_witness.js password_js/password.wasm input.json witness.wtns
   ```

4. Generate proof:

   ```bash
   npx snarkjs groth16 prove password_final.zkey witness.wtns proof.json public.json
   ```

5. Verify proof:
   ```bash
   npx snarkjs groth16 verify verification_key.json public.json proof.json
   ```

## 🎯 Interactive Visualization

Open `zk_visualization.html` in your browser to see an interactive step-by-step walkthrough of how the zero-knowledge proof system works!

## 🔧 Circuit Details

The circuit (`password.circom`) implements:

- **Private Input**: The secret password
- **Public Input**: The expected Poseidon hash
- **Constraint**: Proves that `Poseidon(password) === hash`

**Circuit Statistics:**

- Template instances: 71
- Non-linear constraints: 216
- Linear constraints: 199
- Total wires: 417

## 🛡️ Security

This implementation uses:

- **Poseidon Hash**: ZK-friendly hash function
- **Groth16**: Efficient zero-knowledge proof system
- **Trusted Setup**: Powers of Tau ceremony for security

## 📚 Learn More

- [Circom Documentation](https://docs.circom.io/)
- [snarkjs Documentation](https://github.com/iden3/snarkjs)
- [Zero-Knowledge Proofs](https://en.wikipedia.org/wiki/Zero-knowledge_proof)

## 🏗️ Built With

- [Circom](https://github.com/iden3/circom) - Circuit compiler
- [snarkjs](https://github.com/iden3/snarkjs) - JavaScript toolkit for zkSNARKs
- [circomlibjs](https://github.com/iden3/circomlibjs) - JavaScript implementations of circom circuits

---

_This project demonstrates the power of zero-knowledge proofs for privacy-preserving authentication!_ 🔐✨
