const axios = require('axios');
const cheerio = require('cheerio');

const fetchEvents = async () => {
  const response = await axios.get('https://infosec-conferences.com/');
  const $ = cheerio.load(response.data);

  let events = [];
  $('.conference-item').each((i, el) => {
    const title = $(el).find('.title').text();
    const date = $(el).find('.date').text(); // Make sure to format this date correctly
    const description = $(el).find('.description').text();

    events.push({ title, date, description });
  });

  return events;
};

const uploadToFirebase = async (events) => {
  const eventsCollection = collection(firestore, 'events');
  for (const event of events) {
    await addDoc(eventsCollection, event); // Upload each event to Firebase
  }
  console.log('Events uploaded to Firebase');
};

// Fetch and upload
fetchEvents().then(uploadToFirebase);
