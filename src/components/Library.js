import Footer from "./Footer.js"; 
import AuthJSON from "../Auth.json";
import axios from "axios";
import React, { useEffect, useState } from 'react';

export default function Authentication() {
const sampleData = [
	{
		"name": "The Brain Activity Map",
		"tokenId": "21",
		"description": "Brain mapping initiative",
		"website":"https://theneomedium.com",
		"hash": "QmRBeX6Ag16omRMsG4bHWAu3C1FT9r19LtgVh3s6Fk6ARJ",
		"file":"https://gateway.pinata.cloud/ipfs/QmRBeX6Ag16omRMsG4bHWAu3C1FT9r19LtgVh3s6Fk6ARJ",
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
		"website":"http://axieinfinity.io",
		"hash":"na",
		"file":"https://indigo-bitter-stork-403.mypinata.cloud/ipfs/QmYkYCCScddypng8J9s5gqZRgonLuUvS7nmbhZM4Dj7ai5",
		"address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
	},
	{
		"name": "The Bible",
		"tokenId": "24",
		"description": "King James Version",
		"website":"http://axieinfinity.io",
		"hash":"na",
		"file":"https://indigo-bitter-stork-403.mypinata.cloud/ipfs/QmSNcY6sLqyLLRSYuP61XgPhK5JL5VoiXJM7LSQxbXFUrt",
		"address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
	},
	{
		"name": "Isaac's Favorite",
		"tokenId": "25",
		"description": "This is a good one!",
		"website":"http://axieinfinity.io",
		"hash":"d273685b95de9eb7ce5244c2d9beb8c6",
		"file":"https://indigo-bitter-stork-403.mypinata.cloud/ipfs/QmQ69AjrbxvGhWpgQPB9WJYmQdosb7vdjwJdXNgm5eD23Q",
		"address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
	},
];
	
const [data, updateData] = useState(sampleData);
const [dataFetched, updateFetched] = useState(false);
const [isOpen, setIsOpen] = useState(true);
const [file, setFile] = useState();
const [res, setRes] = useState([]);

function toggleModal() {
	setIsOpen(!isOpen);
};

function List({ children }) {
	return (
	<ul className="slate-100">
		{children}
	</ul>
  )
};
	
return (
<div class="px-2 py-2" >
	<div class="px-2 py-2">
		<div class="px-2 py-2">
			 
			 <p className="flow-text text-md ml-10 mr-10 mb-10 break-word">
			 The goal of this site is to give you access to information that is tamper-resistant and decentralized.  It uses IPFS and Ethereum and aligns with Ethereum's core innovation:
			 </p>
			 <p>
			 <i>"The core innovation is that you can do all this without trusting a central authority that could change the rules or restrict your access."</i>
			 </p>
			 <p>
			 You can save and access books, articles, or really any information on <a target="_blank" rel="noopener noreferrer" href = "https://ipfs.tech/">IPFS< / a> through this site.
			 </p>
			 <p className="flow-text text-md ml-10 mr-10 mb-10 break-word">
			 A file or message is created and stored on IPFS. The IPFS unique hash (CID) of the file is stored on the Ethereum blockchain and linked to the IPFS CID.  When a user connects their wallet to the neo medium, the Ethereum contract will validate the CID to verify the authenticity of the file you are viewing. In this way, the original file is stored on a distributed compute system and its authenticity is saved on the immutable <a target="_blank" rel="noopener noreferrer" href = "https://ethereum.org/en/"> Ethereum < / a> blockchain. 
			 </p>
			 <div class="row text-center">
			 <div class="span4"><img src="diagram.png" class="img-fluid" alt="Responsive image"/></div>
		</div>
	</div>
</div>
	<table class="table table-striped table-dark">
		<thead>
		<tr>
			<th scope="col">#</th>
			<th scope="col">Title</th>
			<th scope="col">Description</th>
			<th scope="col">Source</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<th scope="row">1</th>
			<td><a target="_blank" rel="noopener noreferrer" href = "https://gateway.pinata.cloud/ipfs/QmRA3NWM82ZGynMbYzAgYTSXCVM14Wx1RZ8fKP42G6gjgj">Bitcoin: A Peer-to-Peer Electronic Cash System< / a></td>
			<td>Satoshi Nakamoto</td>
			<td>Satoshi Nakamoto</td>
		</tr>
		<tr>
			<th scope="row">2</th>
			<td><a target="_blank" rel="noopener noreferrer" href = "https://gateway.pinata.cloud/ipfs/QmTroTTEVEZKPRXJd1tsyg7w1oUmuxxF6j2tBKk1hfeHry">The Holy Bible KJV Edinburgh (1793)< / a></td>
			<td>The Old And New Testament Translated Out Of The Original Tongues</td> 
			<td>https://commons.wikimedia.org/wiki/File:The_Holy_Bible_KJV_Edinburgh_(1793).pdf</td>
		</tr>
		<tr>
			<th scope="row">3</th>
			<td>Shakespeare</td>
			<td>All of Shakespeare's works</td>
			<td>Folger Shakespeare Library</td>
		</tr>
		</tbody>
	</table>
	<Footer/>
</div>
);};
