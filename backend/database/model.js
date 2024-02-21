import { DataTypes, Model } from 'sequelize';
import util from 'util';
import connectToDB from './db.js';

export const db = await connectToDB('postgresql:///users');

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
        dateCreated: {
           type: DataTypes.Date,
            allowNull: false, 
        },
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
            type: DataTypes.INTEGER,
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
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cellPhone: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        homePhone: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        homeowner: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        shade: { 
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        monthlyRate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        creditScore: {
            type: DataTypes.BOOLEAN,
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
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
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
        phoneNumber: {
            type: DataTypes.INTEGER,
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
    },
  )

  export class Message extends Model {
    [util.inspect.custom]() {
      return this.toJSON();
    }
  }

  Messages.init(
    {
        messageId: {
            type: DataTypes.TEXT,
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

