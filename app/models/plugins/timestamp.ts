export default schema => {
    schema.add({createdOn: Date, updatedOn: Date})

    schema.pre('save', function (next) {
        this.updatedOn = Date.now()

        if (this.isNew) {
            this.createdOn = this.updatedOn
        }

        next()
    })
}

