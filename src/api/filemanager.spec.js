import mockAxios from "axios";
import { gdl, uploadFile } from "./filemanager";

describe("Execute gdl function", () => {
  test("Should retrieve a google drive url", () => {
    const remoteId = "test-1234";
    const url = gdl(remoteId);
    expect(url).toMatch(remoteId);
  });
});

describe("Fetch uploadFile respond successful", () => {
  const OLD_ENV = process.env;
  const remoteId = "test-image";

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };

    mockAxios.post.mockImplementation(() =>
      Promise.resolve({ data: { remoteId } })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test("Fetch uploadFile", async () => {
    process.env.REACT_APP_ENV = "pro";
    const response = await uploadFile({}, "test");
    expect(response).toEqual(remoteId);
  });
});
