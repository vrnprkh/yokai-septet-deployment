let messages = {}; 

const addMessage = (roomId, message) => {
  if (!messages[roomId]) {
    messages[roomId] = [];
  }
  messages[roomId].push(message);
};

const getMessages = (roomId) => {
  return messages[roomId] || [];
};

module.exports = { addMessage, getMessages };