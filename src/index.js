import "./styles.css";

const Web3 = require("web3");
const w3 = new Web3(
  "https://mainnet.infura.io/v3/58c9fc5b6b7b493089f4d174a610beeb"
);
const DistributionWallet = "0x46365c0fb29b066e05800f4d060827d37b3608ca";
const PackDropAsset = 1;
const UpdateInterval = 33;
const OriginalMintQty = 1288;

const contract_address = "0x38398a2d7A4278b8d83967E0D235164335A0394A";
const contract_abi = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "string", name: "contractURI", type: "string" },
      { internalType: "string", name: "tokenURIPrefix", type: "string" },
      { internalType: "address", name: "signer", type: "address" }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "_operator",
        type: "address"
      },
      { indexed: false, internalType: "bool", name: "_approved", type: "bool" }
    ],
    name: "ApprovalForAll",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address"
      },
      { indexed: false, internalType: "string", name: "name", type: "string" },
      { indexed: false, internalType: "string", name: "symbol", type: "string" }
    ],
    name: "CreateERC1155_v1",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "recipients",
        type: "address[]"
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "bps",
        type: "uint256[]"
      }
    ],
    name: "SecondarySaleFees",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "SignerAdded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "SignerRemoved",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_operator",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address"
      },
      { indexed: true, internalType: "address", name: "_to", type: "address" },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_ids",
        type: "uint256[]"
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_values",
        type: "uint256[]"
      }
    ],
    name: "TransferBatch",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_operator",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address"
      },
      { indexed: true, internalType: "address", name: "_to", type: "address" },
      { indexed: false, internalType: "uint256", name: "_id", type: "uint256" },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256"
      }
    ],
    name: "TransferSingle",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_value",
        type: "string"
      },
      { indexed: true, internalType: "uint256", name: "_id", type: "uint256" }
    ],
    name: "URI",
    type: "event"
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "addSigner",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "uint256", name: "_id", type: "uint256" }
    ],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { internalType: "address[]", name: "_owners", type: "address[]" },
      { internalType: "uint256[]", name: "_ids", type: "uint256[]" }
    ],
    name: "balanceOfBatch",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "uint256", name: "_id", type: "uint256" },
      { internalType: "uint256", name: "_value", type: "uint256" }
    ],
    name: "burn",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "contractURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "creators",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" }
    ],
    name: "fees",
    outputs: [
      { internalType: "address payable", name: "recipient", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
    name: "getFeeBps",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
    name: "getFeeRecipients",
    outputs: [
      { internalType: "address payable[]", name: "", type: "address[]" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "address", name: "_operator", type: "address" }
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "isOwner",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "isSigner",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
      {
        components: [
          {
            internalType: "address payable",
            name: "recipient",
            type: "address"
          },
          { internalType: "uint256", name: "value", type: "uint256" }
        ],
        internalType: "struct ERC1155Base.Fee[]",
        name: "fees",
        type: "tuple[]"
      },
      { internalType: "uint256", name: "supply", type: "uint256" },
      { internalType: "string", name: "uri", type: "string" }
    ],
    name: "mint",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "removeSigner",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "renounceSigner",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "_from", type: "address" },
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256[]", name: "_ids", type: "uint256[]" },
      { internalType: "uint256[]", name: "_values", type: "uint256[]" },
      { internalType: "bytes", name: "_data", type: "bytes" }
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "_from", type: "address" },
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_id", type: "uint256" },
      { internalType: "uint256", name: "_value", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" }
    ],
    name: "safeTransferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "_operator", type: "address" },
      { internalType: "bool", name: "_approved", type: "bool" }
    ],
    name: "setApprovalForAll",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ internalType: "string", name: "contractURI", type: "string" }],
    name: "setContractURI",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "string", name: "tokenURIPrefix", type: "string" }
    ],
    name: "setTokenURIPrefix",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "tokenURIPrefix",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
    name: "uri",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];
const Contract = new w3.eth.Contract(contract_abi, contract_address);

const ParallelWallet = "0x1e63326a84d2fa207bdfa856da9278a93deba418";
const contract_address2 = "0x76BE3b62873462d2142405439777e971754E8E77";
const contract_abi2 = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "string", name: "contractURI", type: "string" },
      { internalType: "string", name: "tokenURIPrefix", type: "string" },
      { internalType: "address", name: "signer", type: "address" }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "_operator",
        type: "address"
      },
      { indexed: false, internalType: "bool", name: "_approved", type: "bool" }
    ],
    name: "ApprovalForAll",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address"
      },
      { indexed: false, internalType: "string", name: "name", type: "string" },
      { indexed: false, internalType: "string", name: "symbol", type: "string" }
    ],
    name: "CreateERC1155_v1",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "recipients",
        type: "address[]"
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "bps",
        type: "uint256[]"
      }
    ],
    name: "SecondarySaleFees",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "SignerAdded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "SignerRemoved",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_operator",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address"
      },
      { indexed: true, internalType: "address", name: "_to", type: "address" },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_ids",
        type: "uint256[]"
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_values",
        type: "uint256[]"
      }
    ],
    name: "TransferBatch",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_operator",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address"
      },
      { indexed: true, internalType: "address", name: "_to", type: "address" },
      { indexed: false, internalType: "uint256", name: "_id", type: "uint256" },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256"
      }
    ],
    name: "TransferSingle",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_value",
        type: "string"
      },
      { indexed: true, internalType: "uint256", name: "_id", type: "uint256" }
    ],
    name: "URI",
    type: "event"
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "addSigner",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "uint256", name: "_id", type: "uint256" }
    ],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { internalType: "address[]", name: "_owners", type: "address[]" },
      { internalType: "uint256[]", name: "_ids", type: "uint256[]" }
    ],
    name: "balanceOfBatch",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "uint256", name: "_id", type: "uint256" },
      { internalType: "uint256", name: "_value", type: "uint256" }
    ],
    name: "burn",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "contractURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "creators",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" }
    ],
    name: "fees",
    outputs: [
      { internalType: "address payable", name: "recipient", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
    name: "getFeeBps",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
    name: "getFeeRecipients",
    outputs: [
      { internalType: "address payable[]", name: "", type: "address[]" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "address", name: "_operator", type: "address" }
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "isOwner",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "isSigner",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
      {
        components: [
          {
            internalType: "address payable",
            name: "recipient",
            type: "address"
          },
          { internalType: "uint256", name: "value", type: "uint256" }
        ],
        internalType: "struct ERC1155Base.Fee[]",
        name: "fees",
        type: "tuple[]"
      },
      { internalType: "uint256", name: "supply", type: "uint256" },
      { internalType: "string", name: "uri", type: "string" }
    ],
    name: "mint",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "removeSigner",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "renounceSigner",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "_from", type: "address" },
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256[]", name: "_ids", type: "uint256[]" },
      { internalType: "uint256[]", name: "_values", type: "uint256[]" },
      { internalType: "bytes", name: "_data", type: "bytes" }
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "_from", type: "address" },
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_id", type: "uint256" },
      { internalType: "uint256", name: "_value", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" }
    ],
    name: "safeTransferFrom",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "_operator", type: "address" },
      { internalType: "bool", name: "_approved", type: "bool" }
    ],
    name: "setApprovalForAll",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ internalType: "string", name: "contractURI", type: "string" }],
    name: "setContractURI",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "string", name: "tokenURIPrefix", type: "string" }
    ],
    name: "setTokenURIPrefix",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "tokenURIPrefix",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
    name: "uri",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];
const Contract2 = new w3.eth.Contract(contract_abi2, contract_address2);

const Cards = [
  [6, "First Son of Mars"],
  [7, "The Priming"],
  [8, "Archivist's Pride"],
  [9, "Revitalizing Growth"],
  [10, "Artillery Volley"],
  [11, "Neutron Bomb"],
  [12, "Orbital Strike"],
  [13, "Aurora Fungi"],
  [14, "Kethtrexamine"],
  [15, "Graphene Batteries"],
  [16, "Ashes to Ashes"],
  [17, "Recon"],
  [18, "Synchronicity"],
  [19, "Gaffar's Peace Pipe"],
  [20, "Cytokinesis"],
  [21, "Augencore Parallel Collectible Card Back"],
  [22, "Shroud Parallel Collectible Card Back"],
  [23, "Augencore Parallel Collectible Card Back"],
  [24, "Earthen Parallel Collectible Card Back"],
  [25, "Kathari Parallel Collectible Card Back"],
  [26, "Marcolian Parallel Collectible Card Back"],
  [27, "Marcolian Parallel Concept Art"],
  [28, "Kathari Parallel Concept Art"],
  [29, "Earthen Parallel Concept Art"],
  [30, "Augencore Parallel Concept Art"],
  [31, "Shroud Parallel Concept Art"],
  [33, "Group Parallel Concept Art"],
  [34, "Augencore Mech Concept Art"],
  [35, "Marcolian Space Station Concept Art"],
  [36, "Augencore Parallel Collectible Card Back"],
  [37, "Earthen Parallel Collectible Card Back"],
  [38, "Kathari Parallel Collectible Card Back"],
  [39, "Marcolian Parallel Collectible Card Back"],
  [40, "Shroud Parallel Collectible Card Back"],
  [41, "The First Son of Mars"],
  [42, "Earthen Parallel Concept Art [SE]"],
  [43, "Parallel Masterpiece - Recon"],
  [45, "Parallel Masterpiece // Alpha // Recon"],
  [46, "Parallel Masterpiece // Alpha // Revitalizing Growth"],
  [47, "Parallel Masterpiece // Alpha // Neutron Bomb"],
  [48, "Parallel Masterpiece // Alpha // Ashes to Ashes"],
  [49, "Parallel Masterpiece // Alpha // Archivist's Pride"],
  [50, "Parallel Masterpiece // Alpha // Gaffar's Peace Pipe"],
  [51, "Parallel Masterpiece // Alpha // Genetic Correction"],
  [52, "Parallel Masterpiece // Alpha // The Priming"],
  [53, "Parallel Masterpiece // Alpha // Kethtrexamine"],
  [54, "Parallel Masterpiece // Alpha // Synchronicity"],
  [55, "Parallel Masterpiece // Alpha // Kethtrexamine"],
  [56, "Parallel Masterpiece // Alpha // Graphene Batteries"],
  [57, "Parallel Masterpiece // Alpha // Orbital Strike"],
  [58, "Parallel Masterpiece // Alpha // Cytokinesis"],
  [59, "Parallel Masterpiece // Alpha // Artillery Volley"],
  [60, "Parallel Masterpiece // Alpha // The First Son of Mars"],
  [61, "Parallel Masterpiece // Alpha // Entropy's Reach"],
  [62, "Parallel Masterpiece // Alpha // Paradox"],
  [63, "Parallel Masterpiece // Alpha // Amperage"],
  [64, "Archivist's Pride [SE]"],
  [65, "Revitalizing Growth [SE]"],
  [66, "Artillery Volley [SE]"],
  [67, "Neutron Bomb [SE]"],
  [68, "Orbital Strike [SE]"],
  [69, "Aurora Fungi [SE]"],
  [70, "Kethtrexamine [SE]"],
  [72, "Ashes to Ashes [SE]"],
  [73, "Recon [SE]"],
  [74, "Synchronicity [SE]"],
  [75, "Gaffar's Peace Pipe"],
  [76, "Cytokinesis [SE]"],
  [78, "Earthen Parallel Collectible Card Back [SE]"],
  [79, "Kathari Parallel Collectible Card Back [SE]"],
  [80, "Marcolian Parallel Collectible Card Back [SE]"],
  [81, "Shroud Parallel Collectible Card Back [SE]"],
  [82, "The First Son of Mars [SE]"],
  [85, "Augencore Parallel Collectible Card Back [SE]"],
  [86, "Gaffar's Peace Pipe [SE]"],
  [87, "Prime Key"],
  [88, "Graphene Batteries [SE]"],
  [10089, "Rug Poll"],
  [10090, "Rug Poll"],
  [10091, "Parallel Masterpiece // Alpha // Rug Poll"],
  [10092, "Catalyst Drive"],
  [10093, "Parallel Masterpiece // Alpha // Call to Arms"],
  [10094, "Parallel Masterpiece // Alpha // Cunning Centenar "],
  [10095, "Parallel Masterpiece // Alpha // For The Glory of Mars"],
  [10096, "Parallel Masterpiece // Alpha // Solar Flare"],
  [10097, "Parallel Masterpiece // Alpha // Lancer Tank"],
  [10098, "Parallel Masterpiece // Alpha // Manipulation Ray"],
  [10099, "Parallel Masterpiece // Alpha // Demolecularize"],
  [10100, "Parallel Masterpiece // Alpha // Earthen Shield"],
  [10101, "Parallel Masterpiece // Alpha // Void Crystal"],
  [10102, "Void Crystal"],
  [10103, "Void Crystal [SE]"],
  [10104, "Parallel Masterpiece // Alpha // Malachite Shield"],
  [10105, "Malachite Shield"],
  [10106, "Malachite Shield [SE]"],
  [10107, "Parallel Masterpiece // Alpha // Marcolian Bannerman"],
  [10108, "Marcolian Bannerman"],
  [10109, "Marcolian Bannerman [SE]"],
  [10110, "Parallel Masterpiece // Alpha // Soleia, Disciple of Gaffar"],
  [10111, "Soleia, Disciple of Gaffar"],
  [10112, "Soleia, Disciple of Gaffar [SE]"],
  [10113, "Parallel Masterpiece // Alpha // Reclamator"],
  [10114, "Reclamator"],
  [10115, "Reclamator [SE]"],
  [10116, "Parallel Masterpiece // Alpha // Enthalpy's Grasp"],
  [10117, "Enthalpy's Grasp"],
  [10118, "Enthalpy's Grasp"],
  [10119, "Lancer Tank"],
  [10120, "Lancer Tank [SE]"],
  [10121, "Parallel Masterpiece // Alpha // Gaia's Call"],
  [10122, "Gaia's Call"],
  [10123, "Gaia's Call [SE]"],
  [10124, "Parallel Masterpiece // Alpha // Antius's Forecast"],
  [10125, "Parallel Masterpiece // Alpha // Tabula Rasa"],
  [10126, "Tabula Rasa [SE]"],
  [10127, "Parallel Masterpiece // Alpha // Warden"],
  [10128, "Warden [SE]"],
  [10129, "Parallel Masterpiece // Alpha // Trade Secrets"],
  [10130, "Trade Secrets"],
  [10131, "Trade Secrets [SE]"],
  [10132, "Parallel Masterpiece // Alpha // Solar Grenade"],
  [10133, "Solar Grenade"],
  [10134, "Solar Grenade [SE]"],
  [10135, "Parallel Masterpiece // Alpha // Strength of Mars"],
  [10136, "Strength of Mars"],
  [10137, "Strength of Mars [SE]"],
  [10138, "Parallel Masterpiece // Alpha // Supply Drop"],
  [10139, "Supply Drop"],
  [10140, "Supply Drop [SE]"],
  [10141, "Demolecularize"],
  [10142, "Demolecularize [SE]"],
  [10143, "Genetic Correction"],
  [10144, "Genetic Correction [SE]"],
  [10145, "Parallel Masterpiece // Alpha // Repurposed Hardware"],
  [10146, "Repurposed Hardware"],
  [10147, "Repurposed Hardware"],
  [10148, "Repurposed Hardware [SE]"],
  [10149, "Repurposed Hardware [SE]"],
  [10150, "Paradox"],
  [10151, "Paradox [SE]"],
  [10152, "Enthalpy's Grasp [SE]"],
  [10153, "Amperage"],
  [10154, "Amperage [SE]"],
  [10155, "Entropy's Reach "],
  [10156, "Entropy's Reach [SE]"],
  [10157, "Entropy's Reach "],
  [10158, "Parallel Masterpiece // Alpha // Reliant Gamma"],
  [10159, "Reliant Gamma [SE]"],
  [10160, "Parallel Masterpiece // Alpha // Foundry Technician"],
  [10161, "Foundry Technician [SE]"],
  [10162, "Parallel Masterpiece // Alpha // The Tree of Nehemiah"],
  [10163, "The Tree of Nehemiah"],
  [10164, "The Tree of Nehemiah [SE]"],
  [10165, "Parallel Masterpiece // Alpha // Pocket Dimension"],
  [10166, "Pocket Dimension"],
  [10167, "Pocket Dimension [SE]"],
  [10168, "Parallel Masterpiece // Alpha // Life Well "],
  [10169, "Life Well"],
  [10170, "Life Well [SE]"],
  [10171, "Parallel Masterpiece // Alpha // Manipulation Ray"],
  [10172, "Manipulation Ray"],
  [10173, "Manipulation Ray [SE]"],
  [10174, "Parallel Masterpiece // Alpha // Master Poisoner"],
  [10175, "Master Poisoner"],
  [10176, "Master Poisoner [SE]"],
  [10177, "Parallel Masterpiece // Alpha // Reality Manipulator"],
  [10178, "Reality Manipulator"],
  [10179, "Reality Manipulator [SE]"],
  [10180, "Parallel Masterpiece // Alpha // Nucleotic Synthesizer"],
  [10181, "Nucleotic Synthesizer"],
  [10182, "Nucleotic Synthesizer [SE]"],
  [10183, "Parallel Masterpiece // Alpha // Ocular Implant"],
  [10184, "Ocular Implant"],
  [10185, "Ocular Implant [SE]"],
  [10186, "Parallel Masterpiece // Alpha // Earthbreaker Cannon"],
  [10187, "Earthbreaker Cannon"],
  [10189, "Earthbreaker Cannon [SE]"],
  [10190, "Parallel Masterpiece // Alpha // Change of Heart"],
  [10191, "Change of Heart"],
  [10192, "Change of Heart"],
  [10193, "Change of Heart"],
  [10194, "Parallel Masterpiece // Alpha // Collateral Damage"],
  [10195, "Change of Heart [SE]"],
  [10196, "Change of Heart [SE]"],
  [10197, "Collateral Damage [SE]"],
  [10198, "Collateral Damage [SE]"],
  [10199, "Collateral Damage"],
  [10200, "Collateral Damage"],
  [10201, "Repurposed Hardware"],
  [10202, "Repurposed Hardware"],
  [10203, "Repurposed Hardware [SE]"],
  [10204, "Repurposed Hardware [SE]"],
  [10205, "Parallel Masterpiece // Alpha // Mechanize"],
  [10206, "Mechanize [SE]"],
  [10207, "Mechanize"],
  [10208, "Antius's Forecast [SE]"],
  [10209, "Antius's Forecast"],
  [10210, "Tabula Rasa"],
  [10211, "Warden"],
  [10212, "Foundry Technician"],
  [10213, "Reliant Gamma"],
  [10214, "Change of Heart Concept Art Card"],
  [10215, "Foundry Technician Concept Art Card"],
  [10216, "Gaffar, Arbiter of Earth Concept Art Card"],
  [10217, "Malachite Shield Concept Art Card"],
  [10218, "New Dawn Concept Art Card"],
  [10219, "Pocket Dimension 01 Concept Art Card "],
  [10220, "Pocket Dimension 02 Concept Art Card"],
  [10221, "Soleia, Disciple of Gaffar Concept Art Card "],
  [10222, "MEV Stone Concept Art Card "],
  [10223, "New Dawn Art Card"],
  [10224, "Augencore Logo Collectible Card Back"],
  [10225, "Shroud Clear Void Crystal Collectible Card Back "],
  [10226, "Earthen Logo Collectible Card Back"],
  [10227, "Kathari Logo Collectible Card Back"],
  [10228, "Shroud Logo Collectible Card Back"],
  [10229, "Marcolian Logo Collectible Card Back"],
  [10230, "Warden Collectible Card Back"],
  [10231, "Parallel Masterpiece // Alpha // Instant Replicator "],
  [10232, "Instant Replicator"],
  [10233, "Instant Replicator [SE]"],
  [10234, "Parallel Masterpiece // Alpha // Instant Replicator"],
  [10235, "Instant Replicator"],
  [10236, "Instant Replicator [SE]"],
  [10237, "Antius's Forecast"],
  [10238, "Pocket Dimension [SE]"],
  [10239, "Pocket Dimension [SE]"],
  [10240, "Pocket Dimension"],
  [10241, "Pocket Dimension"],
  [10242, "The Tree of Nehemiah"],
  [10243, "The Tree of Nehemiah"],
  [10244, "The Tree of Nehemiah [SE]"],
  [10245, "The Tree of Nehemiah [SE]"],
  [10246, "Gaia's Call"],
  [10247, "Gaia's Call"],
  [10248, "Gaia's Call [SE]"],
  [10249, "Gaia's Call [SE]"],
  [10250, "Warden"],
  [10251, "Warden"],
  [10252, "Warden [SE]"],
  [10253, "Void Crystal"],
  [10254, "Void Crystal"],
  [10255, "Void Crystal [SE]"],
  [10256, "Void Crystal [SE]"],
  [10257, "Parallel Masterpiece // Alpha // Eye of Galli"],
  [10258, "Eye of Galli"],
  [10259, "Eye of Galli"],
  [10260, "Eye of Galli [SE]"],
  [10261, "Parallel Masterpiece // Alpha // Cost of Creation"],
  [10262, "Cost of Creation"],
  [10263, "Cost of Creation [SE]"],
  [10264, "Parallel Masterpiece // Alpha // Trade Secrets"],
  [10265, "Trade Secrets"],
  [10266, "Trade Secrets [SE]"],
  [10267, "Parallel Masterpiece // Alpha // G.R.A.U.L"],
  [10268, "G.R.A.U.L"],
  [10269, "G.R.A.U.L"],
  [10270, "Parallel Masterpiece // Alpha // Seeing Triple"],
  [10271, "Seeing Triple"],
  [10272, "Seeing Triple"],
  [10273, "Parallel Masterpiece // Alpha // Star Chart"],
  [10274, "Star Chart"],
  [10275, "Star Chart"],
  [10276, "Star Chart [SE]"],
  [10277, "Parallel Masterpiece // Alpha // Backup Copy"],
  [10278, "Backup Copy [SE]"],
  [10279, "Backup Copy [SE]"],
  [10280, "Parallel Masterpiece // Alpha // Smuggled Supplies"],
  [10281, "Smuggled Supplies "],
  [10282, "Smuggled Supplies"],
  [10283, "Parallel Masterpiece // Alpha // Reality Manipulator"],
  [10284, "Warden [SE]"],
  [10285, "Eye of Galli [SE]"],
  [10286, "Collateral Damage [SE]"],
  [10287, "Collateral Damage [SE]"],
  [10288, "Change of Heart [SE]"],
  [10289, "Change of Heart [SE]"],
  [10290, "Repurposed Hardware [SE]"],
  [10291, "Repurposed Hardware [SE]"],
  [10292, "Strength of Mars [PL]"],
  [10293, "Eye of Galli [PL]"],
  [10294, "Eye of Galli [PL]"],
  [10295, "Seeing Triple [SE]"],
  [10296, "Smuggled Supplies [SE]"],
  [10297, "G.R.A.U.L [SE]"],
  [10298, "Backup Copy"],
  [10299, "Smuggled Supplies"],
  [10300, "Parallel Masterpiece // Alpha // Eye of Galli"],
  [10301, "Rug Poll [SE]"],
  [10302, "Rug Poll [SE]"],
  [10303, "Rug Pull Art Card "],
  [10304, "Rug Pull Art Card"],
  [10305, "Rug Pull Art Card"],
  [10306, "Galaxy Key"],
  [10307, "Enhanced Blueprints"],
  [10308, "Enhanced Blueprints [SE]"],
  [10309, "Jury-Rigged Juggernaut"],
  [10310, "Jury-Rigged Juggernaut [SE]"],
  [10311, "Kill Switch"],
  [10312, "Kill Switch [SE]"],
  [10313, "Kill Switch"],
  [10314, "THUNDR-01 Munitions"],
  [10315, "THUNDR-01 Munitions [SE]"],
  [10316, "Doctor's Assistant"],
  [10317, "Doctor's Assistant [SE]"],
  [10318, "Kamuy Protector"],
  [10319, "Kamuy Protector [SE]"],
  [10320, "Cleanse the Earth"],
  [10321, "Cleanse the Earth [SE]"],
  [10322, "Hydrolist Chamber"],
  [10323, "Hydrolist Chamber [SE]"],
  [10324, "Maritus, Aetian Recombinant"],
  [10325, "Maritus, Aetian Recombinant [SE]"],
  [10326, "Unnatural Selection"],
  [10327, "Unnatural Selection [SE]"],
  [10328, "Claymore Artillery Gun"],
  [10329, "Claymore Artillery Gun [SE]"],
  [10330, "Interrogation Tools"],
  [10331, "Interrogation Tools [SE]"],
  [10332, "Ruthless Sergeant"],
  [10333, "Ruthless Sergeant [SE]"],
  [10334, "Trigger-happy Trooper"],
  [10335, "Trigger-happy Trooper [SE]"],
  [10336, "Unstable Drone"],
  [10337, "Unstable Drone [SE]"],
  [10338, "Dark Allure"],
  [10339, "Dark Allure [SE]"],
  [10340, "Fanatical Crewman"],
  [10341, "Fanatical Crewman [SE]"],
  [10342, "Honored Steward"],
  [10343, "Honored Steward [SE]"],
  [10344, "Singularity Steward"],
  [10345, "Singularity Steward [SE]"],
  [10346, "Spectre Attack Craft"],
  [10347, "Spectre Attack Craft [SE]"],
  [10348, "Spider Drone"],
  [10349, "Spider Drone [SE]"],
  [10350, "Annihilate"],
  [10351, "Annihilate [SE]"],
  [10352, "Data Breach"],
  [10353, "Data Breach [SE]"],
  [10354, "Life Stream"],
  [10355, "Life Stream [SE]"],
  [10356, "Scanner Probe"],
  [10357, "Scanner Probe [SE]"],
  [10358, "Tome of Aetio"],
  [10359, "Tome of Aetio"],
  [10360, "Tome of Aetio [SE]"],
  [10361, "Tome of Aetio"],
  [10362, "Tome of Aetio [SE]"],
  [10363, "Memento of the Fallen"],
  [10364, "Memento of the Fallen [SE]"],
  [10365, "Memento of the Fallen"],
  [10366, "Memento of the Fallen [SE]"],
  [10367, "Scanner Array"],
  [10368, "Scanner Array [SE]"],
  [10369, "Scanner Array"],
  [10370, "Scanner Array [SE]"],
  [10371, "Paradigm Shift"],
  [10372, "Paradigm Shift"],
  [10374, "Paradigm Shift [SE]"],
  [10375, "Paradigm Shift [SE]"],
  [10376, "Parallel Masterpiece // Alpha // Paradigm Shift"],
  [10377, "The Staff of Shoshanna [PL]"],
  [10378, "The Staff of Shoshanna"],
  [10379, "The Staff of Shoshanna [SE]"],
  [10382, "EMP Shockwave [PL]"],
  [10383, "EMP Shockwave"],
  [10384, "EMP Shockwave"],
  [10385, "EMP Shockwave [SE]"],
  [10386, "Seer's Stone [PL]"],
  [10388, "Seer's Stone"],
  [10389, "Seer's Stone [SE]"],
  [10390, "Infused Core [PL]"],
  [10391, "Infused Core"],
  [10392, "Infused Core [SE]"],
  [10393, "Unfair Advantage"],
  [10394, "Unfair Advantage [SE]"],
  [10395, "Magna, Tempest's Will"],
  [10396, "Magna, Tempest's Will [SE]"],
  [10397, "Mantis Corsair"],
  [10398, "Mantis Corsair [SE]"],
  [10399, "Parallel Masterpiece // Alpha // Enhanced Blueprints"],
  [10400, "Parallel Masterpiece // Alpha // Jury-Rigged Juggernaut"],
  [10402, "Parallel Masterpiece // Alpha // Kill Switch"],
  [10403, "Parallel Masterpiece // Alpha // Scanner Array"],
  [10404, "Parallel Masterpiece // Alpha // THUNDR-01 Munitions"],
  [10405, "Parallel Masterpiece // Alpha // Aurora Fungi"],
  [10406, "Parallel Masterpiece // Alpha // Cleanse the Earth"],
  [10407, "Parallel Masterpiece // Alpha // Doctor's Assistant"],
  [10408, "Parallel Masterpiece // Alpha // Kamuy Protector"],
  [10409, "Parallel Masterpiece // Alpha // The Staff of Shoshanna"],
  [10410, "Parallel Masterpiece // Alpha // Hydrolist Chamber"],
  [10411, "Parallel Masterpiece // Alpha // Magna, Tempest's Will"],
  [10412, "Parallel Masterpiece // Alpha // Maritus, Aetian Recombinant"],
  [10413, "Parallel Masterpiece // Alpha // Tome of Aetio"],
  [10414, "Parallel Masterpiece // Alpha // Unnatural Selection"],
  [10415, "Parallel Masterpiece // Alpha // Claymore Artillery Gun"],
  [10416, "Parallel Masterpiece // Alpha // Interrogation Tools"],
  [10417, "Parallel Masterpiece // Alpha // Ruthless Sergeant"],
  [10418, "Parallel Masterpiece // Alpha // Trigger-happy Trooper"],
  [10419, "Parallel Masterpiece // Alpha // Unstable Drone"],
  [10420, "Parallel Masterpiece // Alpha // Dark Allure"],
  [10421, "Parallel Masterpiece // Alpha // Fanatical Crewman"],
  [10422, "Parallel Masterpiece // Alpha // Honored Steward"],
  [10423, "Parallel Masterpiece // Alpha // Singularity Steward"],
  [10424, "Parallel Masterpiece // Alpha // Spectre Attack Craft"],
  [10425, "Parallel Masterpiece // Alpha // Spider Drone"],
  [10426, "Parallel Masterpiece // Alpha // Annihilate"],
  [10427, "Parallel Masterpiece // Alpha // Data Breach"],
  [10428, "Parallel Masterpiece // Alpha // EMP Shockwave"],
  [10429, "Parallel Masterpiece // Alpha // Infused Core"],
  [10430, "Parallel Masterpiece // Alpha // Life Stream"],
  [10431, "Parallel Masterpiece // Alpha // Memento of the Fallen"],
  [10432, "Parallel Masterpiece // Alpha // Mantis Corsair"],
  [10433, "Parallel Masterpiece // Alpha // Scanner Probe"],
  [10434, "Parallel Masterpiece // Alpha // Seer's Stone"],
  [10435, "Parallel Masterpiece // Alpha // Unfair Advantage"],
  [
    10436,
    "Parallel Masterpieces - Alpha Set - Augencore: Unfair Advantage // Art by Nacho Yagüe // 2021"
  ],
  [10437, "Parallel Masterpiece // Alpha // Unfair Advantage"],
  [10438, "Parallel Masterpiece // Alpha // Assembly Foreman"],
  [10439, "Parallel Masterpiece // Alpha // The Staff of Shoshanna"],
  [10440, "Parallel Masterpiece // Alpha // EMP Shockwave"],
  [10441, "Parallel Masterpiece // Alpha // Infused Core"],
  [10442, "Parallel Masterpiece // Alpha // Seer's Stone"],
  [10444, "Data Breach [SE]"],
  [10445, "Data Breach"],
  [10446, "Assembly Foreman"],
  [10447, "Assembly Foreman [SE]"],
  [10448, "Arak, Combat Overseer Art Card"],
  [10449, "Juggernaut Workshop Art Card"],
  [10450, "Maritus Concept Art Card"],
  [10451, "Brand, Steward Eternal Art Card"],
  [10452, "Dark Allure Concept Art Card"],
  [10453, "Honored Steward Concept Art Card"],
  [10454, "Singularity Steward Concept Art"],
  [10455, "EMP Shockwave Concept Art Card"],
  [10456, "Fluid Dynamics Art Card"],
  [10457, "Kamuy Mask Collectible Card Back"],
  [10458, "Jury-Rigged Juggernaut Collectible Card Back"],
  [10459, "Unnatural Selection Collectible Card Back"],
  [10460, "EMP Shockwave Collectible Card Back"],
  [10461, "Parallel Logo Collectible Card Back"],
  [10462, "PDII Core Pack Reservation"],
  [10464, "The Core"],
  [10465, "The Staff of Shoshanna [PL]"],
  [10466, "EMP Shockwave [PL]"],
  [10467, "Seer's Stone [PL]"],
  [10469, "Infused Core [PL]"],
  [10470, "Parallel Masterpiece // Alpha // The Staff of Shoshanna"],
  [10471, "Parallel Masterpiece // Alpha // EMP Shockwave"],
  [10472, "Parallel Masterpiece // Alpha // Infused Core"],
  [10473, "Parallel Masterpiece // Alpha // Seer's Stone"],
  [10475, "Fluid Dynamics Art Card"],
  [10476, "Jury-Rigged Juggernaut Collectible Card Back"],
  [10477, "Kamuy Mask Collectible Card Back"],
  [10478, "Unnatural Selection Collectible Card Back"],
  [10479, "EMP Shockwave Collectible Card Back"],
  [10480, "Parallel Logo Collectible Card Back"],
  [10481, "PDII Core Pack Reservation"],
  [10482, "Battle-hardened Warrior"],
  [10483, "Battle-hardened Warrior [SE]"],
  [10484, "Parallel Masterpiece // Alpha // Battle-hardened Warrior"]
];

const CardIds = Cards.map((x) => x[0]);

async function updateQty() {
  var qty = await Contract.methods
    .balanceOf(DistributionWallet, PackDropAsset)
    .call();

  var e = document.getElementById("qty");
  if (e == null) {
    return;
  }

  if (qty == null) {
    e.innerHTML = "...";
  } else {
    var p = (((qty * 1.0) / (OriginalMintQty * 1.0)) * 100).toFixed(2);
    var s =
      `<a target="_blank" href="https://opensea.io/` +
      DistributionWallet +
      `">` +
      qty.toString() +
      `</a> (` +
      p.toString() +
      `% remaining)`;
    e.innerHTML = s;
  }

  document.getElementById("lastUpdate").innerHTML = new Date().toString();
}

document.getElementById("app").innerHTML =
  `
<div style="margin:10px;">
<h1><a target="_blank" href="https://opensea.io/collection/echelon-cache">Echelon Cache</a></h1>

<h2><a target="_blank" href="https://opensea.io/assets/0x38398a2d7a4278b8d83967e0d235164335a0394a/1">Core Pack Reservation</a> Distribution Monitor</h2>
<span style="font-size:14px;">by <a target="_blank" href="https://twitter.com/jerisbrisk">JERisBRISK</a></span>
<br/><br/>
<div>Updates occur every ` +
  UpdateInterval +
  ` seconds.
</div>
<div style="color:darkgray;font-size:14px;">Last update @ <span id="lastUpdate"/></div>
<br/>
<video style="width:400px;" autoplay="" class="AssetMedia--video" controls="" controlslist="nodownload" loop="" playsinline="" poster="https://lh3.googleusercontent.com/El3KsDVef3-CtGoiFgdn5E6maIqHt7LWnN9vKuiZPEvOMlaJiL3Mnikfye6A9Glr-aFCbcSDFi3vZActN_xliPHfFDR-sZ6i4Uh8" preload="metadata" style="border-radius: initial;"><source src="https://storage.opensea.io/files/2fac4585b6c582c6a20e2009dd62b6fe.mp4#t=0.001" type="video/mp4"></video>
<div style="color:darkgray;font-size:14px;">Last Core Pack sale: <span id="lastCorePackSale"/>...</div>
<h3>Packs held by Parallel: <span id="qty"/></h3>
<div>Original mint quantity: ` +
  OriginalMintQty +
  `</div>
<br/>
<div><strong>&gt;&gt;&gt;</strong> <a target="_blank" href="https://parallel.life/echelon/cache/">Claim yours.</a> <strong>&lt;&lt;&lt;</strong></div>
<br/>
<strong>&gt;&gt;&gt;</strong> <a target="_blank" href="https://parallel.life/echelon/cache/collect/">Already claimed? COLLECT YOUR PACK!</a> <strong>&lt;&lt;&lt;</strong>
<h3>There are <span id="cardsLeft"></span> cards (<span id="packsLeft"></span> packs worth) left.</h3>
<table class="sortable">
<tr>
<th>Name</th><th>Remaining</th><th>Last Sale</th><th>Traits</th>
</tr>
<tbody id="debug"></tbody>
</table>
</div>
`;

async function updateCorePackSale() {
  const options = { method: "GET" };
  const limit = 1;
  const offset = 0;

  var uri = `https://api.opensea.io/api/v1/assets?owner=${DistributionWallet}&token_ids=1&asset_contract_address=${contract_address}&order_direction=desc&offset=${offset}&limit=${limit}`;
  console.info(`Requesting: ${uri}`);

  var asset = (
    await fetch(uri, options)
      .then((response) => response.json())
      .then((response) => response.assets)
      .catch((err) => console.error(err))
  )[0];

  console.log(asset);
  var lastSale = getLastSale(asset);

  document.getElementById("lastCorePackSale").innerHTML = lastSale;
}

async function getAssets() {
  const options = { method: "GET" };
  const limit = 50;

  var assets = new Map();
  var offset = 0;
  var thereIsMore = true;

  while (thereIsMore) {
    var uri = `https://api.opensea.io/api/v1/assets?owner=${ParallelWallet}&asset_contract_address=${contract_address2}&order_direction=desc&offset=${offset}&limit=${limit}`;
    console.info(`Requesting: ${uri}`);

    var res = await fetch(uri, options)
      .then((response) => response.json())
      .then((response) => response.assets)
      .catch((err) => console.error(err));

    offset += res.length;

    res.forEach((a) => {
      assets.set(parseInt(a.token_id, 10), a);
    });

    if (res.length < limit) {
      thereIsMore = false;
    }
  }

  console.log(`Got ${assets.size} assets.`);
  return assets;
}

async function getCardsInWallet() {
  var ids = CardIds;
  var wallets = Cards.map((x) => ParallelWallet);

  var e = document.getElementById("debug");
  var cle = document.getElementById("cardsLeft");
  var ple = document.getElementById("packsLeft");

  var balances = await Contract2.methods
    .balanceOfBatch(wallets, ids)
    .call()
    .catch((e) => console.error(e));

  var links = [];
  var cardsleft = 0;
  var packsleft = 0;

  var assets = await getAssets();

  for (var b = 0; b < balances.length; b++) {
    var qty = balances[b];
    cardsleft += parseInt(qty, 10);

    if (qty !== "0") {
      var cardName = Cards[b][1];
      var cardId = Cards[b][0];
      var asset = assets.get(cardId);
      var lastSale = getLastSale(asset);
      var traits = getTraits(asset).join(", ");

      links.push(
        `${cardName}<tr>
        <td><a target="_blank" href="https://opensea.io/assets/${contract_address2}/${cardId}">${cardName}<a></td>
        <td>${qty}</td>
        <td>${lastSale}</td>
        <td>${traits}</td>
        </tr>`
      );
    }
  }

  links = links.sort();
  if (e !== null) {
    e.innerHTML = "";
    links.forEach((c) => {
      c = c.substring(c.indexOf("<"));
      e.innerHTML += c;
    });
  }
  packsleft = cardsleft / 4;

  if (cle !== null && ple !== null) {
    cle.innerHTML = `${cardsleft}`;
    ple.innerHTML = `${packsleft}`;
  }
}

function getLastSale(asset) {
  if (asset === null || asset.last_sale === null) {
    return "<em>data unavailable</em>";
  }

  var qty = parseInt(asset.last_sale.quantity, 10);
  qty = qty > 0 ? qty : 1;
  var amt = parseFloat(asset.last_sale.total_price);
  var currency = asset.last_sale.payment_token.symbol;
  var usdPrice = parseFloat(asset.last_sale.payment_token.usd_price);
  var totalEth = (amt / qty / Math.pow(10, 18)).toFixed(4);

  return `${currency} ${totalEth} @ $${usdPrice}/${currency}`;
}

function getTraits(asset) {
  var traits = [];
  asset.traits
    .sort((a, b) => {
      var x = a.trait_type.toUpperCase();
      var y = b.trait_type.toUpperCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    })
    .forEach((a) => traits.push(`${a.trait_type}: ${a.value}`));

  return traits;
}

updateQty();
updateCorePackSale();
getCardsInWallet();

window.setInterval(updateQty, UpdateInterval * 1000);
window.setInterval(updateCorePackSale, UpdateInterval * 1000);
window.setInterval(getCardsInWallet, UpdateInterval * 1000);
