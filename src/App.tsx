import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import WebApp from '@twa-dev/sdk'

function App() {
  const {
    participantsCount,
    participants,
    contractAddress,
    sendAddParticipant,
    sendWithdraw,
  } = useMainContract();

  const { connected } = useTonConnect();
  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <b>Our contract address</b>
      <div className="Hint">{contractAddress?.slice(0, 30) + "..."}</div>


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
