import { 
  TransactionEvent, 
  Finding, 
  HandleTransaction, 
  FindingSeverity, 
  FindingType,
  createTransactionEvent,
  getJsonRpcUrl

} from 'forta-agent'
import Web3 from 'web3';
import {
  PANCAKESWAP_ROUTER_ABI,
  PANCAKESWAP_ROUTER_ADDRESS

} from "./consts"
import iTxInput from './iTXInput';
const abi  = require("erc-20-abi")

const abiDecoder = require('abi-decoder');
abiDecoder.addABI(PANCAKESWAP_ROUTER_ABI)
const web3 = new Web3(getJsonRpcUrl())
const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = [];
  if (txEvent.transaction.to === PANCAKESWAP_ROUTER_ADDRESS){
    const decodedSig:iTxInput = abiDecoder.decodeMethod(txEvent.transaction.data);
    if (decodedSig.name ==="removeLiquidity"){
      let tokenA =""
      let tokenB="" 
      let volume=""
      for (const param of decodedSig.params ){
        switch (param.name){
          case "tokenA":
            tokenA = param.value
            break
          case "tokenB":
            tokenB = param.value
            break
          case "liquidity":
            volume = param.value
            break

        }
      }
      findings.push(
        Finding.fromObject({
          name: "Liquidity_REMOVED",
          description: `Removed Liquidity`,
          alertId: "FORTA-700",
          severity: FindingSeverity.High,
          type: FindingType.Suspicious,
          metadata:{
            volume:volume,
            tokenA:tokenA,
            tokenB:tokenB
          }
  
        })
       )

    }
  }    
    

  return findings;
}

export default {
  handleTransaction
}