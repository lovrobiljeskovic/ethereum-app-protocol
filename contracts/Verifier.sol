pragma solidity ^0.4.24;
contract Verifier {

  event LogMyHash(bytes32 indexed theHash);
  event LogMyAddress(address indexed theAddress);

  event TransactionCreated(address from, uint transactionId);
  event TransactionCompleted(address from, uint transactionId);
  event TransactionSigned(address by, uint transactionId);

  uint private _transactionIdx;
  uint constant MIN_SIGNATURES = 2;

  struct Transaction {
    address from;
    uint signatureCount;
    mapping (address => uint8) signatures;
  }

  mapping (uint => Transaction) private _transactions;
  uint[] private _pendingTransactions;

  function recoverAddr(bytes32 msgHash, uint8 v, bytes32 r, bytes32 s) public pure returns (address) {
    bytes32 message = prefixed(msgHash);
    address signer = ecrecover(message, v, r, s);
    return signer;
  }

  function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return keccak256("\x19Ethereum Signed Message:\n32", hash);
    }

  function isSigned(address _addr, bytes32 msgHash, uint8 v, bytes32 r, bytes32 s) public pure returns (bool) {
    bytes32 message = prefixed(msgHash);
    bool signed = ecrecover(message, v, r, s) == _addr;
    return signed;
  }

  function createTransaction(bytes32 msgHash) public {
    uint transactionId = _transactionIdx++;
    Transaction memory transaction;
    transaction.from = msg.sender;
    transaction.signatureCount = 0;

    _transactions[transactionId] = transaction;
    _pendingTransactions.push(transactionId);
    emit TransactionCreated(msg.sender, transactionId);
    emit LogMyHash(msgHash);
  }

  function signTransaction(uint transactionId) public {
    Transaction storage transaction = _transactions[transactionId];
    require(0x0 != transaction.from, "Transaction must exist");
    require(msg.sender != transaction.from, "Creator cannot sign a transaction");
    require(transaction.signatures[msg.sender] != 1, "Cannot sign a transaction more than once");
    transaction.signatures[msg.sender] = 1;
    transaction.signatureCount++;
    emit TransactionSigned(msg.sender, transactionId);
    if(transaction.signatureCount >= MIN_SIGNATURES){
      emit TransactionCompleted(msg.sender, transactionId);
      deleteTransaction(transactionId);
    }
  }

  function getPendingTransactions() public view returns (uint[]) {
    return _pendingTransactions;
  }

  function deleteTransaction(uint transactionId) public {
    uint8 replace = 0;
    for(uint i = 0; i < _pendingTransactions.length; i++) {
      if(1 == replace) {
        _pendingTransactions[i-1] = _pendingTransactions[i];
      } else if(transactionId == _pendingTransactions[i]) {
        replace = 1;
      }
    }
    delete _pendingTransactions[_pendingTransactions.length - 1];
    _pendingTransactions.length--;
    delete _transactions[transactionId];
  }

}
