import mockAxios from "axios";
import { getApiKey, setTags } from "./donneve";

describe("Fetch getApiKey respond successful", () => {
  const mockResponse = { apiKey: ["test", "1234"] };

  beforeEach(() => {
    mockAxios.post.mockImplementation(() =>
      Promise.resolve({ data: mockResponse })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Fetch getApiKey", async () => {
    const response = await getApiKey();
    expect(response).toEqual("test-1234");
  });
});

describe("Fetch getApiKey respond reject", () => {
  beforeEach(() => {
    mockAxios.post.mockImplementation(() =>
      Promise.reject({ response: { data: { error: "Test" } } })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Fetch getApiKey", async () => {
    let responseError = null;

    try {
      responseError = await getApiKey();
    } catch (error) {
      responseError = error.message;
    }

    expect(responseError).toEqual("Test, request failed");
  });
});

describe("fetch setTags respond successful", () => {
  const mockResponse = "test";

  beforeEach(() => {
    mockAxios.post.mockImplementation(() =>
      Promise.resolve({ data: mockResponse })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("fetch setTags", async () => {
    const response = await setTags();
    expect(response).toEqual(mockResponse);
  });
});
