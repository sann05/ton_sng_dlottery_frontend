import { useAsyncInitialize } from "./useAsyncInitialize";
import { HttpApi, TonClient } from "@ton/ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";

export function useTonClient() {
  return useAsyncInitialize(
    async () =>
      new TonClient({
        endpoint: await getHttpEndpoint({
          network: "testnet", // TODO: use env
        }),
      })
  );
}

export function useTonHttpApi() {
  return useAsyncInitialize(
    async () =>
      new HttpApi(
        await getHttpEndpoint({
          network: "testnet", // TODO: use env
        })
      )
  );
}
