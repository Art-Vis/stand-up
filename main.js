import './style.css';
import { getComedians } from './scripts/api.js';
import { formValidate } from './scripts/inputValidate.js';
import { initChangeSection } from './scripts/changeSection.js';

const bookingComediansList = document.querySelector('.booking__comedians-list');
const bookingForm = document.querySelector('.booking__form');
const bookingInputFullname = document.querySelector('.booking__input_fullname');
const bookingInputPhone = document.querySelector('.booking__input_phone');
const bookingInputTicket = document.querySelector('.booking__input_ticket');


const init = async () => {
  const countComedians = document.querySelector('.event__info-item_comedians .event__info-number');

  const comedians = await getComedians();

  const event = document.querySelector('.event');
  const booking = document.querySelector('.booking');
  const eventButtonReserve = document.querySelector('.event__button_reserve');
  const eventButtonEdit = document.querySelector('.event__button_edit');
  const bookingTitle = document.querySelector('.booking__title');

  if (comedians) {
    countComedians.textContent = comedians.length;

    const changeSection = initChangeSection(
      bookingForm,
      event,
      booking,
      eventButtonReserve,
      eventButtonEdit,
      bookingTitle,
      comedians,
      bookingComediansList
      );

    formValidate(
      bookingForm,
      bookingInputFullname,
      bookingInputPhone,
      bookingInputTicket,
      changeSection,
      bookingComediansList,
      );
  }
};

init();