import { DataTypes, Model } from "sequelize";
import util from "util";
import connectToDB from "./db.js";
import url from "url";

export const db = await connectToDB("postgresql:///leadsrc");

export class Buyer extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Buyer.init(
  {
    buyerId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    streetAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cellPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    homePhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    homeowner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    monthlyRate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creditScore: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "buyer",
    sequelize: db,
  }
);

export class Seller extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Seller.init(
  {
    sellerId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isClient: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  },
  {
    sequelize: db,
    modelName: "seller",
    tableName: "sellers", // Explicit table name
    timestamps: true,
  }
);

export class Message extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Message.init(
  {
    messageId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "sellers", key: "sellerId" }, // Changed "seller" to "sellers"
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "sellers", key: "sellerId" }, // Changed "seller" to "sellers"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    modelName: "message",
    sequelize: db,
    timestamps: true,
  }
);


Seller.hasMany(Buyer, { foreignKey: "sellerId" });
Buyer.belongsTo(Seller, { foreignKey: "sellerId" });

Seller.hasMany(Message, { as: "SentMessages", foreignKey: "senderId" });
Seller.hasMany(Message, { as: "ReceivedMessages", foreignKey: "receiverId" });
Message.belongsTo(Seller, { as: "Sender", foreignKey: "senderId" });
Message.belongsTo(Seller, { as: "Receiver", foreignKey: "receiverId" });

