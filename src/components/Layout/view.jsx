import Navbar from "../../components/Navbar";

export const Layout = ({ children, buttons = [] }) => (
  <section className="hero is-info is-fullheight">
    <Navbar buttons={buttons} />

    <div className="hero-body pt-0">
      <div className="container">{children}</div>
    </div>
  </section>
);

export default Layout;
