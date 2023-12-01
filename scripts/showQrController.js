import QRCode from "qrcode"
import { Notification } from "./notification";

const notification = Notification.getInstance();

const displayQRCode = (data) => {
  let error = false;
  const modal = document.querySelector('.modal');
  const canvas = document.getElementById('qrCanvas');
  const closeBtn = document.querySelector('.modal__close');

  QRCode.toCanvas(canvas, data, (err) => {
    if (err) {
      error = true;
      console.error(err);
    }
    console.log('QRCode создан');
  });

  if (error) {
    notification.show('Возникла ошибка');
    return;
  }

  modal.classList.add('modal_show');

  window.addEventListener('click', ({target}) => {
    if (target === closeBtn || target === modal) {
      modal.classList.remove('modal_show');
      canvas.getContext('2d').clearRect(0,0,canvas.width, canvas.height);
    }
  });
}

export const showQRController = (bookingPerformances) => {
  bookingPerformances.addEventListener('click', ({ target }) => {
    if (target.closest('.booking__hall')) {
      const bookingData = target.dataset.booking;
      displayQRCode(bookingData);
    }
  });
};
