import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  AuctionClaimed,
  AuctionStarted,
  Bid
} from "../generated/SnapitAuction/SnapitAuction"

export function createAuctionClaimedEvent(
  tokenId: BigInt,
  winner: Address,
  price: BigInt
): AuctionClaimed {
  let auctionClaimedEvent = changetype<AuctionClaimed>(newMockEvent())

  auctionClaimedEvent.parameters = new Array()

  auctionClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  auctionClaimedEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )
  auctionClaimedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return auctionClaimedEvent
}

export function createAuctionStartedEvent(
  tokenId: BigInt,
  startTime: BigInt,
  endTime: BigInt
): AuctionStarted {
  let auctionStartedEvent = changetype<AuctionStarted>(newMockEvent())

  auctionStartedEvent.parameters = new Array()

  auctionStartedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  auctionStartedEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )
  auctionStartedEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )

  return auctionStartedEvent
}

export function createBidEvent(
  tokenId: BigInt,
  bidder: Address,
  price: BigInt
): Bid {
  let bidEvent = changetype<Bid>(newMockEvent())

  bidEvent.parameters = new Array()

  bidEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  bidEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder))
  )
  bidEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return bidEvent
}
