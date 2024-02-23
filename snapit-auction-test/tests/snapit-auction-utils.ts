import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  AuctionClaimed,
  AuctionStarted,
  Bided
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

export function createBidedEvent(
  tokenId: BigInt,
  bidder: Address,
  price: BigInt
): Bided {
  let bidedEvent = changetype<Bided>(newMockEvent())

  bidedEvent.parameters = new Array()

  bidedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  bidedEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder))
  )
  bidedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return bidedEvent
}