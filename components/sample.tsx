"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useWillContract } from "@/hooks/useContract"
import { isAddress } from "viem"

const SampleIntregation = () => {
  const { isConnected, address } = useAccount()
  const [recipientAddress, setRecipientAddress] = useState("")
  const [depositAmount, setDepositAmount] = useState("")
  const [claimOwner, setClaimOwner] = useState("")
  const [claimIndex, setClaimIndex] = useState("")

  const { data, actions, state } = useWillContract()

  const handleCreateWill = async () => {
    if (!recipientAddress || !depositAmount || !isAddress(recipientAddress)) return
    try {
      await actions.createWill(recipientAddress, depositAmount)
      setRecipientAddress("")
      setDepositAmount("")
    } catch (err) {
      console.error("Error:", err)
    }
  }

  const handleClaim = async () => {
    try {
      const owner = claimOwner || address || ""
      if (!owner || !isAddress(owner)) return
      const index = Number(claimIndex || 0)
      await actions.claimWill(owner, index)
    } catch (err) {
      console.error("Error:", err)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Digital Will Vault</h2>
          <p className="text-muted-foreground">Please connect your wallet to access the decentralized inheritance system.</p>
        </div>
      </div>
    )
  }

  const isRecipientValid = recipientAddress && isAddress(recipientAddress)
  const canDeposit = isRecipientValid && depositAmount
  const canClaim = (claimOwner ? isAddress(claimOwner) : true) && (claimIndex === "" || Number(claimIndex) >= 0)

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Digital Will Contract</h1>
          <p className="text-muted-foreground text-sm mt-1">Secure your legacy on the Flare Network</p>
        </div>

        {/* Contract Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">Total Contract Liquidity</p>
            <p className="text-2xl font-semibold text-foreground">{data.contractBalance} FLR</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">My Active Wills</p>
            <p className="text-2xl font-semibold text-foreground">{data.myWillsCount}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-6">
          {/* Create Will Section */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Create New Will</h3>
            
            {/* Step 1: Set Recipient */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-1">Beneficiary Address</label>
              <input
                type="text"
                placeholder="0x..."
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              {recipientAddress && !isAddress(recipientAddress) && (
                <p className="text-xs text-destructive mt-1">Invalid EVM address</p>
              )}
            </div>

            {/* Step 2: Deposit */}
            <div className={`mb-4 ${isRecipientValid ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
              <label className="block text-sm font-medium text-foreground mb-1">Inheritance Amount (FLR)</label>
              <input
                type="number"
                placeholder="0.00"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                disabled={!isRecipientValid}
                step="0.01"
                min="0"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <button
              onClick={handleCreateWill}
              disabled={state.isLoading || state.isPending || !canDeposit}
              className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {state.isLoading || state.isPending ? "Processing..." : "Create Will"}
            </button>
          </div>

          {/* Claim Section */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Claim Inheritance</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you are a designated beneficiary, enter the details below to claim funds.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Testator Address (Owner)</label>
                <input
                  type="text"
                  placeholder="0x... (Leave empty if self)"
                  value={claimOwner}
                  onChange={(e) => setClaimOwner(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Will Index ID</label>
                <input
                  type="number"
                  placeholder="0"
                  value={claimIndex}
                  onChange={(e) => setClaimIndex(e.target.value)}
                  min="0"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <button
              onClick={handleClaim}
              disabled={state.isLoading || state.isPending || !canClaim}
              className="w-full px-6 py-2 bg-zinc-800 text-white rounded-lg font-medium hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {state.isLoading || state.isPending ? "Claiming..." : "Execute Claim"}
            </button>
          </div>
        </div>

        {/* Transaction Status */}
        {state.hash && (
          <div className="mt-6 p-4 bg-blue-50/10 border border-blue-200/20 rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Transaction Status</p>
            <p className="text-sm font-mono text-foreground break-all mb-3">{state.hash}</p>
            {state.isConfirming && <p className="text-sm text-yellow-500 flex items-center gap-2">Waiting for confirmation...</p>}
            {state.isConfirmed && <p className="text-sm text-green-500 font-medium">Transaction confirmed successfully!</p>}
          </div>
        )}

        {state.error && (
          <div className="mt-6 p-4 bg-red-50/10 border border-red-200/20 rounded-lg">
            <p className="text-sm text-red-500">Error: {state.error.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SampleIntregation