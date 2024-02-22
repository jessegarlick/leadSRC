import { DataTypes, Model } from 'sequelize';
import util from 'util';
import connectToDB from './db.js';

export const db = await connectToDB('postgresql:///leadsrc');

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
        }
    },
    {
        modelName: 'buyer',
        sequelize: db,
    },
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
        // startDate: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        // },
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
        modelName: 'seller',
        sequelize: db,
        timestamps: true,
    },
  )

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
        }
    },
    {
        modelName: 'message',
        sequelize: db,
    }
  )

Seller.hasMany(Message, { foreignKey: 'clientId' });
Message.belongsTo(Seller, { foreignKey: 'clientId' });

Buyer.hasMany(Message, { foreignKey: 'buyerId' });
Message.belongsTo(Seller, { foreignKey: 'buyerId' });

