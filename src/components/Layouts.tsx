import Footer from "../containers/Footer";
import Header from "../containers/Header";
import { ILayoutProps } from "../interface/Interfaces";

const Layouts: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layouts;
