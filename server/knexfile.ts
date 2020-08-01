import path from 'path';

//O knex não suporta a sintaxe export default
module.exports = {
    // client: 'sqlite3',
    // connection: {
    //     filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
    // },
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : 'root',
        database : 'ecoleta'
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true,
};