import { useEffect, useState } from "react";
import { SnGDLottery } from "../contracts/MainContract";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useAsyncInitialize } from "./useAsyncInitialize";
import {
  Address,
  beginCell,
  OpenedContract,
  storeMessage,
  toNano,
} from "@ton/core";

export function useMainContract() {
  const client = useTonClient();
  const { sender } = useTonConnect();

  const sleep = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

  const [contractData, setContractData] = useState<null | {
    participantsCount: number;
    participants: Address[];
  }>();

  const mainContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = SnGDLottery.fromAddress(
      Address.parse(import.meta.env.VITE_CONTRACT_ADDRESS!)
    );
    return client.open(contract) as OpenedContract<SnGDLottery>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!mainContract) return;
      // setContractData(null);
      const participantsCount = await mainContract.getParticipantsCount();
      const participants = (await mainContract.getParticipants()).values();
      setContractData({
        participantsCount: Number(participantsCount),
        participants: participants,
      });
      await sleep(10000); // 10 seconds and poll value again
      getValue();
    }
    getValue();
  }, [mainContract]);

  return {
    contractAddress: mainContract?.address.toString(),
    ...contractData,
    sendAddParticipant: async () => {
      return await mainContract?.send(
        sender,
        {
          value: toNano("1.1"),
        },
        {
          $$type: "AddParticipantMessage",
          queryId: 0n,
        }
      );
    },
    sendWithdraw: async () => {
      return await mainContract?.send(
        sender,
        {
          value: toNano("0.1"),
        },
        {
          $$type: "WithdrawFeesMessage",
          queryId: 0n,
        }
      );
    },
    waitForTransaction: async (address: string, hash: string) => {
      if (!client) return;
      return new Promise((resolve) => {
        let refetches = 0;
        const walletAddress = Address.parse(address);
        const interval = setInterval(async () => {
          refetches += 1;
          const state = await client.getContractState(walletAddress);
          if (!state || !state.lastTransaction) {
            clearInterval(interval);
            resolve(null);
            return;
          }

          const { lt: lastLt, hash: lastHash } = state.lastTransaction;
          const lastTx = await client.getTransaction(
            walletAddress,
            lastLt,
            lastHash
          );

          if (lastTx && lastTx.inMessage) {
            const msgCell = beginCell()
              .store(storeMessage(lastTx.inMessage))
              .endCell();
            const inMsgHash = msgCell.hash().toString("base64");

            if (inMsgHash === hash) {
              clearInterval(interval);
              resolve(lastTx);
            }
          }

          if (refetches >= 20) {
            clearInterval(interval);
            resolve(null);
          }
        }, 1500);
      });
    },
  };
}
