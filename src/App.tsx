import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import WebApp from '@twa-dev/sdk'
import { useTonAddress } from "@tonconnect/ui-react";

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
  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <b>You are logged as: </b>
      <div className="Hint">{userFriendlyAddress?.slice(0, 30) + "..."}</div>

      <div className="Card">
        <div><b>Your platform is {WebApp.platform}</b></div>
        <b>Participants Number</b>
        <div className="Hint">{participantsCount ? (participantsCount.toString()) : "0"} out of 10</div>
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
        {
          connected && (
            <button onClick={() => sendWithdraw()}>Withdraw Fees</button>
          )
        }
      </div>
    </div>
  );
}

export default App;
