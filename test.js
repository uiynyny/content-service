const mongoose = require('mongoose')
const db_name = 'naka';
const uri = `mongodb+srv://admin:admin@cluster0.k7lik.mongodb.net/${db_name}?authSource=admin&replicaSet=atlas-biown2-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('connected');
});

const kSchema = new mongoose.Schema({ name: String})

kSchema.methods.speak = function () {
    const gret = this.name ? 'Meow is ' + this.name : 'no name';
    console.log(gret);
}

const Kit = mongoose.model('Kitten', kSchema);

const silence = new Kit({ name: 'Silence' });

silence.save((err, silence) => {
    if (err) return console.error(err);
    silence.speak();
})