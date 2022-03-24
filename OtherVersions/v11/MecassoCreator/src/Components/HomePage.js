import React from 'react';
import background from "../img/background.png";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import DropboxChooser from 'react-dropbox-chooser';

const clientId =
  '88480002859-oiismq5k2ch2f0ks44juugq2apfu4b8i.apps.googleusercontent.com';



function HomePage(props) {
    
	console.log("Web3",props.isWeb3);
	

	return (
	    
	<div className ="box bg-box" style={{ }}>  

        <div className = "columns is-centered"> 
        
		<div className = "column is-6 has-text-centered ">
		<figure className="image is-inline-block" >
  		<img src={'images/Mecasso-Renai.png'} width="100px" length="100px"/> 
		</figure>
		<br></br>
		<h4 className="title is-4 is-renai-invert"> Creators Portal</h4>
		</div>
		
	   </div>

	   <br></br>
	   
	   <div className = "column  has-text-centered">
		<div className = "columns is-centered">
		
		<div className = "column is-3 has-text-centered">
		<p className="control has-text-centered">
		
                        <a className="button is-renai" 
                           onClick={() => props.setNav(1)}>
                         Issue Social Token</a>
               </p>
		</div>
		
		<div className = "column is-3 has-text-centered">	
               <p className="control has-text-centered">
                        <a className="button is-renai " 
                            onClick={() => props.setNav(10)}>
                           Manage Community</a>
               </p>
        </div>

		
		</div>
        </div>
		
	
		
		<br></br>
		<br></br><br></br><br></br><br></br>
		
		     
                    	
				
		<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
		
		<div>
		
	

	
	
				
		</div>
		</div>
		)
		

}

export default HomePage;
