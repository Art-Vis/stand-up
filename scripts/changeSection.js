import { createComedianBlock } from "./createComedianBlock.js";

const bookingComediansList = document.querySelector('.booking__comedians-list');

export const initChangeSection = (bookingForm,
  event,
  booking,
  eventButtonReserve,
  eventButtonEdit,
  bookingTitle,
  comedians) => {
  eventButtonReserve.classList.remove('event__button_hidden');
  eventButtonEdit.classList.remove('event__button_hidden');

  const changeSection = () => {
    event.classList.toggle('event__hidden');
    booking.classList.toggle('booking__hidden');

    if (!booking.classList.contains('booking__hidden')) {
      const comedianBlock = createComedianBlock(comedians);
      bookingComediansList.append(comedianBlock);
    }
  };

  eventButtonReserve.addEventListener('click', () => {
    changeSection();
    eventButtonReserve.classList.add('event__button_hidden');
    eventButtonEdit.classList.add('event__button_hidden');
    bookingTitle.textContent = 'Забронируйте место в зале';
    bookingForm.method = 'POST';
  });

  eventButtonEdit.addEventListener('click', () => {
    changeSection();
    eventButtonReserve.classList.add('event__button_hidden');
    eventButtonEdit.classList.add('event__button_hidden');
    bookingTitle.textContent = 'Редактирование брони';
    bookingForm.method = 'PATCH';
  });

  return changeSection;
}