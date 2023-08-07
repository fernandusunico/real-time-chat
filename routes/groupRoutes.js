const express = require("express");
const router = express.Router();
const groupController = require("../src/controller/groupController");
// const authMiddleware = require("../middlewares/authMiddleware");

router.post("/groups", groupController.createGroup);
router.put("/edit/:id", groupController.updateGroup);
router.post("/add-member", groupController.addMemberToGroup);
router.get("/details/:id", groupController.getGroupDetails);
router.get("/getAllGroup", groupController.allGroup);
router.delete("/drop/:id", groupController.groupDrop);

module.exports = router;
