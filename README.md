# Upala subgraph

## Clients

#### Requests from DB ([repo](https://github.com/upala-digital-identity/db))

When writing data:
- Get pool manager for the pool address
- Get scoreBundle timestamp by hash

When reading data (housekeeping):
- Get array of deleted roots since [latestDeletedRootTimestamp]
- Get array of base score updates since [latestBaseScoreUpdateTimestamp]

#### Requests from group manager ([repo](https://github.com/upala-digital-identity/group-manager))
- When updating scores "is this bundleHash deleted"
- When updating base score "what is the current base score for the pool address"
- TBD Commitments

#### Requests from multipassport ([repo](https://github.com/upala-digital-identity/multipassport))
When populating multipassport:
- Get UpalaID for the provided address (search owners and delegates of the ID)
- Get owner and delegates for the Upala ID"
- Get pool metadata by address
- Get poolType (poolFactoryAddress) by pool address
- Get pool balance by pool address todo
- Get pool base score by pool address todo 

#### Requests from unique-human-lib ([repo](https://github.com/upala-digital-identity/unique-human-lib))
- Get approved pools for the dapp address
- Get delegates by Upala ID
- Get poolType (poolFactoryAddress) by pool address
- Get pool balance by pool address todo
- Get pool base score by pool address todo 

#### Housekeeping
Data needed for the subgraph itself.

All spawned pools are registered in Upala.sol with an emitted event in order to create Data source templates for the subgraph.
Same for DApps
Same for poolFactories

## Monitored contracts
- [Upala](https://github.com/upala-digital-identity/upala/blob/master/contracts/protocol/upala.sol)
- [Pool and pool factory](https://github.com/upala-digital-identity/upala/blob/master/contracts/pools/signed-scores-pool.sol)
- [DApp lib and example DApp](https://github.com/upala-digital-identity/upala/blob/master/contracts/dapps/dapp.sol)
- DAI