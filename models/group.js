"use strict";
module.exports = function (sequelize, DataTypes) {
  var group = sequelize.define(
    "groups",
    {
      groupName: {
        type: DataTypes.STRING,
      },
      isActive: {
        type: DataTypes.STRING,
      },

      createdAt: {
        type: "TIMESTAMP",
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: "TIMESTAMP",
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "groups",
    },
    {
      classMethods: {
        associate: function (models) {},
      },
    }
  );
  return group;
};
