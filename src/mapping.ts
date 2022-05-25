import { BigInt, store, log, dataSource } from "@graphprotocol/graph-ts"

import {
  NewIdentity,
  NewCandidateDelegate,
  NewDelegate,
  DelegateDeleted,
  NewIdentityOwner,
  Liquidated,
  NewPool,
  NewPoolFactoryStatus,
  NewDAppStatus,
  NewAttackWindow,
  NewExecutionWindow,
  NewLiquidationFeePercent,
  NewTreasury,
  OwnershipTransferred,
} from "../generated/Upala/Upala"
import { Transfer } from "../generated/ERC20/ERC20"
import { UpalaID, Delegate, PoolFactory, Pool, Protocol, DApp } from "../generated/schema"
import { BundledScoresPool, DappContract } from '../generated/templates'

/******************
IDENTITY MANAGEMENT
******************/

export function handleNewIdentity(event: NewIdentity): void {
  let upalaId = new UpalaID(event.params.upalaId.toHex())
  upalaId.isLiquidated = false
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
  delegate.upalaID = event.params.upalaId.toHex()
  delegate.isOwner = false  // per Upala contract owner cannot delegate to oneself (always false here)
  delegate.isApproved = false
  delegate.save()
}

export function handleNewDelegate(event: NewDelegate): void {
  let delegateAddress = event.params.delegate.toHex()
  let delegate = Delegate.load(delegateAddress)
  if (!delegate) {
    delegate = new Delegate(delegateAddress)
    log.error('Could not load delegate by address: {}', [delegateAddress])
  }
  delegate.isApproved = true
  delegate.save()
}

export function handleDelegateDeleted(event: DelegateDeleted): void {
  let delegate = event.params.delegate.toHex()
  store.remove('Delegate', delegate)
}

export function handleNewIdentityOwner(event: NewIdentityOwner): void {
  let upalaId = UpalaID.load(event.params.upalaId.toHex())
  if (!upalaId) {
    upalaId = new UpalaID(event.params.upalaId.toHex())
  }
  let oldOwner = Delegate.load(event.params.oldOwner.toHex())
  if (!oldOwner) {
    oldOwner = new Delegate(event.params.oldOwner.toHex())
  }
  let newOwner = Delegate.load(event.params.newOwner.toHex())
  if (!newOwner) {
    newOwner = new Delegate(event.params.newOwner.toHex())
  }
  oldOwner.isOwner = false
  newOwner.isOwner = true
  upalaId.owner = newOwner.id
  upalaId.save()
  oldOwner.save()
  newOwner.save()
}

export function handleLiquidated(event: Liquidated): void {
  let upalaId = UpalaID.load(event.params.upalaId.toHex())
  if (!upalaId) {
    upalaId = new UpalaID(event.params.upalaId.toHex())
  }
  upalaId.isLiquidated = true
  upalaId.save()
}

/****
POOLS
****/

export function handleNewPoolFactoryStatus(event: NewPoolFactoryStatus): void {
  let poolFactory = PoolFactory.load(event.params.poolFactory.toHex())
  if (!poolFactory) {
    poolFactory = new PoolFactory(event.params.poolFactory.toHex())
  }
  poolFactory.isApproved = event.params.isApproved
  poolFactory.save()
}

export function handleNewPool(event: NewPool): void {
  let pool = Pool.load(event.params.poolAddress.toHex())
  if (!pool) {
    pool = new Pool(event.params.poolAddress.toHex())
  }
  pool.poolFactory = event.params.factory.toHex()
  pool.owner = event.params.poolManager
  pool.baseScore = BigInt.fromI32(0)  // todo see uniswap's zero helper
  pool.balance = BigInt.fromI32(0)  // todo set to 0 todo see uniswap's zero helper
  pool.metadata = ''
  pool.save()
  BundledScoresPool.create(event.params.poolAddress)
}

// checks if pools exist and updates DAI balances accordingly
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

/*************
UPALA SETTINGS
*************/
// Todo Emitted when the pause is lifted by `account`.
// event Paused(address account);
// event Unpaused(address account);

export function handleNewAttackWindow(event: NewAttackWindow): void {
  let upala = Protocol.load('1')
  if (!upala) {
    upala = new Protocol('1')
  }
  upala.attackWindow = event.params.newWindow
  upala.save()
}

export function handleNewExecutionWindow(event: NewExecutionWindow): void {
  let upala = Protocol.load('1')
  if (!upala) {
    upala = new Protocol('1')
  }
  upala.executionWindow = event.params.newWindow
  upala.save()
}

export function handleNewLiquidationFeePercent(
  event: NewLiquidationFeePercent
): void {
  let upala = Protocol.load('1')
  if (!upala) {
    upala = new Protocol('1')
  }
  upala.liquidationFeePercent = event.params.newFee
  upala.save()
}

export function handleNewTreasury(event: NewTreasury): void {
  let upala = Protocol.load('1')
  if (!upala) {
    upala = new Protocol('1')
  }
  upala.treasury = event.params.newTreasury
  upala.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let upala = Protocol.load('1')
  if (!upala) {
    upala = new Protocol('1')
  }
  upala.owner = event.params.newOwner
  upala.save()
}
