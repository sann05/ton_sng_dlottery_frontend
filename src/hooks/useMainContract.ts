import { useEffect, useState } from "react";
import { SnGDLottery } from "../contracts/MainContract";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract, toNano } from "@ton/core";

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
    getLastTransaction: async (address: string) => {
      if (!mainContract) return false;
      // client?.getTransactions(mainContract.address, {limit: 5}).then(console.log);
      // console.log(mainContract?.address.toString());
      // const httpApi = new HttpApi('https://ton.access.orbs.network/55013c0ff5Bd3F8B62C092Ab4D238bEE463E5501/1/testnet/toncenter-api-v2/jsonRPC');
      // const addressInfo = await httpApi.getAddressInformation(mainContract.address)
      // const transactions = await client?.getTransactions(mainContract.address, {limit: 5});
      // const lastTransaction = transactions?.[0];
      console.log(mainContract?.address.toString());
      console.log(address);
    }
  };
}
