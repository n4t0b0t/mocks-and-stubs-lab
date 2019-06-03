const math = require("mathjs");
const generateQueue = require("../src/queueService");

beforeEach(() => {
  jest.resetAllMocks();
});

const randomMock = jest.spyOn(math, "randomInt");

it("should return an array length of 5", () => {
  randomMock.mockImplementationOnce(() => 5);
  let newQueue = generateQueue();
  expect(randomMock).toBeCalledTimes(6);
  expect(newQueue.length).toEqual(5);
});

it("should return an array length of 3 with all elements of 3", () => {
  randomMock.mockImplementation(() => 3);
  let newQueue = generateQueue();
  expect(randomMock).toBeCalledTimes(4);
  expect(newQueue).toEqual([3, 3, 3]);
});
