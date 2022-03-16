import newabi from './abi.js';
//import transferabi from './transferabi.js';
import exchangeabi from './exchangeabi.js';

const config = {
	
	erc721ContractAddress: "0xF82FCE6e1053C8392c5C7E12D245B06ECCD6D0DD",
	server : 'localhost:5000',
	contractAbi : newabi,
	exchangeAbi : exchangeabi,
	Exchange: "0x4250cc5B63d7B278208E76DB1Aae7607d37E1B84",
	TransferProxy: "0xA7CF577B427c455D4fF04E5E2683714e6813ba1b",
	//TransferAbi : transferabi,
	backend: 'https://api.mecasso.live'
}

export default config
