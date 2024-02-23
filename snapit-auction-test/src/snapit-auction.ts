import {
  AuctionClaimed as AuctionClaimedEvent,
  AuctionStarted as AuctionStartedEvent,
  Bid as BidEvent
} from "../generated/SnapitAuction/SnapitAuction"
import { AuctionClaimed, AuctionStarted, Bid } from "../generated/schema"

export function handleAuctionClaimed(event: AuctionClaimedEvent): void {
  let entity = new AuctionClaimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId
  entity.winner = event.params.winner
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuctionStarted(event: AuctionStartedEvent): void {
  let entity = new AuctionStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId
  entity.startTime = event.params.startTime
  entity.endTime = event.params.endTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBid(event: BidEvent): void {
  let entity = new Bid(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.tokenId = event.params.tokenId
  entity.bidder = event.params.bidder
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
