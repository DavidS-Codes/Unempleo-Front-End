import Layout from "../components/layout";
import LayoutUserLogged from "../components/layout-user-logged"
import ChangePassword from "../components/change-password";

const changePasswordPage = () =>{
  return <Layout>
    <LayoutUserLogged>
        <ChangePassword></ChangePassword>
    </LayoutUserLogged>
  </Layout>
}

export default changePasswordPage;