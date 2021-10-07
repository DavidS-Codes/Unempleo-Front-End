import Layout from "../components/layout";
import LayoutUserLogged from "../components/layout-user-logged"
import Offers from "../components/offers";

const OffersPage = () =>{
  return <Layout>
  <LayoutUserLogged>
      <Offers></Offers>
  </LayoutUserLogged>
</Layout>
}

export default OffersPage;