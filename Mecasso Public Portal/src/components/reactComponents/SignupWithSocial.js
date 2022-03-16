import React, { useState, useEffect }from "react";
import { useMoralis} from "react-moralis";

import config from '../../config'

function SignUpwithSocial({username, email, social}) {

    const {signup,hasAuthError,auth,user} = useMoralis();

    var userpassword = "XXXXXX";
    var id = social+'-'+username;

    useEffect(() => {
        signup(id, userpassword, email)
    },[])

    useEffect(() => {
        // console.log("useeffect execs")
        // console.log("auth state", auth.state)
        // console.log("auth", auth)
        // console.log('Auth Error', hasAuthError)
        // console.log('User', user)
        if (auth.state === "authenticated") {
            window.open(config.domain + '/', '_self')
            return null
        }
        //console.log("Auth Specific Error", auth.error.code)
        if (auth.error != null) {
            return (auth.error)
        }
    }, [auth])

}

export default SignUpwithSocial;