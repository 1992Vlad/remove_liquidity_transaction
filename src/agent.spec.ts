import {
    createTransactionEvent,
    HandleBlock,
    HandleTransaction
  } from "forta-agent"
  import agent from "./agent"
  
  describe("pool created agent", () => {
    let handleTransaction: HandleTransaction
  
    const createTxEventWithData = () => createTransactionEvent({
      transaction:{
        hash:"0xb48ff57326966812864ddfbf57e9a5540d334d9f6e7c42804b44bd1d37b63199",
        to:"0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F",
        from:"123",
        nonce:1,
        gas:"",
        gasPrice:"",
        value:"",
        data:"0xbaa2abde0000000000000000000000009066e87bac891409d690cfefa41379b34af06391000000000000000000000000e9e7cea3dedca5984780bafc599bd69add087d560000000000000000000000000000000000000000000000086dc2deef416a977000000000000000000000000000000000000000000000000efd92248951ff110a00000000000000000000000000000000000000000000000537e255b6d19de43b000000000000000000000000a8fba6935ec099cb0b82e2c80ff37da357ee274100000000000000000000000000000000000000000000000000000000604767d0",
        r:"",
        s:"",
        v:""

        
      },
      type:undefined,
      network:undefined,
      receipt: {
        status:true,
        root:"",
        gasUsed:"",
        cumulativeGasUsed:"",
        logsBloom:"",
        logs:{} as any,
        contractAddress:"0x5d2BF248A2a31Da2bdC8FD0b0B6c3ceE71f7175A",
        blockHash:"",
        blockNumber:1,
        transactionHash:"",
        transactionIndex:1

      },
      block:{}as any


    })
  
    beforeAll(() => {
      handleTransaction = agent.handleTransaction
    })
  
    describe("token event", () => {
      it("findings length == 1", async () => {
        const txEvent = createTxEventWithData()
  
        const findings = await handleTransaction(txEvent)
  
        expect(findings.length).toBe(1)
      })
  
    })
  })