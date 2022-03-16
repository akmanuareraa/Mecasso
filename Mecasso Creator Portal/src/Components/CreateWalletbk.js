import React, { useEffect } from 'react';
//import InputField from './InputField';
//import PasswordField from './PasswordField';

import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import InstallMetamask from './InstallMetamask';



function CreateWallet(props) {
	
	console.log("Fieldlist",props.FieldList);
		/*
	console.log("dbcode",props.fields.dbcode);
	console.log("dbpass",props.passwords.dbpassword);
	console.log("Dropbox",props.FieldList.DropBox)
	*/

	//const GoogleclientId = '88480002859-oiismq5k2ch2f0ks44juugq2apfu4b8i.apps.googleusercontent.com';
	//const GoogleclientId ='962926068154-vk6eqd7h8pdllp80eppd67ioiknh0j9d.apps.googleusercontent.com';
	const GoogleclientId ='88480002859-b5pouordl426co37fpaumv2etlssl9v9.apps.googleusercontent.com';
	
	const FBclient = "1528784487462702";
	const DBclient = 'anzaxtqa7u2av6w';
	const Instaclient = '338228141407299';
	const DBpassword = 'jz3dc4fbh74gjrv';
	const gapi = window.gapi;

	const GoogleonSuccess = (res) => {
		console.log("response",res)
		console.log('Login Success: currentUser:', res.profileObj.email);
		
		console.log(res.profileObj.email);

		/*
		gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); }).then(function(){
  
		*/		
		//Load Client
		
		gapi.client.setApiKey("AIzaSyB5h6pykgC8_J_xlYkqAU8ysKvY4wtyQyo");
		
		gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
			.then(function() { console.log("GAPI client loaded for API"); },
				  function(err) { console.error("Error loading GAPI client for API", err); })
			
		   .then(function(){

		gapi.client.youtube.channels.list({
			"part": [
				"id",
			  "snippet",
			  "brandingSettings",
			  "topicDetails",
			  "statistics"
			],
			"mine": true
		  })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Reached GAPI parse");
				//console.log("Response", response.body);
				var temp = JSON.parse(response.body);

				//var temp = response.body
				console.log("temp",temp);
				var channelUrl;
				if(temp.items[0].snippet.customUrl)
				{
					channelUrl = temp.items[0].snippet.customUrl;
				}
				else
				{
					channelUrl = "https://www.youtube.com/channel/"+temp.items[0].id; 
				}

				console.log("channelUrl",channelUrl);
				let category = [];

				if(temp.items[0].topicDetails)
				{
					category = temp.items[0].topicDetails.topicCategories;
				}
				else
				{
					category[0] = 'Not Defined';
				}

				var YoutubeInfo = {

					channelName : temp.items[0].brandingSettings.channel.title,
					description : temp.items[0].snippet.description,
					createdOn : temp.items[0].snippet.publishedAt,
					     url : channelUrl,
					thumbnail : temp.items[0].snippet.thumbnails.medium,
					categories: category,
					views : temp.items[0].statistics.viewCount,	
					subscribers : temp.items[0].statistics.subscriberCount,
					mediaCount : temp.items[0].statistics.videoCount,
					email: res.profileObj.email
				}

				console.log(YoutubeInfo);


				
					gapi.auth2.getAuthInstance().signOut().then(function () {
					  console.log('User signed out.');
					});
				  

				props.setSocialCard('Youtube',YoutubeInfo);
              },
              function(err) { console.error("Execute error", err); })
			})
			/*
			})
			*/
	  		};

  

const GoogleonFailure = (res) => {
		console.log('Login failed: res:', res);
		
	  };		

const responseFacebook = (res) => {
		console.log("Facebook",res.email,res);

		props.setID( 'Facebook',res.email,res.signedRequest)


		//https://graph.facebook.com/v3.2/17841405309211844?fields=business_discovery.username(bluebottle){followers_count,media_count}&access_token={access-token}"

		

		var url = new URL("https://api.instagram.com/oauth/authorize");

		var params = [['client_id', Instaclient], ['scope', 'user_profile'], ['response_type', 'code']];

		url.search = new URLSearchParams(params).toString();
  
		const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
		if (newWindow) newWindow.opener = null

	}	  



		

		if(props.isWeb3)
		{
    
	
	return (
        
				
				<div className = "box bg-box">
				<br></br><br></br>
				
				
				
				
				<div className = "column has-text-centered">
				<p>
                	<h1 class="title is-1 is-renai-invert">Select Existing Content Creation Platforms</h1>
				</p>
				</div>

				<br></br><br></br>
				
				<div className = "column  is-10 has-text-centered is-offset-1">
				<div className = "box bg-box renaipanel">	
				<div className = "columns is-multiline">

				<div className = "column is-3 is-offset-1">
						
				<div className="panel-block">
				<a  onClick={() => props.setField(1)}>	
				<figure className={props.FieldList.Youtube == 'Yes'?"image is-social is-active":  props.FieldList.Youtube == 'YesAuth'? "image is-social is-verified":"image is-social"}>
  				<img src={'icons/youtube.png'}/>
				</figure>
				</a>
				</div>

				</div>

				<div className = "column is-1"></div>
				
				<div className = "column is-2">
					
				<a>	
				<figure className="image is-social" >
  				<img src={'icons/instanew.png'}/> 
				</figure>
				</a>
				Coming Soon!
				</div>
				
				
				<div className = "column is-1"></div>

				<div className = "column is-3">
				<a>
				<figure className="image is-social" >
  				<img src={'icons/tiktok.png'}/> 
				</figure>
				</a>
				Coming Soon!
				</div>
				
				</div>

				<div className = "columns">
				
				<div className = "column is-2 is-offset-3">
				<a>
				<figure className="image is-social" >
  				<img src={'icons/twitch.png'}/> 
				</figure>
				</a>
				Coming Soon!
				</div>
				<div className = "column is-2"></div>
				<div className = "column is-2">
				<a>
				<figure className="image is-social" >
  				<img src={'icons/mxtakatak.png'}/> 
				</figure>
				</a>
				Coming Soon!
				</div>
				
				</div>
                </div>
				</div>

				
				<br></br>
								
				
				<div className = "column has-text-centered">
				<div className = "columns">

				{
				
				props.FieldList.Youtube == 'Yes'?
				
			  <div className = "column">


			  <GoogleLogin
			  clientId={GoogleclientId}
			  scope="https://www.googleapis.com/auth/youtube.readonly"
			  
			  buttonText= <b>Verify Google (Youtube) Account</b>
			  disabled= {props.disabled}		
			  onSuccess={GoogleonSuccess}
			  onFailure={GoogleonFailure}			
			  language ="en_US"
			  cookiePolicy={'single_host_origin'}
			  isSignedIn={true}
				/>
				</div>	  
			  :
			  

				<div></div>
                            }
                            
                            
            <br></br>
            {
            props.FieldList.FB == 'Yes'?
            <div className = "column">	
			<FacebookLogin
    		appId={FBclient}
			size="medium"
    		autoLoad={true}
			textButton="Verify Facebook ID"
   			fields="name,email,picture"  
			scope="public_profile,pages_show_list,user_actions.books"   
    		callback={responseFacebook} />
			</div>:
			props.FieldList.FB == 'YesAuth'?
			  		
					  <div className = "column">
					<h5 class="title is-6 ">
								<span>Instagram (Facebook ID) verified!</span>
					</h5>	  
		
				</div>:
				<div></div>
			}


			
				
				</div>
				</div>
			
		
		
		<div className = "column is-4 is-offset-4 has-text-centered">
                            {
                            props.FieldList.Youtube == 'YesAuth'?
                            <div>
                    
						<div className = "columns">        
                        
						<div className = "column ">
						<a className="button is-renai is-medium" 
                            onClick={() => props.setNav('1a')}>
                           Generate Social Exp Card</a>
                        </div>   
                        
						<div className = "column">
							<a className="button is-renai-negative is-medium" 
                            onClick={() => props.resetForm()}>
                           Reset</a>
						   </div>      
						 </div>
                            </div>:
							
							<div>

							</div>
                            }	    
				</div>	

		
		
		<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
		</div>
		
    )
			}

			else
			{
			return(
				<div className ="box bg-box" style={{ }}>  

				<div className = "column bg-img">
					<br></br><br></br><br></br><br></br><br></br>
					<InstallMetamask connectWC = {props.connectWC}/>
					<br></br><br></br><br></br><br></br><br></br>
					</div>
					</div>
					
				)
			}
}




export default CreateWallet;


