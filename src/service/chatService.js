const models = require("../../models");

async function getUsersWithLatestMessages(excludedUserId) {
  try {
    const users = await models.users.findAll({
      where: { id: { $ne: excludedUserId } },
      include: [
        {
          model: models.messages,
          as: "userMessages",
          order: [["id", "DESC"]],
          limit: 1,
        },
      ],
      order: [["id", "DESC"]],
    });

    return { success: true, message: users };
  } catch (error) {
    console.error(error);
    return { success: false, message: error };
  }
}

async function sendMessage(messageData, senderId) {
  try {
    const message = {
      message_subject: "private Message",
      message_body: messageData.message_body,
      sender_id: senderId,
      receiver_id: messageData.receiver_id,
      conversation_id: messageData.conversation_id,
      delivered: 0,
    };

    const userMessages = await models.messages.create(message);

    const user = await models.users.findOne({ where: { id: senderId } });

    const messageResponse = {
      message_subject: message.message_subject,
      message_body: message.message_body,
      sender_id: senderId,
      receiver_id: message.receiver_id,
      conversation_id: message.conversation_id,
      delivered: message.delivered,
      user: {
        avatarPath: user.avatarPath,
        first_name: user.first_name,
      },
      created_at: userMessages.created_at,
    };

    return { success: true, message: messageResponse };
  } catch (error) {
    console.error(error);
    return { success: false, message: error };
  }
}

async function getChatMessages(userId, otherUserId) {
  try {
    const userMessages = await models.messages.findAll({
      where: {
        $or: [
          { sender_id: otherUserId, receiver_id: userId },
          { sender_id: userId, receiver_id: otherUserId },
        ],
      },
      include: [
        {
          model: models.users,
          as: "user",
        },
      ],
    });

    return { success: true, message: userMessages };
  } catch (error) {
    console.error(error);
    return { success: false, message: error };
  }
}

async function sendGroupMessages(messageData, senderId) {
  try {
    const { message_body, receiver_ids } = messageData;
    const conversation_id = "groupChat123";

    const messages = receiver_ids.map((receiver_id) => ({
      message_subject: "Group Message",
      message_body: message_body,
      sender_id: senderId,
      receiver_id: receiver_id,
      conversation_id: conversation_id,
      delivered: 0,
    }));

    await models.messages.bulkCreate(messages);

    return { success: true, message: "Group messages sent successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, message: error };
  }
}

async function getMyMessages(userId) {
  try {
    const users = await models.users.findAll({
      where: { id: { $ne: userId } },
      include: [
        {
          model: models.messages,
          as: "userMessages",
          order: [["id", "DESC"]],
          limit: 1,
        },
      ],
      order: [["id", "DESC"]],
    });

    const userMessages = await models.messages.findAll({
      where: {
        $or: [
          { sender_id: users[0].id, receiver_id: userId },
          { sender_id: userId, receiver_id: users[0].id },
        ],
      },
      include: [
        {
          model: models.users,
          as: "user",
        },
      ],
    });

    return { success: true, users, userMessages };
  } catch (error) {
    console.error(error);
    return { success: false, message: error };
  }
}

module.exports = {
  getUsersWithLatestMessages,
  sendMessage,
  getChatMessages,
  sendGroupMessages,
  getMyMessages,
};
