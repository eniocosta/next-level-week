import knex from 'knex';
// import path from 'path';

const connection = knex({
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
    useNullAsDefault: true,
});

export default connection;