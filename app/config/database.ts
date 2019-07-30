export default {
    host: process.env.MONGODB_HOST || 'localhost',
    port: process.env.MONGODB_PORT || 27017,
    database: process.env.MONGODB_DATABASE || 'myapp',
    user: process.env.MONGODB_USER || '',
    password: process.env.MONGODB_PASSWORD || '',
    connectionString: process.env.MONGODB_URI || 'mongodb://localhost/myapp',
}
