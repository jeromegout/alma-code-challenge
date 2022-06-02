import { Payment } from "./types/Payment";

const BASE_API_URL = "https://cloudrun-frontend-recruitment-test-5hhyjiivra-ew.a.run.app";

const paymentSorter = (a: Payment, b: Payment): number => a.created - b.created;

const getMerchantPaymentsOnly = (merchant: string, data: Payment[]): Payment[] => {
  return data.filter((datum) => datum.merchant.name === merchant).sort(paymentSorter);
};

export const getAllPayments = (merchant: string): Promise<Payment[]> => {
  return fetch(BASE_API_URL + "/payments", {
    method: "GET",
    headers: { accept: "application/json" },
  }).then((response) => {
    if (response.status === 200) {
      return response.json().then((data) => getMerchantPaymentsOnly(merchant, data));
    } else return Promise.reject("Sorry, something went wrong");
  });
};

export const getPayment = (id: string): Promise<Payment> => {
  return fetch(`${BASE_API_URL}/payments/${id}`, {
    method: "GET",
    headers: { accept: "application/json" },
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else return Promise.reject("Sorry, something went wrong");
  });
};
