import mongoose from 'mongoose'
import User from './user'
import media from './plugins/media'
import timestamp from './plugins/timestamp'

const schema = new mongoose.Schema({
    creatorId: String,
    bodyPart: String,
    title: {type: String, default: 'Unnamed Exercise'},
    link: String,
    description: String,
    videoUrl: String,
})

schema.plugin(timestamp)
schema.plugin(media)

schema.set('toJSON', {virtuals: true})

schema.post('save', function (next) {
    User.find({_id: this.creatorId}).then(user => {
        user.createdExerciseIds.push(this._id)
        return user.save()
    }).catch(next)
    next()
})

schema.pre('remove', function (next) {
    const exercise = this
    User.find({_id: this.creatorId}).then(user => {
        user.createdExerciseIds.splice(user.createdExerciseIds.indexOf(exercise._id), 1)
        return user.save()
    }).catch(next)
    next()
})

export default mongoose.model('Exercise', schema)
