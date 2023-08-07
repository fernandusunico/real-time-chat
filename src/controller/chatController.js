const chatService = require("../service/chatService");

async function getUsersWithLatestMessages(req, res) {
  const excludedUserId = req.decoded.user_id;

  const result = await chatService.getUsersWithLatestMessages(excludedUserId);

  if (result.success) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json(result);
  }
}

async function sendMessage(req, res) {
  const { message_body, receiver_id, conversation_id } = req.body;
  const senderId = req.decoded.user_id;

  const result = await chatService.sendMessage(
    { message_body, receiver_id, conversation_id },
    senderId
  );

  if (result.success) {
    return res.status(200).json(result.message);
  } else {
    return res.status(400).json(result.message);
  }
}

async function getChat(req, res) {
  const userId = req.decoded.user_id;
  const otherUserId = req.params.id;

  const result = await chatService.getChatMessages(userId, otherUserId);

  if (result.success) {
    return res.status(200).json(result.message);
  } else {
    return res.status(400).json(result.message);
  }
}

async function sendGroupMessages(req, res) {
  const messageData = {
    message_body: req.body.message_body,
    receiver_ids: req.body.receiver_ids,
  };
  const senderId = req.decoded.user_id;

  const result = await chatService.sendGroupMessages(messageData, senderId);

  if (result.success) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json(result);
  }
}

async function getMyMessages(req, res) {
  const userId = req.decoded.user_id;

  const result = await chatService.getMyMessages(userId);

  if (result.success) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json(result);
  }
}

module.exports = {
  getUsersWithLatestMessages,
  sendMessage,
  getChat,
  sendGroupMessages,
  getMyMessages,
};
