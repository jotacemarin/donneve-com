import Layout from "../../components/Layout";
import "./styles.scss";

export const App = () => (
  <Layout>
    <div className="has-text-centered">
      <div className="column is-6 is-offset-3">
        <h1 className="title">Find by Tags</h1>
        <div className="box">
          <div className="field is-grouped">
            <p className="control is-expanded">
              <input
                className="input"
                type="text"
                placeholder="Put your tags"
                disabled
              />
            </p>
            <p className="control">
              <button className="button is-info" disabled>
                Search
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export default App;
