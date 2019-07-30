import mongoose from 'mongoose'
import timestamp from './plugins/timestamp'

const schema = new mongoose.Schema({
    sub: {type: String, required: true},
    jti: {type: String, required: true},
    exp: {type: Date, required: true, index: true},
})

schema.plugin(timestamp)
schema.virtual('revoked_on').get(() => {
    return this.createdOn
})
schema.virtual('is_expired').get(() => {
    return this.exp < Date.now()
})

schema.statics.purgeExpired = () => {
    this.deleteMany({is_expired: true}).catch(console.log)
}

export default mongoose.model('RevokedToken', schema)
