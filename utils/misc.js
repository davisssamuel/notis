import contactsData from "../data/contacts.json"

export function getContactFromKey(key) {
  for(let contact of contactsData) {
    if (contact.id == key) {
      return contact
    }
  }
}

export function formatUnixTimestamp(timestamp) {
  // Convert Unix timestamp to milliseconds
  const milliseconds = timestamp * 1000;

  // Create a new Date object
  const date = new Date(milliseconds);

  // Define month names
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Get individual date components
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  const period = hours >= 12 ? 'pm' : 'am';

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Construct the formatted date string
  const formattedDate = `${month} ${day}, ${year} | ${hours}:${minutes}${period}`;

  return formattedDate;
}