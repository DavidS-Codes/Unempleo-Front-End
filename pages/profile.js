import Layout from "../components/layout";
import LayoutUserLogged from "../components/layout-user-logged"
import Profile from "../components/profile";

const ProfilePage = () =>{
  return <Layout>
  <LayoutUserLogged>
      <Profile></Profile>
  </LayoutUserLogged>
</Layout>
}

export default ProfilePage;