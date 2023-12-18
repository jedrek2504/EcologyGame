
//const Sequelize = require('sequelize');
//const sqlite3 = require('sqlite3');

import {Sequelize, DataTypes} from 'sequelize';
import sqlite3 from 'sqlite3';

/*const sequelize = new Sequelize(process.env.DB_SCHEMA || 'postgres',
                                process.env.DB_USER || 'postgres',
                                process.env.DB_PASSWORD || '',
                                {
                                    host: process.env.DB_HOST || 'localhost',
                                    port: process.env.DB_PORT || 5432,
                                    dialect: 'postgres',
                                    dialectOptions: {
                                        ssl: process.env.DB_SSL == "true"
                                    }
                                });*/
const name = "ecodnp";

const getStoragePath = ()=>{
    let storagePath = `${process.env.SQLITE_DBS_LOCATION}/${name}`
    console.log(`STORAGE PATH: ${storagePath}`);
    return storagePath;
};

const sequelize = new Sequelize({
    dialect: "sqlite",
    dialectModule: sqlite3,
    storage: getStoragePath()
    //storage: 'testStorageFile'
  });
//const sequelize = new Sequelize('sqlite::memory:');
const Person = sequelize.define('Person', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
		unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
		unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    is_forum_contributor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

const LoginInstance = sequelize.define("LoginInstance", {
	login_id: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		primaryKey: true,
	},
	//user: {
    user_id: {
		type: DataTypes.STRING/*INT!*/,
		allowNull: false,
		references: {
			model: Person,
			//key: "username",
            key: "user_id"
		},
		onUpdate: "CASCADE", // are those neccessary here ? Shouldn't be on the user entity instead ?
		onDelete: "CASCADE", //
	}
})

const Relationship = sequelize.define("Relationship", {
    relationship_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
		unique: true,
        primaryKey: false,
        autoIncrement: true
    },
    first_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    second_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true // composite pk
    }
}, {
    indexes: [
      {
        unique: true,
        fields: ['first_user_id', 'second_user_id']
      }
    ]
})

const ForumPost = sequelize.define("ForumPost", {
	post_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		unique: true,
		primaryKey: true,
        autoIncrement: true
    },
	creator_id: {
		type: DataTypes.STRING,
		allowNull: false,
		references: {
			model: Person,
			key: "user_id",
		}
	},
	content: {
		type: DataTypes.STRING,
		allowNull: false
	},
	title: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	/*parent_id: {
		type: DataTypes.INTEGER, // references self, can't do proper referencing because it would require the model to be finished here
		allowNull: true,
	}*/

});


/* module.exports = {
    sequelize: sequelize,
    Person: Person,
	LoginInstance: LoginInstance
    //name: name //hide/delete?
}; */

export default {
    sequelize: sequelize,
    Person: Person,
    LoginInstance: LoginInstance,
    //name: name //hide/delete?
    Relationship: Relationship,
    ForumPost: ForumPost,
};