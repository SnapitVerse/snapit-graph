import { Address, BigInt, store } from '@graphprotocol/graph-ts'
import {
  ApprovalForAll as ApprovalForAllEvent,
  TransferBatch as TransferBatchEvent,
  TransferSingle as TransferSingleEvent,
  URI as URIEvent,
} from '../generated/SnapitNFT/SnapitNFT'
import {
  ApprovalForAll,
  TransferBatch,
  TransferSingle,
  URI,
  Token,
  TokenBalance,
} from '../generated/schema'

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferBatch(event: TransferBatchEvent): void {
  let entity = new TransferBatch(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.ids = event.params.ids
  entity.values = event.params.values

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let operator = event.params.operator
  let from = event.params.from
  let to = event.params.to
  let ids = event.params.ids
  let values = event.params.values

  for (let i = 0; i < ids.length; i++) {
    let tokenId = ids[i].toString()

    // Update balance for 'from' (deduct)
    updateTokenBalance(from, tokenId, values[i].neg())

    // Update balance for 'to' (add)
    updateTokenBalance(to, tokenId, values[i])
  }
}

export function handleTransferSingle(event: TransferSingleEvent): void {
  let entity = new TransferSingle(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.SnapitNFT_id = event.params.id
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let tokenId = event.params.id.toString()
  let from = event.params.from
  let to = event.params.to
  let amount = event.params.value

  // Update balances for 'from' and 'to'
  updateTokenBalance(from, tokenId, amount.neg())
  updateTokenBalance(to, tokenId, amount)
}

export function handleURI(event: URIEvent): void {
  let entity = new URI(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.value = event.params.value
  entity.SnapitNFT_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

function updateTokenBalance(
  owner: Address,
  tokenId: String,
  amount: BigInt
): void {
  if (owner.toHexString() == '0x0000000000000000000000000000000000000000')
    return
  let id = tokenId + '-' + owner.toHexString()
  let tokenBalance = TokenBalance.load(id)

  if (tokenBalance == null) {
    tokenBalance = new TokenBalance(id)
    tokenBalance.owner = owner

    // Ensure the Token entity exists
    let tokenEntity = Token.load(tokenId.toString())
    if (tokenEntity == null) {
      tokenEntity = new Token(tokenId.toString())
      // Set properties for tokenEntity as needed, e.g., metadataUri
      tokenEntity.save()
    }

    // Now reference the Token entity in TokenBalance
    tokenBalance.token = tokenEntity.id
    tokenBalance.balance = BigInt.fromI32(0)
  }

  tokenBalance.balance = tokenBalance.balance.plus(amount)

  if (tokenBalance.balance.equals(BigInt.fromI32(0))) {
    // Optionally remove the balance entity if it reaches zero
    store.remove('TokenBalance', id)
  } else {
    tokenBalance.save()
  }
}
