import { BigInt } from "@graphprotocol/graph-ts"
import {
  Upala,
  Exploded,
  NewAttackWindow,
  NewDAppStatus,
  NewDelegateStatus,
  NewExecutionWindow,
  NewExplosionFeePercent,
  NewIdentity,
  NewIdentityOwner,
  NewPool,
  NewPoolFactoryStatus,
  NewTreasury,
  OwnershipTransferred
} from "../generated/Upala/Upala"
import { ExampleEntity, Pool, UpalaID, Delegate } from "../generated/schema"
import { BundledScoresPool } from '../generated/templates'

export function handleExploded(event: Exploded): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.upalaId = event.params.upalaId

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.approvedPoolFactories(...)
  // - contract.attackWindow(...)
  // - contract.executionWindow(...)
  // - contract.explode(...)
  // - contract.explosionFeePercent(...)
  // - contract.isOwnerOrDelegate(...)
  // - contract.myId(...)
  // - contract.myIdOwner(...)
  // - contract.newIdentity(...)
  // - contract.owner(...)
  // - contract.poolParent(...)
  // - contract.registerPool(...)
  // - contract.registeredDapps(...)
  // - contract.treasury(...)
}

export function handleNewAttackWindow(event: NewAttackWindow): void {}

export function handleNewDAppStatus(event: NewDAppStatus): void {}

export function handleNewDelegateStatus(event: NewDelegateStatus): void {}

export function handleNewExecutionWindow(event: NewExecutionWindow): void {}

export function handleNewExplosionFeePercent(
  event: NewExplosionFeePercent
): void {}

export function handleNewIdentity(event: NewIdentity): void {
  let upalaId = new UpalaID(event.params.upalaId.toHex())
  let delegate = new Delegate(event.params.owner.toHex())
  delegate.isOwner = true
  delegate.upalaID = upalaId.id
  upalaId.save()
  delegate.save()
}

export function handleNewIdentityOwner(event: NewIdentityOwner): void {}

export function handleNewPool(event: NewPool): void {
  let pool = new Pool(event.params.poolAddress.toHex())
  // let pool = new Pool(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  // pool.poolAddress = event.params.poolAddress
  pool.poolFactoryAddress = event.params.factory
  pool.owner = event.params.poolManager
  pool.baseScore = BigInt.fromI32(0)  // todo see uniswap zero helper
  pool.balance = BigInt.fromI32(0)  // todo see uniswap zero helper
  pool.metadata = ''
  pool.isApproved = true
  pool.save()
  BundledScoresPool.create(event.params.poolAddress)
}

export function handleNewPoolFactoryStatus(event: NewPoolFactoryStatus): void {}

export function handleNewTreasury(event: NewTreasury): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
