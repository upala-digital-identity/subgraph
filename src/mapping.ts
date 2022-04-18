import { BigInt, store, log, dataSource } from "@graphprotocol/graph-ts"

import {
  NewIdentity,
  NewCandidateDelegate,
  NewDelegate,
  DelegateDeleted,
  NewIdentityOwner,
  Exploded,
  NewPool,
  NewPoolFactoryStatus,
  NewDAppStatus,
  NewAttackWindow,
  NewExecutionWindow,
  NewExplosionFeePercent,
  NewTreasury,
  OwnershipTransferred,
} from "../generated/Upala/Upala"
import { Transfer } from "../generated/ERC20/ERC20"
import { UpalaID, Delegate, PoolFactory, Pool, UpalaSettings, DApp } from "../generated/schema"
import { BundledScoresPool, DappContract } from '../generated/templates'

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
  pool.baseScore = BigInt.fromI32(0)  // todo see uniswap's zero helper
  pool.balance = BigInt.fromI32(0)  // todo see uniswap's zero helper
  pool.metadata = ''
  pool.save()
  BundledScoresPool.create(event.params.poolAddress)
}

// checks if pools exist and updates balances accordingly
// pool can be funded by another pool
export function handleTransfer(event: Transfer): void {
  let from = event.params.from
  let to = event.params.to
  let fromPool = Pool.load(from.toHex())
  let toPool = Pool.load(to.toHex())
  let value = event.params.value
  if (fromPool) {
    fromPool.balance = fromPool.balance.minus(value)
    fromPool.save()
  }
  if (toPool) {
    toPool.balance = toPool.balance.plus(value)
    toPool.save()
  }
}

/****
DAPPS
****/

export function handleNewDAppStatus(event: NewDAppStatus): void {
  let dappAddress = event.params.dappAddress
  let isRegistered = event.params.isRegistered  // false if unregistering dapp
  let dapp = DApp.load(dappAddress.toHex())
  let needTemplate = false
  if (!dapp) {
    dapp = new DApp(dappAddress.toHex())
    needTemplate = true
  }
  dapp.isRegistered = isRegistered
  dapp.save()
  if (isRegistered && needTemplate) {
    DappContract.create(event.params.dappAddress)
  }
}

/****
UPALA
****/

export function handleNewAttackWindow(event: NewAttackWindow): void {
  let upala = new UpalaSettings('1')
  upala.attackWindow = event.params.newWindow
  upala.save()
}

export function handleNewExecutionWindow(event: NewExecutionWindow): void {
  let upala = new UpalaSettings('1')
  upala.executionWindow = event.params.newWindow
  upala.save()
}

export function handleNewExplosionFeePercent(
  event: NewExplosionFeePercent
): void {
  let upala = new UpalaSettings('1')
  upala.explosionFeePercent = event.params.newFee
  upala.save()
}

export function handleNewTreasury(event: NewTreasury): void {
  let upala = new UpalaSettings('1')
  upala.treasury = event.params.newTreasury
  upala.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let upala = new UpalaSettings('1')
  upala.owner = event.params.newOwner
  upala.save()
}
