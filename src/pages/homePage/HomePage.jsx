import { ToastContainer } from "react-toastify";
import StepForm from "../../component/stepForm/StepForm";
import Layout from "../../layout/Layout";

const HomePage = () => {
    return (
        <div>
          <Layout>
           <div className="container">
           <h2 className="mt-28 text-center text-xl">Please fill up the following form...</h2>
           </div>
          <StepForm />  
          </Layout>
          <ToastContainer/>
        </div>
    );
};

export default HomePage;