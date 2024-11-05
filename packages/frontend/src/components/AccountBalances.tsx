'use client'

import { truncateAddress } from "@/lib/utils"
import { Card } from "./ui/card"
// import { chains } from "@/config"
import { useIndexerStore } from "@/indexer/indexer"
import { EMPTY_ADDRESS } from "@/lib/constants"
import { formatUnits } from "viem"

export const AccountBalances = () => {
  const balances = useIndexerStore((state) => state.balances.perChain)
  const addresses = Object.keys(balances[901]).filter(address => address !== EMPTY_ADDRESS)
  const chains = Object.keys(balances)

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">All Balances</h2>
      </div>
      {addresses.map((address: string) => (
        <div className="flex justify-between">
          <div className="flex">{truncateAddress(address)}</div>
          {chains.map((chainId: string) =>
            <div>
              {balances[Number(chainId)][address]
              ? formatUnits(balances[Number(chainId)][address], 18)
              : '0'}
              TSU
            </div>
          )}
        </div>
      ))}
    </Card>
  )
}
