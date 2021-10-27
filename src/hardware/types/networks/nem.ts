/* @flow */
// NEM types from nem-sdk
// https://nemproject.github.io/#transferTransaction

type MosaicID = {
    namespaceId: string,
    name: string
};

type MosaicDefinition = {
    levy?: {
        type?: number,
        fee?: number,
        recipient?: string,
        mosaicId?: MosaicID
    },
    id: MosaicID,
    description: string,
    properties?: Array<{
        name: "divisibility" | "initialSupply" | "supplyMutable" | "transferable",
        value: string
    }>
};

export type NEMMosaic = {
    mosaicId: MosaicID,
    quantity: number
};

type Modification = {
    modificationType: number,
    cosignatoryAccount: string
};

type Message = {
    payload?: string,
    type?: number,
    publicKey?: string // not present in sdk
};

type TransactionCommon = {
    version: number,
    timeStamp: number,
    fee: number,
    deadline?: number,
    signer?: string
};

export type NEMTransferTransaction = TransactionCommon & {
    type: 257,
    recipient: string,
    amount: number | string,
    mosaics?: NEMMosaic[],
    message?: Message
};

export type NEMImportanceTransaction = TransactionCommon & {
    type: 2049,
    importanceTransfer: {
        mode: number,
        publicKey: string
    }
};

export type NEMAggregateModificationTransaction = TransactionCommon & {
    type: 4097,
    modifications?: Modification[],
    minCosignatories: {
        relativeChange: number
    }
};

export type NEMProvisionNamespaceTransaction = TransactionCommon & {
    type: 8193,
    newPart?: string,
    parent?: string,
    rentalFeeSink?: string,
    rentalFee?: number
};

export type NEMMosaicCreationTransaction = TransactionCommon & {
    type: 16385,
    mosaicDefinition: MosaicDefinition,
    creationFeeSink?: string,
    creationFee?: number
};

export type NEMSupplyChangeTransaction = TransactionCommon & {
    type: 16386,
    mosaicId: MosaicID,
    supplyType: number,
    delta?: number
};

type Transaction = NEMTransferTransaction | NEMImportanceTransaction | NEMAggregateModificationTransaction | NEMProvisionNamespaceTransaction | NEMMosaicCreationTransaction | NEMSupplyChangeTransaction;

export type NEMMultisigTransaction = TransactionCommon & {
    type: 258 | 4098 | 4100,
    otherTrans: Transaction
};

export type NEMTransaction = Transaction | NEMMultisigTransaction;

// get address

export type NEMGetAddress = {
    path: string | number[],
    address?: string,
    network: number,
    showOnTrezor?: boolean
};

export type NEMAddress = {
    address: string,
    path: number[],
    serializedPath: string
};

// sign transaction

export type NEMSignTransaction = {
    path: string | number[],
    transaction: NEMTransaction
};
