const mongoose = require('mongoose');

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('give arguments: password name number');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://olliteed:${password}@phonebookapp.kt7sdrt.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model('Contact', contactSchema);

if (process.argv.length === 3) {
  Contact.find({}).then((contacts) => {
    console.log('phonebook:');
    contacts.forEach((contact) => {
      console.log(`${contact.name} ${contact.number}`);
    });
    mongoose.connection.close();
    process.exit(1);
  });
} else {
  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4],
  });

  contact.save().then(() => {
    console.log(`contact ${process.argv[3]} number ${process.argv[4]} saved!`);
    mongoose.connection.close();
    process.exit(1);
  });
}
