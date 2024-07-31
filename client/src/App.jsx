import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./contract/Chai.json";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import chai from "./assets/chai.png";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x76CfFE519Aebfa0Aed2dd676c4aeeD724Bbd03d0";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          }); // Request user to connect wallet

          // Additional event listeners
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });


          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install MetaMask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  console.log(state);

  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
      <img src={chai} className="img-fluid" alt=".." width="100%" />
      <p
        className="text-muted lead "
        style={{ marginTop: "10px", marginLeft: "5px" }}
      >
        <small>Connected Account - {account}</small>
      </p>
      <div className="container">
        <Buy state={state} />
        <Memos state={state} />
      </div>
    </div>
  );
}

export default App;
