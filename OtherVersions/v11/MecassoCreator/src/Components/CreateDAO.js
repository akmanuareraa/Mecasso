import React, { useEffect } from 'react';
import InputField from './InputField';
import InstallMetamask from './InstallMetamask';



function CreateDAO(props) {

	const checkFields = () => {

		let params = props.fields;

		if (params.description && params.category && params.tokenname && params.tokensymbol && params.creatorname
			&& params.launchprice && params.creatortokens && params.initialtokens) {

			if (params.launchprice < 0.1 || params.launchprice > 5) {
				console.log('launchprice', params.launchprice)
				window.alert("Launch price can be between 0.1 and 5 Matic");
			}

			else if (params.initialtokens < 0.1 || params.initialtokens > 100000) {
				console.log('initialtoken', params.initialtokens)
				window.alert("Inital tokens can be between 0.1 and 100000");
			}

			else if (params.creatortokens < 5 || params.creatortokens > 50) {
				window.alert("Creators share can be between 0.1% and 50%");
			}

			else {
				props.ipfsUpload();
			}
		}
		else {
			window.alert("Please enter all the field in the form");
		}


	}



	console.log(props.socialIDs);

	let handleChange = e => {
		props.onInputChangeUpdateField('description', e.target.value);
	};

	const selecthandleChange = e => {
		// let category;
		// props.onInputChangeUpdateField('category',category);
		console.log('select', e.target.value)
		props.onInputChangeUpdateField('category', e.target.value);
		console.log('fields', props.fields)
	}

	if (props.isWeb3) {


		return (

			<div className="column is-8 is-offset-2">
				<br></br><br></br><br></br><br></br>
				<div className="box bg-box renaiform">

					<div className="column has-text-centered">
						<br></br>
						<h1 class="title is-1 is-renai-invert">Create New Community Token</h1>
					</div>

					<br></br>
					<div className="column">
						<h5 class="title is-6 is-renai-invert">
							Enter Token Name
						</h5>

						<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
							fields={props.fields} name="tokenname" placeholder="Community Name" />

						<br></br><br></br>

						<h5 class="title is-6 is-renai-invert">
							Enter Community Token Symbol
						</h5>

						<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
							fields={props.fields} name="tokensymbol" placeholder="Token Symbol" />
						<br></br><br></br>

						<h5 class="title is-6 is-renai-invert">
							Fundraising Objectives
						</h5>

						<textarea class="textarea is-renai" onInput={handleChange} placeholder="List Objectives 1,2,3..etc"></textarea>


						<br></br><br></br>


						<h5 class="title is-6 is-renai-invert">
							Enter Content Creator Name
						</h5>

						<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
							fields={props.fields} name="creatorname" placeholder="Creator's Name" />

						<br></br><br></br>

						<h5 className="title is-6 is-renai-invert">
							Linked Social Handles
						</h5>

						{

							props.socialIDs.Youtube ?

								<div className="is-renai">

									<p className="is-white">
										<b>YouTube Channel Name</b> :  {props.socialIDs.Youtube.channelName}

									</p>
								</div> :
								<div></div>

						}

						{

							props.socialIDs.Instagram ?

								<div className="is-renai">

									<p className="is-white">
										<b>Instagram Username</b> :  {props.socialIDs.Instagram.username}

									</p>
								</div> :
								<div></div>

						}

						{

							props.socialIDs.Facebook ?

								<div className="is-renai">

									<p className="is-white">
										<b>Facebook Username</b> :  {props.socialIDs.Facebook.name}

									</p>
								</div> :
								<div></div>

						}


						<br></br>

						<h5 class="title is-6 is-renai-invert">
							Category
						</h5>

						<div className="column">
							<div className="select is-dark"
								onChange={selecthandleChange} default="Art">
								<select>
									<option>Art</option>
									<option>Music</option>
									<option>Dance</option>
									<option>Sports</option>
									<option>Gaming</option>
									<option>Skits</option>
									<option>Cooking</option>
								</select>
							</div>
						</div>
						<br></br><br></br>

						<h5 class="title is-6 is-renai-invert">
							Initial Supply of Tokens
						</h5>

						<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
							fields={props.fields} name="initialtokens" placeholder="Inital tokens can be between 0.1 and 100000" />
						<br></br><br></br>

						<h5 class="title is-6 is-renai-invert">
							Creator's Share
						</h5>

						<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
							fields={props.fields} name="creatortokens" placeholder="in %age - Creators share can be between 0.1% and 50%" addon="%" />



						<br></br><br></br>

						<h5 class="title is-6 is-renai-invert">
							Launch Price (in MATIC)
						</h5>

						<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
							fields={props.fields} name="launchprice" placeholder="Launch price can be between 0.1 and 5 MATIC" addon="MATIC" />
					</div>

					<br></br>

					<div className="column is-4 is-offset-4">
						<div className="columns">

							<div className="column">


								<div>
									<a className="button is-renai "
										onClick={() => checkFields()}>
										Launch Token</a>
								</div>
							</div>



						</div>
					</div>
				</div>
			</div>

		)
	}

	else {
		return (
			<div className="box" style={{}}>

				<div className="column is-offset-2">
					<InstallMetamask />
				</div>
			</div>
		)
	}

}




export default CreateDAO;
