import { BigInt, store } from "@graphprotocol/graph-ts"

import {
  Upala,
  NewIdentity,
  NewDelegate,
  DelegateDeleted,
  NewIdentityOwner,
  Exploded,

  NewAttackWindow,
  NewDAppStatus,
  NewExecutionWindow,
  NewExplosionFeePercent,
  NewPool,
  NewPoolFactoryStatus,
  NewTreasury,
  OwnershipTransferred
} from "../generated/Upala/Upala"
import { Pool, UpalaID, Delegate } from "../generated/schema"
import { BundledScoresPool } from '../generated/templates'

// Identity management
export function handleNewIdentity(event: NewIdentity): void {
  let upalaId = new UpalaID(event.params.upalaId.toHex())
  upalaId.isExploded = false
  let delegate = new Delegate(event.params.owner.toHex())
  delegate.isOwner = true
  delegate.upalaID = upalaId.id
  upalaId.save()
  delegate.save()
}

export function handleNewDelegate(event: NewDelegate): void {
  let upalaId = new UpalaID(event.params.upalaId.toHex())

  let delegate = new Delegate(event.params.delegate.toHex())
  delegate.upalaID = upalaId.id

  upalaId.save()
  delegate.save()
}

export function handleDelegateDeleted(event: DelegateDeleted): void {
  let delegate = event.params.delegate.toHex()
  store.remove('Delegate', delegate)
}

export function handleNewIdentityOwner(event: NewIdentityOwner): void {}

export function handleExploded(event: Exploded): void {
  // as we don't need any data from entity, we just create new instance
  let upalaId = new UpalaID(event.params.upalaId.toHex())
  upalaId.isExploded = true
  upalaId.save()
}


export function handleNewAttackWindow(event: NewAttackWindow): void {}

export function handleNewDAppStatus(event: NewDAppStatus): void {}


export function handleNewExecutionWindow(event: NewExecutionWindow): void {}

export function handleNewExplosionFeePercent(
  event: NewExplosionFeePercent
): void {}




export function handleNewPool(event: NewPool): void {
  let pool = new Pool(event.params.poolAddress.toHex())
  // let pool = new Pool(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  // pool.poolAddress = event.params.poolAddress
  pool.poolFactoryAddress = event.params.factory
  pool.owner = event.params.poolManager
  pool.baseScore = BigInt.fromI32(0)  // todo see uniswap zero helper
  pool.metadata = ''
  pool.isApproved = true
  pool.save()
  BundledScoresPool.create(event.params.poolAddress)
}

export function handleNewPoolFactoryStatus(event: NewPoolFactoryStatus): void {}

export function handleNewTreasury(event: NewTreasury): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
