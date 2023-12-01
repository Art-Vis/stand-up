export const displayClientInfo = (parent, data) => {
  const clientItemName = document.createElement('p');
  clientItemName.classList.add('booking__client-item');
  clientItemName.innerHTML = `Имя: ${data.fullName}`;

  const clientItemPhone = document.createElement('p');
  clientItemPhone.classList.add('booking__client-item');
  clientItemPhone.innerHTML = `Телефон: ${data.phone}`;

  const clientItemTicketNumber = document.createElement('p');
  clientItemTicketNumber.classList.add('booking__client-item');
  clientItemTicketNumber.innerHTML = `Номер билета: ${data.ticketNumber}`;

  parent.append(clientItemName, clientItemPhone, clientItemTicketNumber);
};

export const displayBooking = (parent, clientData, comediansData) => {
  const bookingList = document.createElement('ul');
  bookingList.classList.add('booking__list');

  const bookingComedians = clientData.booking.map(bookingComedian => {
    const comedian = comediansData.find(item => item.id === bookingComedian.comedian);

    const performances = comedian.performances.find(item => bookingComedian.time === item.time);

    return {
      comedian,
      performances
    };
  });

  bookingComedians.sort((a,b) => a.performances.time.localeCompare(b.performances.time));
  
  const comedianElements = bookingComedians.map(({comedian, performances}) => {
    const comedianElement = document.createElement('li');
    comedianElement.classList.add('booking__item');
    comedianElement.innerHTML = `
    <h3>${comedian.comedian}</h3>
    <p>Время: ${performances.time}</p>
    <button class="booking__hall" type="button" 
    data-booking="${clientData.fullName} ${clientData.ticketNumber} ${comedian.comedian} ${performances.time} ${performances.hall}">
    Номер зала: ${performances.hall}</button>
    `;

    return comedianElement;
  });
  bookingList.append(...comedianElements);
  parent.append(bookingList);
};