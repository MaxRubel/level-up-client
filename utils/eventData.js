import { clientCredentials } from './client';

const endpoint = clientCredentials.databaseURL;

const getEvents = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createEvent = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const leaveEvent = (eventId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events/${eventId}/leave`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const eventSignUp = (eventId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events/${eventId}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateEvent = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(() => resolve())
    .catch(reject);
});

const deleteEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => resolve())
    .catch(reject);
});

export {
  getEvents,
  createEvent,
  getSingleEvent,
  updateEvent,
  deleteEvent,
  eventSignUp,
  leaveEvent,
};
