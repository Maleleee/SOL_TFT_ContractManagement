import { useState, useEffect } from "react";
import { ethers } from "ethers";
import tftLegend_abi from "../artifacts/contracts/TeamfightTactics.sol/TeamfightTactics.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [tftLegend, setTftLegend] = useState(undefined);
  const [legends, setLegends] = useState([]);
  const [tftPoints, setTftPoints] = useState(0);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";  // Change to your contract address
  const tftABI = tftLegend_abi.abi;

  // Connect with MetaMask wallet and get account
  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      const validAddress = ethers.utils.isAddress(accounts[0]);
      if (validAddress) {
        console.log("Account connected: ", accounts[0]);
        setAccount(accounts[0]);
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

  const getTFTPoints = async () => {
    try {
      if (tftLegend) {
        const points = await tftLegend.getTFTPoints();
        console.log("TFT Points: ", points);
        setTftPoints(points.toString());
      }
    } catch (error) {
      console.error("Error fetching TFT points: ", error);
      alert("Error fetching TFT points: " + error.message);
    }
  };

  const buyLegend = async (legendType, pointsRequired) => {
    if (!tftLegend) return;

    try {
      // Check if the user has enough TFT points
      if (tftPoints < pointsRequired) {
        alert("Not enough TFT points. Please buy more TFT points.");
        return;
      }

      // Call the relevant contract method for the chosen legend type
      const tx = await tftLegend[legendType]();

      console.log(`Transaction sent: ${tx.hash}`);
      await tx.wait();  // Wait for the transaction to be mined

      console.log("Transaction confirmed.");
      getLegends();  // Fetch updated legends after purchase
      getTFTPoints();  // Fetch updated TFT points after purchase
    } catch (error) {
      console.error("Transaction error:", error);
      alert("An error occurred while processing the transaction.");
    }
  };

  const buyTFTPoints = async (amount) => {
    if (!tftLegend) return;

    try {
      const value = ethers.utils.parseEther(amount);

      const tx = await tftLegend.buyTFTPoints({
        value: value,
      });

      console.log(`Transaction sent: ${tx.hash}`);
      await tx.wait();

      console.log("Transaction confirmed.");
      getTFTPoints();  // Fetch updated TFT points after purchase
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
        <button onClick={connectAccount} style={buttonStyle}>
          Connect Your MetaMask Wallet
        </button>
      );
    }

    return (
      <div style={containerStyle}>
        <p>Your Account: {`...${account.toString().slice(-4)}`}</p>
        <h3>Your TFT Points: {tftPoints}</h3>
        <h3>Buy TFT Points</h3>
        <div style={buttonGroupStyle}>
          <button onClick={() => buyTFTPoints("1")} style={buttonStyle}>Buy 1 TFT Point (1 ETH)</button>
          <button onClick={() => buyTFTPoints("5")} style={buttonStyle}>Buy 5 TFT Points (5 ETH)</button>
          <button onClick={() => buyTFTPoints("10")} style={buttonStyle}>Buy 10 TFT Points (10 ETH)</button>
        </div>
        <div style={buttonGroupStyle}>
          <button className="common" onClick={() => buyLegend("buyCommonLegend", 1)} style={{ ...buttonStyle, ...commonButtonStyle }}>
            Buy Common Legend (1 TFT Point)
          </button>
          <button className="uncommon" onClick={() => buyLegend("buyUncommonLegend", 2)} style={{ ...buttonStyle, ...uncommonButtonStyle }}>
            Buy Uncommon Legend (2 TFT Points)
          </button>
          <button className="rare" onClick={() => buyLegend("buyRareLegend", 3)} style={{ ...buttonStyle, ...rareButtonStyle }}>
            Buy Rare Legend (3 TFT Points)
          </button>
          <button className="epic" onClick={() => buyLegend("buyEpicLegend", 5)} style={{ ...buttonStyle, ...epicButtonStyle }}>
            Buy Epic Legend (5 TFT Points)
          </button>
          <button className="legendary" onClick={() => buyLegend("buyLegendaryLegend", 10)} style={{ ...buttonStyle, ...legendaryButtonStyle }}>
            Buy Legendary Legend (10 TFT Points)
          </button>
          <button className="mythic" onClick={() => buyLegend("buyMythicLegend", 20)} style={{ ...buttonStyle, ...mythicButtonStyle }}>
            Buy Mythic Legend (20 TFT Points)
          </button>
        </div>
        <hr />
        <h2>Your Legends</h2>
        <ul style={listStyle}>
          {legends.map((legend, index) => (
            <li key={index} style={listItemStyle}>{legend}</li>
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
    getTFTPoints();
  }, [tftLegend]);

  return (
    <main className="container" style={mainStyle}>
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
            transition: background-color 0.3s, transform 0.3s;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          button:hover {
            transform: translateY(-2px);
          }
          button.common {
            background: linear-gradient(45deg, #007bff, #0056b3);
          }
          button.uncommon {
            background: linear-gradient(45deg, #28a745, #218838);
          }
          button.rare {
            background: linear-gradient(45deg, #ffc107, #e0a800);
          }
          button.epic {
            background: linear-gradient(45deg, #6f42c1, #5a32a3);
          }
          button.legendary {
            background: linear-gradient(45deg, #fd7e14, #e06b0a);
          }
          button.mythic {
            background: linear-gradient(45deg, #dc3545, #b02a37);
          }
          ul {
            list-style: none;
            padding: 0;
          }
          li {
            margin: 5px 0;
            padding: 10px;
            background-color: #f4f4f4;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
        `}
      </style>
    </main>
  );
}

// Styles
const mainStyle = {
  padding: '20px',
  backgroundColor: '#f9f9f9',
};

const containerStyle = {
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  margin: '20px auto',
  maxWidth: '600px',
};

const buttonStyle = {
  padding: '10px 15px',
  margin: '5px',
  border: 'none',
  borderRadius: '5px',
  color: '#fff',
  cursor: 'pointer',
  transition: 'background-color 0.3s, transform 0.3s',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const commonButtonStyle = {
  background: 'linear-gradient(45deg, #007bff, #0056b3)',
};

const uncommonButtonStyle = {
  background: 'linear-gradient(45deg, #28a745, #218838)',
};

const rareButtonStyle = {
  background: 'linear-gradient(45deg, #ffc107, #e0a800)',
};

const epicButtonStyle = {
  background: 'linear-gradient(45deg, #6f42c1, #5a32a3)',
};

const legendaryButtonStyle = {
  background: 'linear-gradient(45deg, #fd7e14, #e06b0a)',
};

const mythicButtonStyle = {
  background: 'linear-gradient(45deg, #dc3545, #b02a37)',
};

const buttonGroupStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '10px',
};

const listStyle = {
  listStyleType: 'none',
  padding: '0',
};

const listItemStyle = {
  margin: '5px 0',
  padding: '10px',
  backgroundColor: '#f4f4f4',
  border: '1px solid #ddd',
  borderRadius: '5px',
};