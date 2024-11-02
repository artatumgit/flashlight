import Footer from "./Footer.js"; 
import { useState } from "react";
import AuthJSON from '../Auth.json';
import { useLocation } from "react-router";
import axios from 'axios';

export default function SendFile () {
	const [formParams, updateFormParams] = useState({ name: '', description: ''});
	const [resultp, setResultp] = useState('');

	const [file, setFile] = useState();
	const [uploadedFile, setUploadedFile] = useState();
	const [fileCID, setFileCID] = useState();
	const [error, setError] = useState();



	// submit form built from this guide but used an input form type button with onClick instead of button with type=submit. 
	//https://www.filestack.com/fileschool/react/react-file-upload/
	function changeHandler(e) {
		e.preventDefault();
		setFile(e.target.files[0]);
	};
	
	async function submitHandler(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file',file)
		formData.append('fileName', file.name);

		const config = {headers: {'Content-Type': 'multipart/form-data'}}

		let serv_url = 'https://theneomedium.com/pinata_uploadFILEToIPFS'
	
		try {
			// upload file to express app for posting to IPFS
			const response = await axios.post(serv_url, formData, config)
			.then((response) => {
				console.log(response.data);
				setFileCID(response.data); 
				setUploadedFile('https://gateway.pinata.cloud/ipfs/' + response.data);
			})
			.catch((error) => {
				console.error("Error uploading file: ", error);
				setError(error);
			});	
			return response
		}
	catch(e) {
		console.log("error uploading file:", e)
		}
	};

	//This function uploads the metadata to IPFS
	async function uploadMetadataToIPFS() {
		const {name, description} = formParams;
		let serv_pinJSON = 'https://theneomedium.com/pinata_uploadJSONToIPFS'
		//Make sure that none of the fields are empty
		if( !name || !description)
		return;

		const nftJSON = {
		name, description
		}

		try {
		//upload the metadata JSON to IPFS
		const response = await axios 
			.post(serv_pinJSON, nftJSON)
			.then((response) => {
				console.log("Uploaded JSON to IPFS: ", response.data)
				console.log(response.data)
				setResultp(response.data)
				return response.config.data;
			}); //uploadJSONToIPFS(nftJSON); 
			return response
		}
		catch(e) {
			console.log("error uploading JSON metadata:", e)
		}
	};

	async function sendIPFS(e) {
		e.preventDefault();

		//Upload data to IPFS
		try {
			const metadataURL = await uploadMetadataToIPFS();
			console.log("Uploaded!");
		}
		catch(e) {
			alert( "Upload error"+e )
		}
	};

return (
<>
<div class="px-10 py-2">
	<div class="container-fluid px-10" style={{"max-height":"125vh"}}>
		<div class="flex flex-col place-items-center mt-10 ml-10 px-10 bg-gradient-to-t from-white" id="nftForm">
		<h3 class="text-center font-bold text-purple-500 mb-8">Upload a file to IPFS</h3>
			<form class="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
			<form>
			<input type="file" onChange={changeHandler} required />
			<input type='button' onClick={submitHandler} value = "Submit" />
			</form>
			<br></br>
			
			<div class="text-green text-center"> 
			<label class="block text-purple-500 text-sm font-bold mb-2 " htmlFor="name">IPFS Unique CID: {fileCID}</label>
			<br></br>
			<p>View your file here:  <a target="_blank" rel="noopener noreferrer" href = {uploadedFile}>{uploadedFile} </a> </p>
			
			</div>
			<br></br>
			</form>
		</div>
		<Footer/>
	</div>
</div>
</>
  );
}
