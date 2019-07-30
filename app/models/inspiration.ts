import mongoose from 'mongoose'
import timestamp from './plugins/timestamp'
import media from './plugins/media'

const schema = mongoose.Schema({
    message: {type: String, required: true},
})
schema.plugin(timestamp)
schema.plugin(media)

schema.set('toJSON', {virtuals: true})

export default mongoose.model('Inspiration', schema)
