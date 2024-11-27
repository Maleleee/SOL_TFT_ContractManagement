import { useState, useEffect } from "react";
import { ethers } from "ethers";
import tftLegend_abi from "../artifacts/contracts/TeamfightTactics.sol/TeamfightTactics.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [tftLegend, setTftLegend] = useState(undefined);
  const [legends, setLegends] = useState([]);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";  // Change to your contract address
  const tftABI = tftLegend_abi.abi;

  // Connect with MetaMask wallet and get account
  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account && account.length > 0) {
      const validAddress = ethers.utils.isAddress(account[0]);
      if (validAddress) {
        console.log("Account connected: ", account[0]);
        setAccount(account[0]);
      } else {
        console.log("Invalid Ethereum address.");
        setAccount(undefined);
      }
    } else {
      console.log("No account found.");
      setAccount(undefined);
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    try {
      const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
      handleAccount(accounts);

      // Once wallet is set, we can get a reference to our deployed contract
      await getTftLegendContract();
    } catch (error) {
      console.error("Error connecting MetaMask:", error);
      alert("Failed to connect MetaMask.");
    }
  };

  const getTftLegendContract = async () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const legendContract = new ethers.Contract(contractAddress, tftABI, signer);

    setTftLegend(legendContract);
  };

  const getLegends = async () => {
    try {
      if (tftLegend) {
        const userLegends = await tftLegend.getMyLegends();
        console.log("Legends: ", userLegends);
        setLegends(userLegends);
      }
    } catch (error) {
      console.error("Error fetching legends: ", error);
      alert("Error fetching legends: " + error.message);
    }
  };

  const buyLegend = async (legendType, price) => {
    if (!tftLegend) return;

    try {
      // Ensure price is parsed correctly (convert price to Wei)
      const value = ethers.utils.parseEther(price);

      // Check if the account is valid
      if (!account || !ethers.utils.isAddress(account)) {
        console.error("Invalid wallet address.");
        alert("Invalid wallet address.");
        return;
      }

      // Check if the method exists on the contract
      if (!(legendType in tftLegend)) {
        console.error(`Legend type method ${legendType} does not exist on the contract.`);
        alert(`Legend type method ${legendType} does not exist on the contract.`);
        return;
      }

      console.log(`Calling contract method: ${legendType}`);
      console.log("Parameters being passed to contract:", { value });

      // Call the relevant contract method for the chosen legend type
      const tx = await tftLegend[legendType]({
        value: value,  // Pass parsed Ether value (Wei)
      });

      console.log(`Transaction sent: ${tx.hash}`);
      await tx.wait();  // Wait for the transaction to be mined

      console.log("Transaction confirmed.");
      getLegends();  // Fetch updated legends after purchase
    } catch (error) {
      console.error("Transaction error:", error);
      alert("An error occurred while processing the transaction.");
    }
  };

  const initUser = () => {
    // Check if user has MetaMask
    if (!ethWallet) {
      return <p>Please install MetaMask to use this app.</p>;
    }

    // Check if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button onClick={connectAccount}>
          Connect Your MetaMask Wallet
        </button>
      );
    }

    return (
      <div>
        <p>Your Account: {`...${account.toString().slice(-4)}`}</p>
        {account ? (
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button onClick={() => buyLegend("buyCommonLegend", "1")}>
              Buy Common Legend
            </button>
            <button onClick={() => buyLegend("buyUncommonLegend", "2")}>
              Buy Uncommon Legend
            </button>
            <button onClick={() => buyLegend("buyRareLegend", "3")}>
              Buy Rare Legend
            </button>
          </div>
        ) : (
          <p>Please connect your account.</p>
        )}
        <hr />
        <h2>Your Legends</h2>
        <ul>
          {legends.map((legend, index) => (
            <li key={index}>{legend}</li>
          ))}
        </ul>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    getLegends();
  }, [tftLegend]);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the Teamfight Tactics Legend Shop!</h1>
        <p>Collect your favorite Little Legends and Chibis.</p>
      </header>
      {initUser()}
      <style jsx>
        {`
          .container {
            text-align: center;
            font-family: Arial, sans-serif;
          }
          header {
            background-color: #2a3b5f;
            color: white;
            padding: 20px;
            margin-bottom: 20px;
          }
          button {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          button:hover {
            background-color: #0056b3;
          }
          ul {
            list-style: none;
            padding: 0;
          }
          li {
            margin: 5px 0;
            padding: 5px;
            background-color: #f4f4f4;
            border: 1px solid #ddd;
            border-radius: 3px;
          }
        `}
      </style>
    </main>
  );
}
