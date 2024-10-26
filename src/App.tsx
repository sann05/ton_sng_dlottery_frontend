import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import WebApp from "@twa-dev/sdk";
import { useTonAddress } from "@tonconnect/ui-react";
import { ParticipantsTable } from "./components/Table/Table";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const {
    participantsCount,
    participants,
    contractAddress,
    sendAddParticipant,
    sendWithdraw,
  } = useMainContract();

  const { connected } = useTonConnect();
  const userFriendlyAddress = useTonAddress();

  const checkWithdraw = () =>
    userFriendlyAddress === import.meta.env.VITE_CURRENT_ADDRESS;

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
              <button onClick={() => sendAddParticipant()}>Participate!</button>
            )
          }
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
