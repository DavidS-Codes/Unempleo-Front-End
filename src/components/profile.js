import React from "react";
import ProfileNonEdit from "./profile-non-edit";
import ProfileEdit from "./profile-edit";

// function Profile() {
class Profile extends React.Component {

  render() {
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get('edit');
    if (name) {
        return <ProfileEdit></ProfileEdit>;
    }else{
        return <ProfileNonEdit></ProfileNonEdit>;
    }
    
  }
}

export default Profile;
