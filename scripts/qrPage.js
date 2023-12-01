import { getClient, getComedians } from "./api.js";
import { displayBooking, displayClientInfo } from "./display.js";
import { Notification } from "./notification";
import { showQRController } from "./showQrController.js";

const getTicketNumber = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('t');
}

const notification = Notification.getInstance();

export const initQrPage = async () => {
  const clientInfo = document.querySelector('.booking__client-info');
  const bookingPerformances = document.querySelector('.booking__performances');

  const ticketNumber = getTicketNumber();
  console.log('ticketNumber: ', ticketNumber);

  if (ticketNumber) {
    const clientData = await getClient(ticketNumber);
    displayClientInfo(clientInfo,clientData);

    const comediansData = await getComedians(ticketNumber);
    displayBooking(bookingPerformances, clientData, comediansData);

    showQRController(bookingPerformances);
  } else {
    notification.show('Произошла ошибка, проверьте ссылку!');
  }
};