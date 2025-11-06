pragma circom 2.1.5;

include "node_modules/circomlib/circuits/poseidon.circom";

template PasswordProof() {
    signal input password;      // Private input: the password
    signal input hash;          // Public input: the expected hash

    component hasher = Poseidon(1);
    hasher.inputs[0] <== password;

    hasher.out === hash;
}

component main {public [hash]} = PasswordProof();