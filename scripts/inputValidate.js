import Inputmask from 'inputmask';
import JustValidate from 'just-validate';
import { Notification } from './notification';
import { sendData } from './api';

const notification = Notification.getInstance();
const eventButtonReserve = document.querySelector('.event__button_reserve');
const eventButtonEdit = document.querySelector('.event__button_edit');

export const formValidate = (
  bookingForm,
  bookingInputFullname,
  bookingInputPhone,
  bookingInputTicket,
  changeSection,
  bookingComediansList) => {

  new Inputmask('+7-(999)-999-99-99').mask(bookingInputPhone);
  new Inputmask('9999-9999').mask(bookingInputTicket);

  const validate = new JustValidate(bookingForm, {
    errorFieldCssClass: 'booking__input_invalid',
    successFieldCssClass: 'booking__input_valid',
  });

  validate
    .addField(bookingInputFullname, [
      {
        rule: 'required',
        errorMessage: 'Заполните имя'
      }
    ])
    .addField(bookingInputPhone, [
      {
        rule: 'required',
        errorMessage: 'Заполните номер телефона'
      },
      {
        validator() {
          const phone = bookingInputPhone.inputmask.unmaskedvalue();
          return phone.length === 10;
        },
        errorMessage: 'Некорректный телефон'
      }
    ])
    .addField(bookingInputTicket, [
      {
        rule: 'required',
        errorMessage: 'Заполните номер билета'
      },
      {
        validator() {
          const ticket = bookingInputTicket.inputmask.unmaskedvalue();
          return ticket.length === 8;
        },
        errorMessage: 'Заполните номер билета полностью'
      }
    ]).onFail((fields) => {
      let errorMessage = '';
      for (const key in fields) {
        if (!Object.hasOwnProperty.call(fields, key)) {
          continue;
        }

        const element = fields[key];
        if (!element.isValid) {
          errorMessage += `${element.errorMessage}, `;
        }
      }

      notification.show(errorMessage.slice(0, -2), false);
    });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validate.isValid) {
      return;
    }

    const data = { booking: [] };
    const times = new Set();


    new FormData(bookingForm).forEach((value, field) => {
      if (field === 'booking') {
        const [comedian, time] = value.split(",");

        if (comedian && time) {
          data.booking.push({ comedian, time });
          times.add(time);
          notification.show('Бронь принята', true);
        }
      } else {
        data[field] = value;
      }
    });

    if (times.size !== data.booking.length) {
      notification.show('Упс, а ты точно сможешь быть в нескольких местах одновременно?', false);
      return
    }

    if (!times.size) {
      notification.show('Вы не выбрали комика и/или время', false);
      return
    }

    const method = bookingForm.getAttribute('method');

    let isSent = false;

    if (method === 'PATCH') {
      isSent = await sendData(method, data, data.ticketNumber);
    } else {
      isSent = await sendData(method, data);
    }

    if (isSent) {
      notification.show('Бронь принята', true);
      changeSection();
      eventButtonReserve.classList.remove('event__button_hidden');
      eventButtonEdit.classList.remove('event__button_hidden');
      bookingForm.reset();
      bookingComediansList.textContent = '';
    }
  }


  bookingForm.addEventListener('submit', submitHandler);
}