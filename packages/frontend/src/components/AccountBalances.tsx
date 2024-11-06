'use client'

import { truncateAddress } from "@/lib/utils"
import { Card } from "./ui/card"
import { ChainBalanceMap, useIndexerStore } from "@/indexer/indexer"
import { formatUnits } from "viem"
import { EMPTY_ADDRESS } from "@/lib/constants"

const getAllAddresses = (data: ChainBalanceMap): string[] => {
  const addressesSet = new Set<string>();

  for (const key in data) {
    const nestedObject = data[key]
    for (const address in nestedObject) {
      if (address !== EMPTY_ADDRESS) {
        addressesSet.add(address)
      }
    }
  }

  return Array.from(addressesSet)
}

export const AccountBalances = () => {
  const balances = useIndexerStore((state) => state.balances.perChain)
  const addresses = getAllAddresses(balances)
  const chains = Object.keys(balances)

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">All Balances</h2>
      </div>

      <div className={`grid grid-cols-3 gap-4 p-4`}>
        <div className="bg-gray-200 pt-2 pb-2 pl-4 rounded">Address</div>
        {chains.map((item, index) => (
          <div key={index} className="bg-gray-200 pt-2 pb-2 pr-4 rounded text-right">Chain {item}</div>
        ))}
        {addresses.map((address: string) => (
          <>
            <div className="truncate">{address}</div>
            {chains.map((chainId: string) =>
              <div className="text-right">
                {
                  balances[Number(chainId)][address]
                  ? formatUnits(balances[Number(chainId)][address], 18)
                  : '0'
                }
                {' TSU'}
              </div>
            )}
          </>
        ))}
      </div>
    </Card>
  )
}
