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
      default: false,
    },
    isClient: {
      type: DataTypes.BOOLEAN,
      default: false,
    }
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

Seller.hasMany(Buyer, { foreignKey: "sellerId" });
Buyer.belongsTo(Seller, { foreignKey: "sellerId" });

// if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
//   console.log('Syncing database...');
//   await db.sync({force: true})
//   console.log('Finished syncing database!');
// }
