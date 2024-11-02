import { useParams } from 'react-router-dom';
import AuthJSON from "../Auth.json";
import Tile from "./Tile";
import ListItem from "./ListItem";
import Footer from "./Footer.js";
import axios from "axios";
import { useState } from "react";

export default function Profile () {

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
		{
			"name": "The Holy Bible KJV Edinburgh (1793)",
			"tokenId": "22",
			"description": "The Old And New Testament Translated Out Of The Original Tongues",
			"website":"https://theneomedium.com",
			"hash":"QmTroTTEVEZKPRXJd1tsyg7w1oUmuxxF6j2tBKk1hfeHry",
			"file":"https://gateway.pinata.cloud/ipfs/QmXXh18hQhLjcAkD1Lkg6M6DbfvhkvL48so1C2h5YaXmgH",
			"address":"0xC66D5AdDb3e8Bdf4575a0d95c08009d7AEfD88B2",
		},
		{
			"name": "Shakespeare",
			"tokenId": "23",
			"description": "Shakespeare",
			"website":"https://theneomedium.com",
			"hash":"na",
			"file":"https://gateway.pinata.cloud/ipfs/QmXXh18hQhLjcAkD1Lkg6M6DbfvhkvL48so1C2h5YaXmgH",
			"address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
		},
	];

	const [data, updateData] = useState(sampleData); //useState([]);
	const [dataFetched, updateFetched] = useState(false);
	const [address, updateAddress] = useState("0x");
	const [totalPrice, updateTotalPrice] = useState("0");

	async function getNFTData(tokenId) {
		const ethers = require("ethers");
		let sumPrice = 0;

		//After adding your Hardhat network to your metamask, this code will get providers and signers
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const addr = await signer.getAddress();
	
		//Pull the deployed contract instance
		let contract = new ethers.Contract(AuthJSON.address, AuthJSON.abi, signer)
	
		//create an NFT Token
		let transaction = await contract.getMyNFTs()
	
		/*
		* Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
		* and creates an object of information that is to be displayed
		*/

		const items = await Promise.all(transaction.map(async i => {
			const tokenURI = await contract.tokenURI(i.tokenId);
			let meta = await axios.get(tokenURI);
			meta = meta.data;
	
			let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
			let item = {
				price,
				tokenId: i.tokenId.toNumber(),
				seller: i.seller,
				owner: i.owner,
				file: meta.image,
				name: meta.name,
				description: meta.description,
				};
			sumPrice += Number(price);
			return item;
		}));
	
		updateData(items);
		updateFetched(true);
		updateAddress(addr);
		updateTotalPrice(sumPrice.toPrecision(3));
	};

	const params = useParams();
	const tokenId = params.tokenId;
	
	function List({ children }) {
	  	return (
		<ul className="divide-y divide-slate-100">
			{children}
		</ul>
	  	)
	};
	
	if(!dataFetched)
		try {
			getNFTData(tokenId);
		}
		catch(e) {
			alert( "Error Retrieving Hash" )
			updateData([]);
		};

return (
<div class="profileClass justify-center bg-gradient-to-t from-white" style={{"max-height":"125vh"}}>
<div class="flex flex-col bg-stone-800/50 ml-5 mb-10 mt-10 mr-5 md:mt-20 md:mb-20 md:ml-24 md:mr-24 items-center justify-center rounded-lg shadow-2xl">
<div class="flex text-center flex-col mt-5 md:text-2xl text-black">
<div class="flex flex-col text-center items-center mt-4 mb-3 border-b border-slate-200">
	<div class="flex flex-col max-w-md mb-5 ">
		<h2 class="text-md">Wallet Address</h2>
			<p class="flow-text break-all text-sm">{address}</p>
	</div>
</div>
</div>
	<div class="flex flex-row text-center justify-center mt-10 md:text-2xl text-black">
		<div>
			<h2 class="font-bold">{address !== "0x" ? "Files":"Demo Files"} </h2>
			{data.length}
		</div>
	</div>
<div class="flex flex-col text-center items-center mt-10 md:text-2xl text-black">
<div class="divide-y-2 divide-black ml-24 mt-5 mb-12">
	<List>
		{data.map((value, index) => (
		<ListItem data={value} key={index}/>
		))}
	</List>
</div>
<div class="mt-10 text-xl">
	{data.length === 0 ? "No data to display. You might not be logged in or you haven't moved any files to your wallet.":""}
</div>
</div>
</div>
<Footer/>
</div>
)
};
