import React from 'react';
import Doggo from '../../assets/cutest-dog-breeds.png';
import Sad1 from '../../assets/Sad1.png';
import '../css/login.css';

const LoginPage = () => {
  return (
    <div>
      <div id="dogimg">
        <img id='homeImg' src={Doggo} style={{width: '500px'}}/> 
      </div>
      {/* <div id="Sad1">
        <img src={Sad1}/>
      </div> */}
      <br/>
      <h1 className="welcome">Welcome to Furever Homes!</h1>
      <h2 className="welcome">Click below to sign in with your Google Account</h2>
      <br/>
      <div id="g_id_onload"
        data-client_id="621603274171-mpqneceklaln0dmippg8tc82bj2e70no.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleCred"
        data-auto_prompt="false">
    </div>
    <div className="g_id_signin googlebtn"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left">
    </div>
    <br/>
    <h4 className="welcome">Find the dog that holds the corg-key to your heart!</h4>

  </div>
  )
};

export default LoginPage;