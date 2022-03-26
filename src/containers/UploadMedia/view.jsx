import { useEffect, useState } from "react";
import classNames from "classnames";
import ReactCodeInput from "react-code-input";
import Layout from "../../components/Layout";
import FileInput from "../../components/FileInput";
import TagInput from "../../components/TagInput";
import Notification from "../../components/Notification";
import { useSize, useUploadMedia, useGetApiKey } from "../../hooks";
import "./styles.scss";

export const UploadMedia = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [code, setCode] = useState("");
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

  useEffect(() => {
    setIsMobile(width < 500);
  }, [width, setIsMobile]);

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
    if (!file) {
      return null;
    }

    if (dataGetCode) {
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

    return (
      <>
        <div className="mt-1">
          <ReactCodeInput
            type="text"
            fields={6}
            onChange={(value) => setCode(value)}
          />
        </div>
        <div className="notification is-link is-light mt-1">
          <span className="icon">
            <i className="fa fa-info-circle" aria-hidden="true" />
          </span>
          Tell to <strong>botnorrea</strong> to get a code.
        </div>
        <button
          className="button is-fullwidth mt-1 is-warning"
          onClick={getApiKey}
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

  return (
    <div className="is-relative">
      <Layout>
        <div
          className={classNames({
            "has-text-centered": true,
            "fix-upload-media": isMobile,
          })}
        >
          <div className="column is-6 is-offset-3">
            <h1 className="title">Upload image</h1>

            <div className="box">
              <FileInput onChange={setFile} file={file} />
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

export default UploadMedia;