import {
    NewProviderStatus
} from "../generated/templates/DappContract/usingUpala"
import { DApp } from "../generated/schema"
import { log } from '@graphprotocol/graph-ts'

export function handleNewProviderStatus(event: NewProviderStatus): void {
    let dappAddress = event.address.toHex()
    let dapp = DApp.load(dappAddress)
    if (dapp) {
        let approvedPools = dapp.approvedPools
        if (!approvedPools) {
            approvedPools = new Array<string>(0)
        }
        if (event.params.isApproved) {
            approvedPools.push(event.params.groupAddress.toHex())
            dapp.approvedPools = approvedPools
        } else {
            let delIndex = approvedPools.indexOf(event.params.groupAddress.toHex())
            if (delIndex >= 0) {
                approvedPools[delIndex] = approvedPools[0]  // dublicate first element
                approvedPools.shift()  // remove first element
                dapp.approvedPools = approvedPools
            }
        }
    dapp.save()
    } else {
        log.error('Cannot load dapp by address: {}', [dappAddress])
    }
  }
