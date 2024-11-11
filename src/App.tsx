import "./App.css";
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import WebApp from "@twa-dev/sdk";
import { useTonAddress } from "@tonconnect/ui-react";
import { ParticipantsTable } from "./components/Table/Table";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { Address } from "@ton/core";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const compareIds = (id: string, id2: string) => {
  return id.substring(3, id.length - 3) === id2.substring(3, id2.length - 3);
};

function isTonConnectSdkError(error: Error | string) {
  const tonConnectError = "TON_CONNECT_SDK";
  if (typeof error === "string") {
    return error.includes(tonConnectError);
  }

  return error.message?.includes(tonConnectError);
}

function App() {
  const {
    participantsCount,
    participants,
    sendAddParticipant,
    sendWithdraw,
    waitForLastTransaction,
  } = useMainContract();

  const [meInParticipants, setMeInParticipants] = useState(false);
  const [participateLoading, setParticipateLoading] = useState(false);

  const { connected } = useTonConnect();
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();

  const checkWithdraw = () =>
    userFriendlyAddress === import.meta.env.VITE_CURRENT_ADDRESS;

  useEffect(() => {
    if (!participants) return;
    const me = participants.find((p) =>
      compareIds(p.toString(), userFriendlyAddress)
    );
    setMeInParticipants(!!me);
  }, [participants]);

  useEffect(() => {
    window.addEventListener(
      "unhandledrejection",
      function handler(rejection: any) {
        if (isTonConnectSdkError(rejection.reason)) {
          participateLoading && setParticipateLoading(false);
        }
      }
    );
  }, [participateLoading]);

  const participate = async () => {
    setParticipateLoading(true);
    await sendAddParticipant();

    // const fullAddress = Address.parse(userFriendlyAddress);
    // waitForLastTransaction(fullAddress).then(console.log);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        <div className="table-wrapper">
          {participants && participantsCount && (
            <ParticipantsTable
              participants={participants}
              participantsCount={participantsCount}
            />
          )}
        </div>

        <div className="connect-button__container">
          <TonConnectButton />
        </div>
        <b>You are logged as: </b>
        <div className="Hint">{userFriendlyAddress?.slice(0, 30) + "..."}</div>

        <div className="Card">
          <div>
            <b>Your platform is {WebApp.platform}</b>
          </div>
          <b>Participants Number</b>
          <div className="Hint">
            {participantsCount ? participantsCount.toString() : "0"} out of 10
          </div>
        </div>
        <div>
          {
            // if connected, show button to send increment
            connected && (
              // (meInParticipants ? (
              //   <div>You are participant</div>
              // ) : (
              <button
                className="participate"
                disabled={participateLoading}
                onClick={participate}
              >
                {participateLoading ? "Loading" : "Participate!"}
              </button>
            )
            // ))
          }
          <a href="https://t.me/$BIhXUe5GkEkdCQAAuDsdBY_GBWs">
            <button className="participate">Pay with Stars</button>
          </a>
        </div>
        <div>
          {checkWithdraw() && (
            <button onClick={() => sendWithdraw()}>Withdraw Fees</button>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
