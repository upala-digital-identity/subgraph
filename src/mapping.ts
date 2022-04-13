import { BigInt, store, log } from "@graphprotocol/graph-ts"

import {
  Upala,
  NewIdentity,
  NewCandidateDelegate,
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
import { UpalaID, Delegate, PoolFactory, Pool } from "../generated/schema"
import { BundledScoresPool } from '../generated/templates'

/******************
IDENTITY MANAGEMENT
******************/

export function handleNewIdentity(event: NewIdentity): void {
  let upalaId = new UpalaID(event.params.upalaId.toHex())
  upalaId.isExploded = false
  let delegate = new Delegate(event.params.owner.toHex())
  delegate.upalaID = upalaId.id
  delegate.isOwner = true
  delegate.isApproved = true
  upalaId.owner = delegate.id
  upalaId.save()
  delegate.save()
}

// will also rewrite existing delegate if candidate choses another UpalaID 
export function handleNewCandidateDelegate(event: NewCandidateDelegate): void {
  let delegate = new Delegate(event.params.delegate.toHex())
  let upalaId = new UpalaID(event.params.upalaId.toHex())
  delegate.upalaID = upalaId.id
  delegate.isOwner = false  // per Upala contract owner cannot delegate to oneself (always false here)
  delegate.isApproved = false
  delegate.save()
}

export function handleNewDelegate(event: NewDelegate): void {
  let delegate = new Delegate(event.params.delegate.toHex())
  delegate.isApproved = true
  delegate.save()
}

export function handleDelegateDeleted(event: DelegateDeleted): void {
  let delegate = event.params.delegate.toHex()
  store.remove('Delegate', delegate)
}

export function handleNewIdentityOwner(event: NewIdentityOwner): void {
  let upalaId = new UpalaID(event.params.upalaId.toHex())
  let oldOwner = new Delegate(event.params.oldOwner.toHex())
  let newOwner = new Delegate(event.params.newOwner.toHex())
  oldOwner.isOwner = false
  newOwner.isOwner = true
  upalaId.owner = newOwner.id
  upalaId.save()
  oldOwner.save()
  newOwner.save()
}

export function handleExploded(event: Exploded): void {
  // as we don't need any data from entity, we just create new instance
  let upalaId = new UpalaID(event.params.upalaId.toHex())
  upalaId.isExploded = true
  upalaId.save()
}

/****
POOLS
****/

export function handleNewPoolFactoryStatus(event: NewPoolFactoryStatus): void {
  let poolFactory = new PoolFactory(event.params.poolFactory.toHex())
  poolFactory.isApproved = event.params.isApproved
  poolFactory.save()
}

export function handleNewPool(event: NewPool): void {
  let pool = new Pool(event.params.poolAddress.toHex())
  let poolFactory = new PoolFactory(event.params.factory.toHex())
  pool.poolFactory = poolFactory.id
  pool.owner = event.params.poolManager
  pool.baseScore = BigInt.fromI32(0)  // todo see uniswap zero helper
  pool.metadata = ''
  pool.save()
  BundledScoresPool.create(event.params.poolAddress)
}

/****
DAPPS
****/

export function handleNewDAppStatus(event: NewDAppStatus): void {}

/****
UPALA
****/

export function handleNewAttackWindow(event: NewAttackWindow): void {}

export function handleNewExecutionWindow(event: NewExecutionWindow): void {}

export function handleNewExplosionFeePercent(
  event: NewExplosionFeePercent
): void {}

export function handleNewTreasury(event: NewTreasury): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
