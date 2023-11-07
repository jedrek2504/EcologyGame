
const Sequelize = require('sequelize');
const sqlite3 = require('sqlite3');
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
    username: {
        type: Sequelize.STRING,
        allowNull: false,
		primaryKey: true,
		unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

const LoginInstance = sequelize.define("LoginInstance", {
	login_id: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		primaryKey: true,
	},
	user: {
		type: Sequelize.STRING,
		allowNull: false,
		references: {
			model: Person,
			key: "username",
		},
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	}
})

module.exports = {
    sequelize: sequelize,
    Person: Person,
	LoginInstance: LoginInstance
    //name: name //hide/delete?
};