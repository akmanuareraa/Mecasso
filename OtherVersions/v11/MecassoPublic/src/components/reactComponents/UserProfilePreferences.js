import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import config from '../../config'

import UserProfilePreferencesPlasmic from '../plasmicComponents/UserProfilePreferences'

function UserProfilePreferences(props) {

    const navigate = useNavigate()

    const [uiState, setUiState] = useState({
        creatorpref: false
    })

    const [preference, setPreference] = useState([])

    const [componentState, setComponentState] = useState({
        selectedContentPref: null,
        selectedCreatorPref: null,
        profile: [],
        // artselect: false,
        // musicselect: false,
        // danceselect: false,
        // sportsselect: false,
        // gamingselect: false,
        // skits
    })

    useEffect(() => {
        if (props.auth.state === 'authenticated') {
            if (props.user.get('profile').profile === 'Investor') {
                setUiState(prevState => {
                    return {
                        ...prevState,
                        creatorpref: true
                    }
                })
            } else if (props.user.get('profile').profile === 'Fan') {
                setUiState(prevState => {
                    return {
                        ...prevState,
                        creatorpref: false
                    }
                })
            }
        } else if (props.auth.state === 'unauthenticated') {
            navigate('/signup')
        }
    }, [props.auth])

    return (
        <div className="columns is-centered bg-img">
            <div className="column has-text-centered bg-img public is-hidden-mobile">
                <UserProfilePreferencesPlasmic
                    creatorpref={uiState.creatorpref}
                    art={{
                        selected: uiState.artselect,
                        onClick: () => {
                            if (uiState.artselect) {
                                console.log("slice")
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        artselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Art")))
                            } else {
                                console.log("push")
                                console.log(typeof componentState.profile)
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        artselect: true
                                    }
                                })
                                setPreference([...preference, "Art"])
                            }
                        }
                    }}

                    music={{
                        selected: uiState.musicselect,
                        onClick: () => {
                            if (uiState.musicselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        musicselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Music")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        musicselect: true
                                    }
                                })
                                setPreference([...preference, "Music"])
                            }
                        }
                    }}

                    dance={{
                        selected: uiState.danceselect,
                        onClick: () => {
                            if (uiState.danceselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        danceselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Dance")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        danceselect: true
                                    }
                                })
                                setPreference([...preference, "Dance"])
                            }
                        }
                    }}

                    sports={{
                        selected: uiState.sportsselect,
                        onClick: () => {
                            if (uiState.sportsselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        sportsselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Sports")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        sportsselect: true
                                    }
                                })
                                setPreference([...preference, "Sports"])
                            }
                        }
                    }}

                    gaming={{
                        selected: uiState.gamingselect,
                        onClick: () => {
                            if (uiState.gamingselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        gamingselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Gaming")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        gamingselect: true
                                    }
                                })
                                setPreference([...preference, "Gaming"])
                            }
                        }
                    }}

                    skits={{
                        selected: uiState.skitsselect,
                        onClick: () => {
                            if (uiState.skitsselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        skitsselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Skits")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        skitsselect: true
                                    }
                                })
                                setPreference([...preference, "Skits"])
                            }
                        }
                    }}

                    food={{
                        selected: uiState.foodselect,
                        onClick: () => {
                            if (uiState.foodselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        foodselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Food")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        foodselect: true
                                    }
                                })
                                setPreference([...preference, "Food"])
                            }
                        }
                    }}

                    influencers={{
                        selected: uiState.influencersselect,
                        onClick: () => {
                            if (uiState.influencersselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: true,
                                        influencersselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Influencers")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: true,
                                        influencersselect: true
                                    }
                                })
                                setPreference([...preference, "Influencers"])
                            }
                        }
                    }}

                    blogger={{
                        selected: uiState.bloggerselect,
                        onClick: () => {
                            if (uiState.bloggerselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: true,
                                        bloggerselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Blogger")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: true,
                                        bloggerselect: true
                                    }
                                })
                                setPreference([...preference, "Blogger"])
                            }
                        }
                    }}

                    celebrity={{
                        selected: uiState.celebrityselect,
                        onClick: () => {
                            if (uiState.celebrityselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: true,
                                        celebrityselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Celebrity")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: true,
                                        celebrityselect: true
                                    }
                                })
                                setPreference([...preference, "Celebrity"])
                            }
                        }
                    }}

                    youngstars={{
                        selected: uiState.youngstarsselect,
                        onClick: () => {
                            if (uiState.youngstarsselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: true,
                                        youngstarsselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Young Stars")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: true,
                                        youngstarsselect: true
                                    }
                                })
                                setPreference([...preference, "Young Stars"])
                            }
                        }
                    }}

                    comets={{
                        selected: uiState.cometsselect,
                        onClick: () => {
                            if (uiState.cometsselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: true,
                                        cometsselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Comets")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: true,
                                        cometsselect: true
                                    }
                                })
                                setPreference([...preference, "Comets"])
                            }
                        }
                    }}

                    nextprefbutton={{
                        children: "Next",
                        onClick: () => {
                            if (preference.length !== 0) {
                                props.setUserData({
                                    preferences: { preferences: preference }
                                })
                                navigate('/')
                            } else {
                                alert("Please select atleast 1 option")
                            }
                            // console.log(preference)
                            // if(props.user.get('profile').profile === "Investor") {
                            //     navigate('/basickyc')
                            // } else if (props.user.get('profile').profile === "Fan") {

                            // }
                            // call the backend function here to send the email with the verification link to the user
                            // axios.post/get('').then(function (response, error) {
                            //     if(response){
                            //         perform some action and then navigaate to email verification prompt
                            //         navigate('/emailverification')
                            //     }
                            // })
                            // setUiState(prevState => {
                            //     return {
                            //         ...prevState,
                            //         creatorpref: true
                            //     }
                            // })
                        }
                    }}

                    submitprefbutton={{
                        children: "Submit",
                        onClick: () => {
                            if (preference.length !== 0) {
                                props.setUserData({
                                    preferences: { preferences: preference }
                                })
                                navigate('/basickyc')
                            }
                        }
                    }}
                />
            </div>
            <div className="column has-text-centered is-hidden-desktop">
                <UserProfilePreferencesPlasmic
                    creatorpref={uiState.creatorpref}
                    art={{
                        selected: uiState.artselect,
                        onClick: () => {
                            if (uiState.artselect) {
                                console.log("slice")
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        artselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Art")))
                            } else {
                                console.log("push")
                                console.log(typeof componentState.profile)
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        artselect: true
                                    }
                                })
                                setPreference([...preference, "Art"])
                            }
                        }
                    }}

                    music={{
                        selected: uiState.musicselect,
                        onClick: () => {
                            if (uiState.musicselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        musicselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Music")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        musicselect: true
                                    }
                                })
                                setPreference([...preference, "Music"])
                            }
                        }
                    }}

                    dance={{
                        selected: uiState.danceselect,
                        onClick: () => {
                            if (uiState.danceselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        danceselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Dance")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        danceselect: true
                                    }
                                })
                                setPreference([...preference, "Dance"])
                            }
                        }
                    }}

                    sports={{
                        selected: uiState.sportsselect,
                        onClick: () => {
                            if (uiState.sportsselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        sportsselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Sports")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        sportsselect: true
                                    }
                                })
                                setPreference([...preference, "Sports"])
                            }
                        }
                    }}

                    gaming={{
                        selected: uiState.gamingselect,
                        onClick: () => {
                            if (uiState.gamingselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        gamingselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Gaming")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        gamingselect: true
                                    }
                                })
                                setPreference([...preference, "Gaming"])
                            }
                        }
                    }}

                    skits={{
                        selected: uiState.skitsselect,
                        onClick: () => {
                            if (uiState.skitsselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        skitsselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Skits")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        skitsselect: true
                                    }
                                })
                                setPreference([...preference, "Skits"])
                            }
                        }
                    }}

                    food={{
                        selected: uiState.foodselect,
                        onClick: () => {
                            if (uiState.foodselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        foodselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Food")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: false,
                                        foodselect: true
                                    }
                                })
                                setPreference([...preference, "Food"])
                            }
                        }
                    }}

                    influencers={{
                        selected: uiState.influencersselect,
                        onClick: () => {
                            if (uiState.influencersselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: true,
                                        influencersselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Influencers")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: true,
                                        influencersselect: true
                                    }
                                })
                                setPreference([...preference, "Influencers"])
                            }
                        }
                    }}

                    blogger={{
                        selected: uiState.bloggerselect,
                        onClick: () => {
                            if (uiState.bloggerselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: true,
                                        bloggerselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Blogger")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: true,
                                        bloggerselect: true
                                    }
                                })
                                setPreference([...preference, "Blogger"])
                            }
                        }
                    }}

                    celebrity={{
                        selected: uiState.celebrityselect,
                        onClick: () => {
                            if (uiState.celebrityselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: true,
                                        celebrityselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Celebrity")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: true,
                                        celebrityselect: true
                                    }
                                })
                                setPreference([...preference, "Celebrity"])
                            }
                        }
                    }}

                    youngstars={{
                        selected: uiState.youngstarsselect,
                        onClick: () => {
                            if (uiState.youngstarsselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: true,
                                        youngstarsselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Young Stars")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: true,
                                        youngstarsselect: true
                                    }
                                })
                                setPreference([...preference, "Young Stars"])
                            }
                        }
                    }}

                    comets={{
                        selected: uiState.cometsselect,
                        onClick: () => {
                            if (uiState.cometsselect) {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: true,
                                        cometsselect: false
                                    }
                                })
                                setPreference(preference.filter((e) => (e !== "Comets")))
                            } else {
                                setUiState(prevState => {
                                    return {
                                        ...prevState,
                                        creatorpref: true,
                                        cometsselect: true
                                    }
                                })
                                setPreference([...preference, "Comets"])
                            }
                        }
                    }}

                    nextprefbutton={{
                        children: "Next",
                        onClick: () => {
                            if (preference.length !== 0) {
                                props.setUserData({
                                    preferences: { preferences: preference }
                                })
                                navigate('/')
                            } else {
                                alert("Please select atleast 1 option")
                            }
                            // console.log(preference)
                            // if(props.user.get('profile').profile === "Investor") {
                            //     navigate('/basickyc')
                            // } else if (props.user.get('profile').profile === "Fan") {

                            // }
                            // call the backend function here to send the email with the verification link to the user
                            // axios.post/get('').then(function (response, error) {
                            //     if(response){
                            //         perform some action and then navigaate to email verification prompt
                            //         navigate('/emailverification')
                            //     }
                            // })
                            // setUiState(prevState => {
                            //     return {
                            //         ...prevState,
                            //         creatorpref: true
                            //     }
                            // })
                        }
                    }}
                    submitprefbutton={{
                        children: "Submit",
                        onClick: () => {
                            if (preference.length !== 0) {
                                props.setUserData({
                                    preferences: { preferences: preference }
                                })
                                navigate('/basickyc')
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default UserProfilePreferences;