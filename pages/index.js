import Layout from "../components/layout";
import link from "next/link";

const Index = () =>{
  return <Layout>
    <div className="container">
      <h1>Funciona</h1>
      <table className="table table-striped table-inverse table-responsive">
        <thead className="thead-inverse">
          <tr>
            <th>a</th>
            <th>a</th>
            <th>a</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">a</td>
              <td>a</td>
              <td>a</td>
            </tr>
            <tr>
              <td scope="row">a</td>
              <td>a</td>
              <td>a</td>
            </tr>
          </tbody>
      </table>
    </div>
  </Layout>
}

export default Index;