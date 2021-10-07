  
import Link from "next/link";
import { offersData } from "../data";


console.log(offersData)
const Offers = () => {
  return (
    <>
        {
        offersData.map((offer,i) => (
                <div className="row m-5 border border-dark" key={i}>
                    <div className="col-md-2">
                    <img src="usuario.png" className="img-fluid img-thumbnail rounded-circle mb-2 mt-2 position-relative"  width="250vw" alt="..." />
                    </div>
                    <div className="col-md-10">
                        <div className="row ml-2 mt-5">
                            <p className="font-weight-bold">{offer.oferta}</p>
                        </div>
                        <div className="row ml-2">
                            <p> {offer.ubicacion}</p>
                        </div>
                        <div className="row ml-2">
                            <p> {offer.tipo_contrato}</p>
                        </div>
                    </div>
                </div>
            ))
        }
           
            
        
    </>
    );
};



// export async function getStaticProps() {

//     return {
//         props: {
//             offersDataJSON: offersData,
//         },
//       }
    
//   }

export default Offers;