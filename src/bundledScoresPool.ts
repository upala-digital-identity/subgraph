import {
    NewScoreBundleId, 
    MetaDataUpdate,
    ScoreBundleIdDeleted,
    NewBaseScore
} from "../generated/templates/BundledScoresPool/BundledScoresPool"
import { ScoreBundle } from "../generated/schema"

export function handleMetaDataUpdate(event: MetaDataUpdate): void {}

export function handleNewScoreBundleId(event: NewScoreBundleId): void {
    let scoreBundle = new ScoreBundle(event.params.newScoreBundleId.toHex())
    scoreBundle.timestamp = event.params.timestamp
    scoreBundle.isDeleted = false
    scoreBundle.pool = event.address.toHex()
    scoreBundle.save()
}

export function handleScoreBundleIdDeleted(event: ScoreBundleIdDeleted): void {}

export function handleNewBaseScore(event: NewBaseScore): void {}

// todo handle ownership transfer