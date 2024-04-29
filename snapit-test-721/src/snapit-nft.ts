import { Address, BigInt, store } from "@graphprotocol/graph-ts";
import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Transfer as TransferEvent,
} from "../generated/SnapitNFT/SnapitNFT";
import {
  Approval,
  ApprovalForAll,
  OwnershipTransferred,
  Token,
  TokenOwnership,
  Transfer,
} from "../generated/schema";

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.approved = event.params.approved;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operator = event.params.operator;
  entity.approved = event.params.approved;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  addTokenOwner(event.params.to, event.params.tokenId.toString());

  entity.save();
}

function addTokenOwner(owner: Address, tokenId: String): void {
  if (owner.toHexString() == "0x0000000000000000000000000000000000000000")
    return;
  let id = tokenId + "-" + owner.toHexString();
  let ownership = TokenOwnership.load(id);

  if (ownership == null) {
    ownership = new TokenOwnership(id);
    ownership.owner = owner;

    // Ensure the Token entity exists
    let tokenEntity = Token.load(tokenId.toString());
    if (tokenEntity == null) {
      tokenEntity = new Token(tokenId.toString());
      // Set properties for tokenEntity as needed, e.g., metadataUri
      tokenEntity.metadataUri = `https://test-api.snapit.world/api/token/${tokenId}.json`;
      tokenEntity.save();
    }

    // Now reference the Token entity in TokenBalance
    ownership.token = tokenEntity.id;
  }

  ownership.save();
}
