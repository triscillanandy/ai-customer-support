// ticketUtils.js
export const TICKET_STORAGE_KEY = 'support_tickets';

// Generate a unique ticket ID based on existing tickets
export const generateTicketId = (existingTickets) => {
  const highestId = existingTickets.reduce((max, ticket) => {
    const idNum = parseInt(ticket.id.replace('TKT-', ''));
    return idNum > max ? idNum : max;
  }, 1000);
  
  return `TKT-${highestId + 1}`;
};

// Get all tickets from storage
export const getStoredTickets = () => {
  try {
    const tickets = localStorage.getItem(TICKET_STORAGE_KEY);
    return tickets ? JSON.parse(tickets) : [];
  } catch (error) {
    console.error('Error reading tickets from storage:', error);
    return [];
  }
};

// Save tickets to storage
export const saveTicketsToStorage = (tickets) => {
  try {
    localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(tickets));
  } catch (error) {
    console.error('Error saving tickets to storage:', error);
  }
};

// Create a new ticket
export const createNewTicket = (ticketData) => {
  const existingTickets = getStoredTickets();
  const newId = generateTicketId(existingTickets);
  
  const newTicket = {
    id: newId,
    subject: ticketData.subject,
    customer: ticketData.customer,
    email: ticketData.email,
    status: 'open',
    priority: ticketData.priority || 'Medium',
    lastUpdated: 'Just now',
    createdAt: new Date().toISOString(),
    issueType: ticketData.issueType,
    orderNumber: ticketData.orderNumber,
    description: ticketData.description
  };
  
  const updatedTickets = [...existingTickets, newTicket];
  saveTicketsToStorage(updatedTickets);
  
  return newTicket;
};