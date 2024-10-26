import Navbar from "./Navbar";
import Footer from "./Footer.js"; 
import { useLocation, useParams } from 'react-router-dom';
import AuthJSON from "../Auth.json";
import axios from "axios";
import { useState , useLayoutEffect } from "react";

export default function Page (props) {
	
useLayoutEffect(() => {
    window.scrollTo(0, 0)
});
	
const sampleData = [
    {
			"name": "The Brain Activity Map",
			"tokenId": "21",
			"description": "Brain mapping initiative",
			"website":"https://theneomedium.com",
			"hash": "QmRBeX6Ag16omRMsG4bHWAu3C1FT9r19LtgVh3s6Fk6ARJ",
			"file":"https://gateway.pinata.cloud/ipfs/QmXXh18hQhLjcAkD1Lkg6M6DbfvhkvL48so1C2h5YaXmgH",
			"address":"0xC66D5AdDb3e8Bdf4575a0d95c08009d7AEfD88B2",
	},
	];

const [data, updateData] = useState(sampleData);

const [dataFetched, updateDataFetched] = useState(false);
const [message, updateMessage] = useState("");
const [currAddress, updateCurrAddress] = useState("0x");
const [connected, updateConnected] = useState(false);

async function getNFTData(tokenId) {
	const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
	const addr = await signer.getAddress();
	
    //Pull the deployed contract instance
    let contract = new ethers.Contract(AuthJSON.address, AuthJSON.abi, signer)
    //create an NFT Token
    const tokenURI = await contract.tokenURI(tokenId);
    const listedToken = await contract.getListedTokenForId(tokenId);
    let meta = await axios.get(tokenURI);
    meta = meta.data;
    console.log(listedToken);

    let item = {
        price: meta.price,
        tokenId: tokenId,
        seller: listedToken.seller,
        owner: listedToken.owner,
        file: meta.image,
        name: meta.name,
        description: meta.description,
    }
    console.log(item);
    updateDataFetched(true);
	updateData(item);
    console.log("address", addr)
    updateCurrAddress(addr)
	updateConnected(true);

}

async function buyNFT(tokenId) {
    try {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(AuthJSON.address, AuthJSON.abi, signer);
		const salePrice = ethers.utils.parseUnits(data.price, 'ether')
		updateMessage("Buying the NFT... Please Wait (Upto 5 mins)")
        let transaction = await contract.executeSale(tokenId, {value:salePrice});
        await transaction.wait();

        alert('You successfully bought this book!');
		updateMessage("");
    }
    catch(e) {
        alert("Upload Error"+e)
    }
}

    const params = useParams();
    const tokenId = params.tokenId;

    if(dataFetched){
		getNFTData(tokenId);
	}
	
    return(
        <div className="profileClass justify-center bg-gradient-to-t from-white" style={{"max-height":"125vh"}}>
            <div className="flex flex-row flex-wrap ml-2 mt-2 mb-2 mr-2 md:ml-10 md:mt-10 md:mb-10 md:mr-10 justify-center">
			{ currAddress == "0x" ?
				<strong className="text-xl">Connect wallet</strong>:
				<img src={data.data.file} alt="" width="60" height="88" className="flex-none rounded-md bg-slate-100" />
			}
                <div className="text-l mt-10 ml-10 mr-10 mb-10 space-y-8 text-black shadow-2xl rounded-lg border-2 p-5">
                    <div>
                        View your file here: {data.file}
                    </div>
                    <div>
                        Name: {data.name}
                    </div>
                    <div>
                        Description: {data.description}
                    </div>
                    <div>
                        Price: <span className="">{data.price + " ETH"}</span>
                    </div>
                    <div>
                        Location: <span className="text-sm">{data.owner}</span>
                    </div>
                    <div>
                    { currAddress != data.owner && currAddress != data.seller ?
                        <button  class="btn btn-outline-success my-2 my-sm-0" onClick={() => buyNFT(tokenId)}>Buy this</button>
                        : <div className="text-emerald-700">Good Save</div>
                    }
                    
                    <div className="text-green text-center mt-3">{message}</div>
                    </div>
                </div>
            </div>
		<Footer/>
        </div>
    )
}