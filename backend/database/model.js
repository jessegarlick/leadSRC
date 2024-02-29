import { DataTypes, Model } from "sequelize";
import util from "util";
import connectToDB from "./db.js";
import url from "url"

export const db = await connectToDB("postgresql:///leadsrc");

export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  
  },
  {
    modelName: "user",
    sequelize: db,
  }
);
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
    // dateCreated: {
    //    type: DataTypes.DATE,
    //     allowNull: false,
    // },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    streetName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    streetNumber: {
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
    clientId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
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
  },
  {
    modelName: "seller",
    sequelize: db,
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
    messageDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    modelName: "message",
    sequelize: db,
  }
);

User.hasOne(Seller, { foreignKey: "userId" });
Seller.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Buyer, { foreignKey: "userId" });
Buyer.belongsTo(User, { foreignKey: "userId" });

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  console.log('Syncing database...');
  await db.sync({force: true})
  console.log('Finished syncing database!');
}

