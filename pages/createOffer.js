import Layout from "../components/layout";
import LayoutUserLogged from "../components/layout-user-logged"
import CreateOffer from "../components/create-offer";

const CreateOfferPage = () =>{
  return <Layout>
    <LayoutUserLogged>
        <CreateOffer></CreateOffer>
    </LayoutUserLogged>
  </Layout>
}

export default CreateOfferPage;