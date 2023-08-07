const models = require("../../models");

async function createGroup(data) {
  const group = await models.groups.create(data);
  // await group.addUser(userId);
  return group;
}

async function updateGroup(id, updateBody) {
  return await models.groups.update(updateBody, { where: { id } });
}

async function addMemberToGroup(groupId, userId) {
  const group = await models.groups.findByPk(groupId);
  if (!group) {
    throw new Error("Group not found");
  }
}

async function allGroup(data) {
  return await models.groups.findAll(data);
}

async function getGroupDetails(groupId) {
  return await models.groups.findByPk(
    groupId
    //    {
    //   include: [{ model: User, attributes: ["id", "first_name", "avatarPath"] }],
    // }
  );
}

async function deleteGroup(id) {
  const group = await models.groups.destroy({ where: { id } });
  return group;
}

module.exports = {
  createGroup,
  addMemberToGroup,
  getGroupDetails,
  updateGroup,
  deleteGroup,
  allGroup,
};
