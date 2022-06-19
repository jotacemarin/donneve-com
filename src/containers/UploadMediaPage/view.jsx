import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { parse as qsParse } from "query-string";
import classNames from "classnames";
import ReactCodeInput from "react-code-input";
import Layout from "../../components/Layout";
import FileInput from "../../components/FileInput";
import TagInput from "../../components/TagInput";
import Notification from "../../components/Notification";
import { useSize, useUploadMedia, useGetApiKey } from "../../hooks";
import * as session from "../../utils/sessionStorage";
import { PATH_DASHBOARD } from "../../utils/routes";
import "./styles.scss";

const USER = "user";

export const UploadMediaPage = () => {
  const { search } = useLocation();
  const { token } = qsParse(search);
  const [isMobile, setIsMobile] = useState(false);
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [code, setCode] = useState(token ? token : "");
  const { width } = useSize();
  const {
    data: dataGetCode,
    error: errorGetCode,
    loading: loadingGetCode,
    refetch: fetchGetCode,
    clear: clearGetCode,
  } = useGetApiKey();
  const {
    data: dataUploadMedia,
    error: errorUploadMedia,
    loading: loadingUploadMedia,
    refetch: fetchUploadMedia,
    clear: clearUploadMedia,
  } = useUploadMedia();
  const sessionUser = session.getItem(USER);

  const clearEvents = (partial = false) => {
    if (partial) {
      setFile(null);
    }
    setTags([]);
    setCode("");
    clearGetCode();
    clearUploadMedia();
  };

  const submit = async () => {
    if (dataGetCode) {
      await fetchUploadMedia(dataGetCode, file, tags);
    }
  };

  const getApiKey = async () => {
    await fetchGetCode(code);
  };

  useEffect(() => {
    setIsMobile(width < 500);
  }, [width, setIsMobile]);

  useEffect(() => {
    if (token && code) {
      async function _getApiKey() {
        await getApiKey();
      }

      _getApiKey();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, code]);

  const renderFileInput = () => {
    if (dataGetCode) {
      return <FileInput onChange={setFile} file={file} />;
    }

    return null;
  };

  const renderTagInput = () => {
    if (!file || !dataGetCode) {
      return null;
    }

    return (
      <TagInput
        onChange={setTags}
        disabled={loadingGetCode || loadingUploadMedia}
      />
    );
  };

  const renderButton = () => {
    if (file && dataGetCode) {
      return (
        <button
          className="button is-fullwidth mt-1 is-info"
          onClick={submit}
          disabled={loadingGetCode || loadingUploadMedia}
        >
          Upload
        </button>
      );
    }

    if (!file && dataGetCode) {
      return null;
    }

    return (
      <>
        <div className="mt-1">
          <ReactCodeInput
            type="text"
            fields={6}
            onChange={(value) => setCode(value)}
            value={code}
          />
        </div>
        <div className="notification is-link is-light mt-1">
          <span className="icon">
            <i className="fa fa-info-circle" aria-hidden="true" />
          </span>
          Chat with <strong>botnorrea</strong> to get a code.
        </div>
        <button
          className="button is-fullwidth mt-1 is-warning"
          onClick={getApiKey}
          disabled={!code}
        >
          Validate code
        </button>
      </>
    );
  };

  const renderLoader = () => {
    const someIsLoading = [loadingGetCode, loadingUploadMedia].some((loader) =>
      Boolean(loader)
    );

    if (someIsLoading) {
      return (
        <progress className="progress is-small is-primary mt-2" max="100">
          15%
        </progress>
      );
    }

    return null;
  };

  const renderNotification = () => {
    const hasErrors = [errorGetCode, errorUploadMedia].some((error) =>
      Boolean(error)
    );
    const hasEvents = [errorGetCode, errorUploadMedia, dataUploadMedia].some(
      (event) => Boolean(event)
    );

    const close = () => clearEvents(Boolean(dataUploadMedia));

    return (
      <Notification
        isError={hasErrors}
        isSuccess={dataUploadMedia}
        visible={hasEvents}
        close={close}
        onTimeout={close}
      >
        {errorGetCode && `${errorGetCode}`}
        {errorUploadMedia && `${errorUploadMedia}`}
        {dataUploadMedia && "Media was uploaded successful"}
      </Notification>
    );
  };

  const buttons = [
    {
      enabled: Boolean(sessionUser),
      key: "manage-commands",
      className: "button is-white is-outlined",
      to: PATH_DASHBOARD,
      icon: "far fa-window-maximize",
      label: "Dashboard",
    },
    {
      enabled: true,
      key: "steam-external",
      className: "button is-white is-outlined",
      href: "https://steamcommunity.com/groups/e-bolastrike",
      icon: "fab fa-steam",
      label: "Steam group",
    },
  ];

  return (
    <div className="is-relative">
      <Layout buttons={buttons.filter(({ enabled }) => enabled)}>
        <div
          className={classNames({
            "has-text-centered": true,
            "fix-upload-media": isMobile,
          })}
        >
          <div
            className={classNames({
              "column is-6 is-offset-3": true,
              "px-0": isMobile,
            })}
          >
            <h1 className="title">Upload image</h1>

            <div className="box">
              {renderFileInput()}
              {renderTagInput()}
              {renderButton()}
              {renderLoader()}
            </div>
          </div>
        </div>
      </Layout>
      {renderNotification()}
    </div>
  );
};

export default UploadMediaPage;
