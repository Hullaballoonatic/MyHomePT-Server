import mongoose from 'mongoose'
import User from './user'
import media from './plugins/media'
import timestamp from './plugins/timestamp'

const schema = new mongoose.Schema({
    issuerId: String,
    targetId: String,
    exerciseId: String,
    title: String,
    holdTime: {
        amount: Number,
        unit: String,
    },
    numReps: {type: Number, default: 1},
    numSets: {type: Number, default: 1},
    frequency: {
        times: Number,
        period: {
            amount: Number,
            unit: String,
        },
    },
    completeBy: Date,
    details: String,
    setRecordings: [{
        startedOn: Date,
        completedOn: Date,
        recording: [Number],
    }],
})

schema.plugin(timestamp)
schema.plugin(media)

schema.post('save', function () {
    return User.updateOne({_id: this.targetId}, {$push: {taskIds: this._id}})
})

schema.pre('remove', function () {
    console.log(`running middleware for remove call on task (${this._id})`)
    return User.updateOne({_id: this.targetId}, {$pull: {taskIds: [this._id]}})
})

schema.set('toJSON', {virtuals: true})

export default mongoose.model('Task', schema)
