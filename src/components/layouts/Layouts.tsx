import Footer from "./Footer";
import Header from "./Header";

interface ILayoutProps {
  children?: React.ReactNode;
  title?: string;
}

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
