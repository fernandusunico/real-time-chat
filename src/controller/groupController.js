const groupService = require("../service/groupService");

async function createGroup(req, res) {
  try {
    // console.log("test", req.body);
    const group = await groupService.createGroup(req.body);
    return res.status(201).json(group);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function updateGroup(req, res) {
  try {
    const result = await groupService.updateGroup(req.params.id, req.body);
    // console.log("testttttt", result);
    return res
      .status(200)
      .json({ message: "Group edited successfully", result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function addMemberToGroup(req, res) {
  try {
    const { groupId, memberId } = req.body;
    await groupService.addMemberToGroup(groupId, memberId);
    return res.status(200).json({ message: "Member added to group" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function getGroupDetails(req, res) {
  try {
    const groupId = req.params.id;
    // console.log("groupIdtest", groupId);
    const group = await groupService.getGroupDetails(groupId);
    return res.status(200).json(group);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function allGroup(req, res) {
  try {
    const data = await groupService.allGroup();

    return res.status(200).json({ message: "Groups Listing", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function groupDrop(req, res) {
  try {
    const data = await groupService.deleteGroup(req.params.id);

    return res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createGroup,
  updateGroup,
  addMemberToGroup,
  getGroupDetails,
  allGroup,
  groupDrop,
};
