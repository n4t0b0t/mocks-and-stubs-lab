const processPayments = require("../src/main");
const generateQueue = require("../src/queueService");
const paymentService = require("../src/paymentService");

beforeEach(() => {
  jest.resetAllMocks();
});

jest.mock("../src/queueService");
const makePaymentSpy = jest.spyOn(paymentService, "makePayment");
const refundPaymentSpy = jest.spyOn(paymentService, "refundPayment");

test("does not call makePayment or refundPayment when paymentQueue is empty", () => {
  generateQueue.mockImplementation(() => []);
  let paymentResults = processPayments();
  expect(makePaymentSpy).toHaveBeenCalledTimes(0);
  expect(refundPaymentSpy).toHaveBeenCalledTimes(0);
});

test("calls makePayment when next item in paymentQueue is positive", () => {
  generateQueue.mockImplementation(() => [10]);
  let paymentResults = processPayments();
  expect(makePaymentSpy).toHaveBeenCalledTimes(1);
  expect(refundPaymentSpy).toHaveBeenCalledTimes(0);
});

test("calls refundPayment when next item in paymentQueue is negative", () => {
  generateQueue.mockImplementation(() => [-10]);
  const paymentResults = processPayments();
  expect(makePaymentSpy).toHaveBeenCalledTimes(0);
  expect(refundPaymentSpy).toHaveBeenCalledTimes(1);
});
