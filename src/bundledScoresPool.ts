import {
    NewScoreBundleId, 
    MetaDataUpdate,
    ScoreBundleIdDeleted,
    NewBaseScore,
    OwnershipTransferred
} from "../generated/templates/BundledScoresPool/BundledScoresPool"
import { Pool, ScoreBundle } from "../generated/schema"
import { dataSource, log } from '@graphprotocol/graph-ts'

export function handleMetaDataUpdate(event: MetaDataUpdate): void {
    let poolAddress = event.address.toHex()
    let pool = Pool.load(poolAddress)
    if (pool != null) {
        pool.metadata = event.params.metadata
        pool.save()
    } else {
        log.error('Cannot load pool by address: {}', [poolAddress])
    }
}

export function handleNewScoreBundleId(event: NewScoreBundleId): void {
    let scoreBundle = new ScoreBundle(event.params.newScoreBundleId.toHex())
    scoreBundle.timestamp = event.params.timestamp
    scoreBundle.isDeleted = false
    scoreBundle.pool = event.address.toHex()
    scoreBundle.save()
}

export function handleScoreBundleIdDeleted(event: ScoreBundleIdDeleted): void {
    let scoreBundleId = event.params.scoreBundleId.toHex()
    let scoreBundle = ScoreBundle.load(scoreBundleId)
    if (scoreBundle != null) {
        scoreBundle.isDeleted = true
        scoreBundle.save()
    } else {
        log.error('Cannot load score bundle Id: {}', [scoreBundleId])
    }
}

export function handleNewBaseScore(event: NewBaseScore): void {
    let poolAddress = event.address.toHex()
    let pool = Pool.load(poolAddress)
    if (!pool) {
        pool = new Pool(poolAddress)
    }
    if (pool != null) {
        pool.baseScore = event.params.newBaseScore
        pool.save()
    } else {
        log.error('Cannot load pool by address: {}', [poolAddress])
    }
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
    let poolAddress = event.address.toHex()
    let pool = Pool.load(poolAddress)
    // first OwnershipTransferred event is called before pool template 
    // is registered. Checking if owner already exists
    if (pool != null && (pool.owner != event.params.newOwner)) {
        pool.owner = event.params.newOwner
        pool.save()
    } else {
        log.error('Cannot load pool by address: {}', [poolAddress])
    }
}

// dataSource.address() - get the address of this contract 