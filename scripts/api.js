import { Notification } from './notification.js';

const URL = 'https://quark-amber-worm.glitch.me/'; //GLITCH
const notification = Notification.getInstance();

export const getComedians = async () => {
  try {
    const response = await fetch(`${URL}comedians`);
    const data = await response.json();
    if (!response.ok) {
      console.log('response.ok: ', response);
    }
    return data;
  } catch (error) {
    console.log('error: ', error);
    notification.show('Возникла ошибка сервера, попробуйте позже', false);
  }
}

export const getClient = async (ticketNumber) => {
  try {
    const response = await fetch(`${URL}clients/${ticketNumber}`);
    const data = await response.json();
    if (!response.ok) {
      console.log('response.ok: ', response);
    }
    return data;
  } catch (error) {
    console.log('error: ', error);
    notification.show('Возникла ошибка сервера, попробуйте позже', false);
  }
};

export const sendData = async (method, data, id) => {
  try {
    const response = await fetch(`${URL}clients${id ? `/${id}` : ''}`, {
      method,
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.log('response.ok: ', response);
    }
    return true;
  } catch (error) {
    console.log('error: ', error);
    notification.show('Возникла ошибка сервера, попробуйте позже', false);
    return false;
  }
}