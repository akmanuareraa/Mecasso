import React, { useEffect } from 'react';
//import InputField from './InputField';
//import PasswordField from './PasswordField';

import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { InstagramLogin } from '@amraneze/react-instagram-login';
import InstallMetamask from './InstallMetamask';
import axios from 'axios'



function CreateWallet(props) {

	const FB = window.FB

	console.log("Fieldlist", props.FieldList);
	/*
console.log("dbcode",props.fields.dbcode);
console.log("dbpass",props.passwords.dbpassword);
console.log("Dropbox",props.FieldList.DropBox)
*/

	//const GoogleclientId = '88480002859-oiismq5k2ch2f0ks44juugq2apfu4b8i.apps.googleusercontent.com';
	//const GoogleclientId ='962926068154-vk6eqd7h8pdllp80eppd67ioiknh0j9d.apps.googleusercontent.com';
	const GoogleclientId = '88480002859-b5pouordl426co37fpaumv2etlssl9v9.apps.googleusercontent.com';
	const Instagramclient = "646397543132580";;
	const FBclient = "1528784487462702";
	const DBclient = 'anzaxtqa7u2av6w';
	// const Instaclient = '338228141407299';
	const DBpassword = 'jz3dc4fbh74gjrv';
	const gapi = window.gapi;

	const GoogleonSuccess = (res) => {
		console.log("response", res)
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
			.then(function () { console.log("GAPI client loaded for API"); },
				function (err) { console.error("Error loading GAPI client for API", err); })

			.then(function () {

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
					.then(function (response) {
						// Handle the results here (response.result has the parsed body).
						console.log("Reached GAPI parse");
						//console.log("Response", response.body);
						var temp = JSON.parse(response.body);

						//var temp = response.body
						console.log("temp", temp);
						var channelUrl;
						if (temp.items[0].snippet.customUrl) {
							channelUrl = temp.items[0].snippet.customUrl;
						}
						else {
							channelUrl = "https://www.youtube.com/channel/" + temp.items[0].id;
						}

						console.log("channelUrl", channelUrl);
						let category = [];

						if (temp.items[0].topicDetails) {
							category = temp.items[0].topicDetails.topicCategories;
						}
						else {
							category[0] = 'Not Defined';
						}

						var YoutubeInfo = {

							channelName: temp.items[0].brandingSettings.channel.title,
							description: temp.items[0].snippet.description,
							createdOn: temp.items[0].snippet.publishedAt,
							url: channelUrl,
							thumbnail: temp.items[0].snippet.thumbnails.medium,
							categories: category,
							views: temp.items[0].statistics.viewCount,
							subscribers: temp.items[0].statistics.subscriberCount,
							mediaCount: temp.items[0].statistics.videoCount,
							email: res.profileObj.email
						}

						console.log('Youtube Info', YoutubeInfo);



						gapi.auth2.getAuthInstance().signOut().then(function () {
							console.log('User signed out.');
						});


						props.setSocialCard('Youtube', YoutubeInfo);
					},
						function (err) { console.error("Execute error", err); })
			})
		/*
		})
		*/
	};



	const GoogleonFailure = (res) => {
		console.log('Login failed: res:', res);

	};

	const responseInstagram = (response) => {
		console.log('instagram response', response)
		const requestOptions = {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Accept': 'application/json'
			},
			body: new URLSearchParams({
				client_id: Instagramclient,
				client_secret: '0e3116e1416f68b8b75de9cfecf67b82',
				grant_type: 'authorization_code',
				redirect_uri: 'https://localhost:4000/',
				code: response
			})
		}
		console.log('insta request options', requestOptions)
		fetch('https://api.instagram.com/oauth/access_token', requestOptions)
			.then(response => {
				console.log('insta response', response.json().then(function (response, error) {
					console.log('after json', response)
					let userToken = response
					//axios.get('https://graph.instagram.com/' + instaUserObject.user_id + '?fields=id,username&access_token=' + instaUserObject.access_token).then(function (response, error){ 
					axios.get('https://graph.instagram.com/me?fields=id,username,account_type,media_count&access_token=' + userToken.access_token).then(function (response, error) {
						if (response) {
							let instabio = response.data
							console.log('instabio', instabio)
							axios.get('https://graph.instagram.com/me/media?fields=id,caption&access_token=' + userToken.access_token).then(function (response, error) {
								if (response) {
									let instaMedia = response.data
									console.log('instagram media', instaMedia)
									axios.get('https://graph.instagram.com/' + instaMedia.data[1].id + '?fields=id,media_type,media_url,username,timestamp&access_token=' + userToken.access_token).then(function (response, error) {
										if (response) {
											let postData = response.data
											console.log('Full Post Data', postData)
											let instaInfo = {
												accountType: instabio.account_type,
												accountID: instabio.id,
												mediaCount: instabio.media_count,
												username: instabio.username,
												media: postData
											}
											console.log('instainfo', instaInfo)
											if(instabio.account_type !== 'BUSINESS'){
												alert('Only BUSINESS/CREATOR accounts are supported')
											} else {
												console.log('Processing to FB to fetch the data')
												fbLogin(instabio.username, instaInfo)
											}
											// let postParams = {
											// 	media_url: postData.media_url,
											// 	timestamp: postData.timestamp
											// }
											// props.migrateInstagramPosts(postParams)
											
										} else {
											console.log(error)
										}
									})
									// axios.get('https://graph.facebook.com/v13.0/me?fields=business_discovery.username(' + instabio.username + '){followers_count,media_count}&access_token=' + userToken.access_token).then(function (response, error) {
									// 	if(response){
									// 		console.log('insta business response', response.data)
									// 	} else {
									// 		console.log(error)
									// 	}
									// })

								} else {
									console.log(error)
								}
							})
						} else {
							console.log(error)
						}
					})
				}))
			})
			.then(data => {
				console.log('insta data', data)
			})
			.catch((error) => {
				console.log(error)
			});
	}

	const responseFacebook = (res) => {
		console.log("Facebook", res.email, res);
		let fbInfo = {
			name: res.name,
			email: res.email,
			userId: res.id,
			picture: res.picture.data.url,
			accessToken: res.accessToken
		}
		console.log('fbinfo', fbInfo)
		axios.get('https://graph.facebook.com/v13.0/me?fields=accounts&access_token=' + fbInfo.accessToken).then(function (response, error) {
			if (response) {
				console.log('fb profile data', response.data)
			} else {
				console.log(error)
			}
		})
		// axios.get('https://instagram.com/ishanroy2005/?__a=1').then(function (response, error) {
		// 	if(response){
		// 		console.log('insta dump', response.data)
		// 	}
		// })

		// const requestOptions = {
		// 	method: 'GET',
		// 	mode: 'no-cors',
		// 	headers: {
		// 		'Accept': 'application/json'
		// 	}
		// }

		// fetch('https://instagram.com/ishanroy2005/?__a=1', requestOptions)
		// 	.then(response => {
		// 		console.log('insta dump', response)
		// 	})
		props.setSocialCard('Facebook', fbInfo);

		// props.setID('Facebook', res.email, res.signedRequest)


		//https://graph.facebook.com/v3.2/17841405309211844?fields=business_discovery.username(bluebottle){followers_count,media_count}&access_token={access-token}"



		// var url = new URL("https://api.instagram.com/oauth/authorize");

		// var params = [['client_id', Instagramclient], ['scope', 'user_profile'], ['response_type', 'code']];

		// url.search = new URLSearchParams(params).toString();

		// const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
		// if (newWindow) newWindow.opener = null

	}

	// function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
	// 	console.log('statusChangeCallback');
	// 	console.log(response);                   // The current login status of the person.
	// 	if (response.status === 'connected') {   // Logged into your webpage and Facebook.
	// 		testAPI();
	// 	} else {                                 // Not logged into your webpage or we are unable to tell.
	// 		console.log('nothiung')
	// 	}
	// }


	// function checkLoginState() {               // Called when a person is finished with the Login Button.
	// 	FB.getLoginStatus(function (response) {   // See the onlogin handler
	// 		statusChangeCallback(response);
	// 	});
	// }


	// window.fbAsyncInit = function () {
	// 	FB.init({
	// 		appId: '997759614488116',
	// 		autoLogAppEvents: true,
	// 		xfbml: true,
	// 		version: 'v13.0'       // Use this Graph API version for this call.
	// 	});

	// 	FB.login(function (response) {
	// 		if (response.authResponse) {
	// 			console.log('Welcome!  Fetching your information.... ');
	// 			FB.api('/me', function (response) {
	// 				console.log('Good to see you, ' + response.name + '.');
	// 			});
	// 		} else {
	// 			console.log('User cancelled login or did not fully authorize.');
	// 		}
	// 	}, { scope: 'public_profile,email,pages_show_list,instagram_basic' });

	// 	FB.getLoginStatus(function (response) {   // Called after the JS SDK has been initialized.
	// 		statusChangeCallback(response);        // Returns the login status.
	// 	});
	// };

	async function fbLogin(instaUsername, instainfo) {
		await FB.init({
			appId: '997759614488116',
			autoLogAppEvents: true,
			xfbml: true,
			version: 'v13.0'       // Use this Graph API version for this call.
		});

		FB.login(function (response) {
			if (response.authResponse) {
				console.log('Welcome!  Fetching your information.... ');
				FB.api('/me', function (response) {
					console.log('Good to see you, ' + response.name + '.');
					console.log('response from fb', response)
					FB.getLoginStatus(function (response) {
						if (response.status === 'connected') {
							console.log('accesstokenresponse', response.authResponse.accessToken);
							console.log('fullaccesstokenresponse', response)
							let myaccesstoken = response.authResponse.accessToken
							axios.get('https://graph.facebook.com/v13.0/me?fields=accounts&access_token=' + response.authResponse.accessToken).then(function (response, error) {
								if (response) {
									console.log('fb profile data', response.data)
									let pageID = response.data.accounts.data[0].id
									let pageAccessToken = response.data.accounts.data[0].access_token
									axios.get('https://graph.facebook.com/v13.0/' + pageID + '?fields=instagram_business_account&access_token=' + myaccesstoken).then(function (response, error) {
										if (response) {
											console.log('decor page data', response.data)
											let instagramAcc = response.data.instagram_business_account.id
											axios.get('https://graph.facebook.com/v3.2/' + instagramAcc + '?fields=business_discovery.username(bluebottle){followers_count,media_count}&access_token=' + myaccesstoken).then(function (response, error) {
												if (response) {
													console.log('business discovery data', response.data)
													instainfo.followerCount = response.data.business_discovery.followers_count
													instainfo.mediaCount = response.data.business_discovery.media_count
													props.setSocialCard('Instagram', instainfo)
												} else {
													console.log(error)
												}
											})
										} else {
											console.log(error)
										}
									})
								} else {
									console.log(error)
								}
							})
						}
					});
				});
			} else {
				console.log('User cancelled login or did not fully authorize.');
			}
		}, { scope: 'public_profile,email,pages_show_list,instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,instagram_manage_messages' });
	}

	// function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
	// 	console.log('Welcome!  Fetching your information.... ');
	// 	FB.api('/me', function (response) {
	// 		console.log('Successful login for: ' + response.name);
	// 	});
	// }

	let linktreeHandle

	function handleLinktree(e) {
		console.log('linktree input', e.target.value)
		linktreeHandle = 'https://linktr.ee/' + e.target.value + '/'
	}

	function curlLinktree() {
		// axios.get(linktreeHandle).then(html => {
		// 	console.log('linktree dump', html.data)
		// })

		const requestOptions = {
			mode: 'no-cors',
			// headers: {
			// 	'Accept': 'application/json'
			// }
		}
		
		fetch(linktreeHandle, requestOptions)
			.then(res => {
				console.log('ress', res)
			})
			.catch(err => console.log(err));
	}



	if (props.isWeb3) {


		return (


			<div className="box bg-box">
				<div className="is-hidden-mobile">
					<br></br><br></br>
				</div>

				<div className="column has-text-centered">
					<p>
						<h1 class="title is-3 is-renai-invert">Select Existing Content Creation Platforms</h1>
					</p>
				</div>
				<div className="is-hidden-mobile">
					<br></br><br></br>
				</div>

				<div className="column  is-10 has-text-centered is-offset-1 is-hidden-mobile">
					<div className="box bg-box renaipanel ">
						<div className="columns is-multiline">

							<div className="column is-3 is-offset-1">

								<div className="panel-block">
									<a onClick={() => props.setField(1)}>
										<figure className={props.FieldList.Youtube == 'Yes' ? "image is-social is-active" : props.FieldList.Youtube == 'YesAuth' ? "image is-social is-verified" : "image is-social"}>
											<img src={'icons/youtube.png'} />
										</figure>
									</a>
								</div>
								{
									props.FieldList.Youtube == 'YesAuth' ?
										<b>VERIFIED</b> :
										<></>
								}
							</div>

							<div className="column is-1"></div>

							<div className="column is-2">

								<div className="panel-block">
									<a onClick={() => props.setField(2)}>
										<figure className={props.FieldList.Instagram == 'Yes' ? "image is-social is-active" : props.FieldList.Instagram == 'YesAuth' ? "image is-social is-verified" : "image is-social"}>
											<img src={'icons/instanew.png'} />
										</figure>
									</a>
								</div>
								{
									props.FieldList.Instagram == 'YesAuth' ?
										<b>VERIFIED</b> :
										<></>
								}
							</div>


							<div className="column is-1"></div>

							<div className="column is-3">
								<div className="panel-block" style={{ justifyContent: 'center' }}>
									<a onClick={() => props.setField(3)}>
										<figure className={props.FieldList.Facebook == 'Yes' ? "image is-social is-active" : props.FieldList.Facebook == 'YesAuth' ? "image is-social is-verified" : "image is-social"}>
											<img src={'icons/facebook.svg'} style={{ width: '130px' }, { height: '130px' }} />
										</figure>
									</a>
								</div>
								{
									props.FieldList.Facebook == 'YesAuth' ?
										<b>VERIFIED</b> :
										<></>
								}
							</div>



						</div>

						<div className="columns">

							<div className="column is-2 is-offset-3">
								<div className="panel-block">
									<a onClick={() => props.setField(4)}>
										<figure className={props.FieldList.Linktree == 'Yes' ? "image is-social is-active" : props.FieldList.Linktree == 'YesAuth' ? "image is-social is-verified" : "image is-social"}>
											<img src={'icons/Linktree-logo1.svg'} style={{ width: '130px' }, { height: '130px' }} />
										</figure>
									</a>
								</div>
								{
									props.FieldList.Linktree == 'YesAuth' ?
										<b>VERIFIED</b> :
										<></>
								}
							</div>
							<div className="column is-2"></div>
							<div className="column is-2">
								<a>
									<figure className="image is-social" >
										<img src={'icons/behance.svg'} />
									</figure>
								</a>
								Coming Soon!
							</div>

						</div>
					</div>
				</div>

				<div className="column  is-10 has-text-centered is-offset-1 is-hidden-desktop">
					{
						props.FieldList.Youtube == 'Yes' ?
							<div>Scroll down to approve account</div> :
							<div></div>
					}
					<div className="box bg-box renaipanel ">
						<div className="columns is-multiline is-mobile is-vcentered ">

							<div className="column is-8 is-offset-2">

								<div className="panel-block">
									<a onClick={() => props.setField(1)}>
										<figure className={props.FieldList.Youtube == 'Yes' ? "image is-social is-active" : props.FieldList.Youtube == 'YesAuth' ? "image is-social is-verified" : "image is-social"}>
											<img src={'icons/youtube.png'} />
										</figure>
									</a>
									<br></br>

								</div>

							</div>
						</div>

						<div className="columns is-multiline is-mobile">

							<div className="column">

								<a>
									<figure className="image is-social" >
										<img src={'icons/instanew.png'} />
									</figure>
								</a>
								Coming Soon!
							</div>

							<div className="column">
								<a>
									<figure className="image is-social" >
										<img src={'icons/behance.svg'} />
									</figure>
								</a>
								Coming Soon!
							</div>
						</div>

						<div className="columns is-centered is-mobile">

							<div className="column">
								<a>
									<figure className="image is-social" >
										<img src={'icons/twitch.png'} />
									</figure>
								</a>
								Coming Soon!
							</div>


							<div className="column">
								<a>
									<figure className="image is-social" >
										<img src={'icons/behance.png'} />
									</figure>
								</a>
								Coming Soon!
							</div>

						</div>
					</div>
				</div>

				<div className="is-hidden-mobile">
					<br></br>
				</div>

				<div className="column has-text-centered">
					{/* <div className="columns"> */}
					<div className="columns is-centered">

						{

							props.FieldList.Youtube == 'Yes' ?

								<div className="column">


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
							props.FieldList.Facebook == 'Yes' ?
								<div className="column">
									{/* <button onClick={() => fbLogin()}>FB Login</button> */}
									<FacebookLogin
										appId={FBclient}
										size="medium"
										autoLoad={false}
										textButton="Verify your Facebook ID"
										fields="name,email,picture.type(large)"
										// scope="pages_show_list"
										callback={responseFacebook} />
								</div> :
								// props.FieldList.FB == 'YesAuth' ?

								// 	<div className="column">
								// 		<h5 class="title is-6 ">
								// 			<span>Facebook ID verified!</span>
								// 		</h5>

								// 	</div> :
								<div></div>
						}

						<br></br>
						{
							props.FieldList.Instagram == 'Yes' ?
								<div className="columns is-centered mb-3">
									<InstagramLogin
										clientId={Instagramclient}
										onSuccess={responseInstagram}
										onFailure={responseInstagram}
										implicitAuth={true}
									// scope={'user_profile,user_media'}
									// useRedirect={false}
									// redirectUri='https://mecasso.live/'
									>
									</InstagramLogin>
								</div> :
								// props.FieldList.Instagram == 'YesAuth' ?

								// 	<div className="column">
								// 		<h5 class="title is-6 ">
								// 			<span>Instagram ID verified!</span>
								// 		</h5>

								// 	</div> :
								<div></div>
						}
						<br></br>


						{
							props.FieldList.Linktree == 'Yes' ?
								<>
									<div className="columns is-centered mb-3">
										Enter your Linktree Handle
										<br></br><br></br>
										<input class="input is-primary" type="text" placeholder="Primary input" onChange={handleLinktree} />
										<button class="button is-primary ml-2" onClick={() => curlLinktree()}>Primary</button>
									</div>
								</> :
								<div></div>
						}
						<br></br>
					</div>
				</div>



				<div className="column is-4 is-offset-4 has-text-centered">
					{
						props.FieldList.Youtube == 'YesAuth' || props.FieldList.Facebook == 'YesAuth' || props.FieldList.Instagram == 'YesAuth' ?
							<div>

								<div className="columns">

									<div className="column">
										<a className="button is-renai is-medium"
											onClick={() => props.setNav('1a')}>
											Generate Social Exp Card</a>
									</div>


								</div>
							</div> :

							<div>

							</div>
					}
				</div>



				<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
			</div>

		)
	}

	else {
		return (
			<div className="box bg-box" style={{}}>

				<div className="column bg-img">
					<br></br><br></br><br></br><br></br><br></br>
					<InstallMetamask connectWC={props.connectWC} />
					<br></br><br></br><br></br><br></br><br></br>
				</div>
			</div>

		)
	}
}




export default CreateWallet;


