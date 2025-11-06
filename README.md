# Zero-Knowledge Password Proof Circuit

A complete zero-knowledge proof system for password verification using Circom and snarkjs.

## 🔐 What This Does

This project demonstrates a zero-knowledge proof system where:

- You can prove you know a password without revealing it
- The verifier only sees the hash of the password
- The proof is cryptographically sound under standard assumptions and resistant to forgery

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

- **Node.js** (v16+ recommended) and npm
- **Circom compiler** (v2.1.5+)
  - Option 1: [Download binary](https://github.com/iden3/circom/releases)
  - Option 2: Build from source (requires Rust):
    ```bash
    git clone https://github.com/iden3/circom.git
    cd circom
    cargo build --release
    cargo install --path circom
    ```

### Setup Instructions

1. **Clone and install dependencies:**

   ```bash
   git clone https://github.com/phatch21/ZK_Circuit_2.0.git
   cd ZK_Circuit_2.0
   npm install
   ```

2. **Verify Circom installation:**

   ```bash
   circom --version
   # Should show: circom compiler 2.1.5 (or higher)
   ```

3. **Quick Demo (using pre-generated files):**

   The repository includes pre-generated files so you can immediately test:

   ```bash
   # Verify the existing proof
   npx snarkjs groth16 verify verification_key.json public.json proof.json
   ```

   Expected output: `[INFO]  snarkJS: OK!`

4. **Generate your own proof:**

   ````bash
   # Method 1: Use the helper script (modify password in calculate_hash.js first)
   node calculate_hash.js

   # Method 2: Calculate hash for any password
   node -e "
   const circomlibjs = require('circomlibjs');
   (async () => {
     const poseidon = await circomlibjs.buildPoseidon();
     const password = BigInt(process.argv[1] || '123456');
     const hash = poseidon([password]);
     const input = { password: password.toString(), hash: poseidon.F.toString(hash) };
     require('fs').writeFileSync('input.json', JSON.stringify(input, null, 2));
     console.log('Password:', password.toString());
     console.log('Hash:', poseidon.F.toString(hash));
   })();
   " "YOUR_PASSWORD_HERE"

   # Generate witness with your password
   node password_js/generate_witness.js password_js/password.wasm input.json witness.wtns

   # Generate proof
   npx snarkjs groth16 prove password_final.zkey witness.wtns proof.json public.json

   # Verify your proof
   npx snarkjs groth16 verify verification_key.json public.json proof.json
   ```5. **Full rebuild (optional):**

   If you want to rebuild everything from scratch:

   ```bash
   # Compile circuit
   circom password.circom --r1cs --wasm --sym -o .

   # The Powers of Tau ceremony files are included, but if you want to redo:
   # npx snarkjs powersoftau new bn128 12 pot12_0000.ptau -v
   # npx snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name="First contribution" -v
   # npx snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau -v

   # Setup proving and verification keys
   npx snarkjs groth16 setup password.r1cs pot12_final.ptau password_0000.zkey
   npx snarkjs zkey contribute password_0000.zkey password_final.zkey --name="1st Contributor Name" -v
   npx snarkjs zkey export verificationkey password_final.zkey verification_key.json
   ````

### 🎮 **Interactive Visualization**

Simply open `zk_visualization.html` in your browser - no additional setup required!

## 🔧 Troubleshooting

### Common Issues

**Circom not found:**

```bash
# Add to PATH or use full path
export PATH=$PATH:/path/to/circom/target/release
```

**Permission errors (Windows):**

```powershell
# Run PowerShell as Administrator or use:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Node.js version issues:**

```bash
# Use Node.js v16 or higher
node --version
# If needed, use nvm to install correct version:
nvm install 16
nvm use 16
```

**Memory issues during compilation:**

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
```

### File Structure After Setup

```
ZK_Circuit_2.0/
├── password.circom          # ✅ Circuit definition
├── password.r1cs           # ✅ Generated constraints
├── password_js/            # ✅ Generated WASM files
├── password_final.zkey     # ✅ Proving key
├── verification_key.json   # ✅ Verification key
├── input.json              # ✅ Example inputs
├── proof.json              # ✅ Generated proof
├── public.json             # ✅ Public inputs
└── zk_visualization.html   # ✅ Interactive demo
```

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

## 🌐 Industry Relevance: Ethereum Layer 2, DeFi & Decentralized Identity

This project implements the **exact same technology stack** used in production blockchain systems:

### **Technical Stack Alignment**

| This Project    | Production Systems        | Industry Usage                |
| --------------- | ------------------------- | ----------------------------- |
| **Circom**      | Polygon zkEVM, zkSync Era | Circuit definition language   |
| **Groth16**     | Zcash, Tornado Cash       | Most widely deployed zk-SNARK |
| **snarkjs**     | Aztec, Hermez             | JavaScript proof generation   |
| **Poseidon**    | StarkNet, Mina Protocol   | ZK-optimized hash function    |
| **BN254 Curve** | Ethereum, Polygon         | Standard elliptic curve       |

### **Architectural Parallels**

**Your Circuit Pattern:**

```circom
signal input password;    // Private witness
signal input hash;        // Public commitment
hasher.out === hash;      // Constraint satisfaction
```

**Production Equivalents:**

- **zkSync**: `signal input transaction` → `signal input stateRoot`
- **Tornado Cash**: `signal input secret` → `signal input commitment`
- **Polygon ID**: `signal input identity` → `signal input credential`

### **Real-World Applications**

1. **Layer 2 Scaling** (Polygon zkEVM, Matter Labs zkSync)

   - Bundle thousands of transactions into one zk-SNARK proof
   - Uses identical Groth16 + Circom + snarkjs stack

2. **Privacy-Preserving DeFi** (Aztec Protocol, Tornado Cash)

   - Prove transaction validity without revealing amounts
   - Same constraint satisfaction model as this password circuit

3. **Decentralized Identity** (Worldcoin, Polygon ID, Semaphore)
   - Prove credentials without revealing personal data
   - Identical privacy-preserving authentication pattern

### **Production Deployment Ready**

This circuit could be deployed to Ethereum mainnet with appropriate gas optimization and verifier deployment:

```solidity
// Smart contract verifier (auto-generated from this circuit)
contract PasswordVerifier {
    function verifyProof(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[] memory input
    ) public view returns (bool) {
        // Verifies proofs generated by this exact circuit
    }
}
```

### **Market Impact**

Systems using this technology stack:

- **zkSync Era**: $1B+ TVL (Total Value Locked)
- **Polygon zkEVM**: $50M+ daily transaction volume
- **Zcash**: $400M+ market cap privacy coin
- **Aztec**: $100M+ in private DeFi transactions

**Developer Salaries**: Top-tier zk-SNARK engineers in leading blockchain firms may command salaries in the $200k-500k range due to the specialized nature of this technology.

## 🎯 Technical Achievements Demonstrated

### **Zero-Knowledge Cryptography**

- ✅ **zk-SNARK Implementation**: Complete Groth16 proof system
- ✅ **Circuit Design**: Constraint satisfaction with 216 non-linear constraints
- ✅ **Trusted Setup**: Powers of Tau ceremony implementation
- ✅ **Field Mathematics**: BN254 elliptic curve operations

### **Blockchain-Ready Development**

- ✅ **Production Stack**: Circom + snarkjs (industry standard)
- ✅ **Cryptographic Primitives**: Poseidon hash, field arithmetic
- ✅ **Proof Generation**: Groth16 protocol implementation
- ✅ **Verification Logic**: Smart contract compatible

### **Full-Stack Engineering**

- ✅ **Interactive Visualization**: Responsive web application
- ✅ **Educational Design**: Complex concepts made accessible
- ✅ **Repository Management**: Branch protection, GitHub Pages deployment
- ✅ **Documentation**: Comprehensive technical documentation

### **Research & Problem Solving**

- ✅ **Compiler Build**: Circom built from Rust source code
- ✅ **Environment Setup**: Complex cryptographic toolchain
- ✅ **Performance Optimization**: ZK-friendly hash function selection
- ✅ **Cross-Platform Compatibility**: Windows PowerShell development

This project represents a **complete implementation** of production-grade zero-knowledge proof technology, demonstrating both theoretical understanding and practical engineering capabilities essential for blockchain development roles.

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

## 📄 License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.

### Third-Party Licenses

This project uses GPL-3.0 licensed libraries from [iden3](https://github.com/iden3):

- **circomlib** - Circuit library for Circom
- **snarkjs** - JavaScript toolkit for zkSNARKs
- **circomlibjs** - JavaScript implementations of circom circuits

The Poseidon hash function implementation is from circomlib and is used under GPL-3.0 license.

---

_This project demonstrates the power of zero-knowledge proofs for privacy-preserving authentication!_ 🔐✨
