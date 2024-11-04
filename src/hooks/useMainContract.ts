import { useEffect, useState } from "react";
import { SnGDLottery } from "../contracts/MainContract";
import { useTonClient, useTonHttpApi } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract, toNano } from "@ton/core";

export function useMainContract() {
  const client = useTonClient();
  const httpApi = useTonHttpApi();
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
    waitForLastTransaction: async (address: Address) => {
      // if (!httpApi || !client) return false;
      // const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
      // const addressInfo = await httpApi.getAddressInformation(address);
      // const addressInfo2 = mainContract && await httpApi.getAddressInformation(mainContract.address);
      // const { last_transaction_id: { hash, lt} } = addressInfo;
      // let loop = true;
      // const transaction = await client.getTransaction(address, lt, hash);
      // console.log(transaction);

      // while (loop) {
      //   await sleep(10000);
      //   const transaction = await client.getTransaction(address, lt, hash);
      //   if (!transaction) {
      //     loop = false;
      //     break;
      //   };
      //   const { hash: getHash, prevTransactionHash } = transaction;
      //   console.log(getHash().toString('hex'));
      //   console.log(prevTransactionHash);
        // if (addressInfo2) {
        //   const transaction2 = await client.getTransaction(mainContract.address, addressInfo2.last_transaction_id.lt, addressInfo2.last_transaction_id.hash);
        //   console.log(transaction2?.hash().toString('hex'));
        //   console.log(transaction2?.prevTransactionHash);
        // }

      // };
      // while(true) {
      //   await sleep(1500);
      // }
      // let txs = [];
      // while (txs.length == 0) {
      //   await sleep(1200);
      //   const resp = await fetch('https://toncenter.com/api/index/getTransactionByInMessageHash?&include_msg_body=false&msg_hash=' + encodeURIComponent(last_transaction_id.hash));
      //   txs = await resp.json();
      //   console.log(txs);
      // }
    },
  };
}
