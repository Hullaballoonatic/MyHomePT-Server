export default {
    name: 'myhomept-server',
    version: '0.0.1',
    port: process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000,
    env: process.env.NODE_ENV || 'dev',
}
