require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Contact = require('./src/models/contact');

const app = express();

app.use(cors());
app.use(express.json());

// Custom morgan log style
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
);

app.use(express.static('build'));

app.get('/api/persons', (req, res, next) => {
  Contact.find({})
    .then((contacts) => {
      res.json(contacts);
    })
    .catch((err) => next(err));
});

app.get('/api/persons/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      if (contact) {
        res.json(contact);
      } else {
        res.status(404).send('No contact found with the id');
      }
    })
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;
  const contact = { name, number };
  Contact.findByIdAndUpdate(req.params.id, contact, { new: true, runValidators: true, context: 'query' })
    .then((updatedContact) => {
      if (!updatedContact) {
        res.status(404).send('Contact has already been deleted from the database');
        return;
      }
      res.json(updatedContact);
    }).catch((err) => {
      next(err);
    });
});

app.post('/api/persons', async (req, res, next) => {
  const { name, number } = req.body;
  const result = await Contact.find({ name });

  if (result.length !== 0) {
    res.status(400).send('Name is already in the phonebook.');
    return;
  }

  const newContact = new Contact({
    name,
    number,
  });
  newContact
    .save()
    .then((savedContact) => {
      res.json(savedContact);
    })
    .catch((err) => {
      next(err);
    });
});

app.get('/info', (req, res, next) => {
  Contact.count({})
    .then((result) => {
      res.send(
        `<div><p>Phonebook has ${result} people</p><h1>${new Date()}</h1></div>`,
      );
    })
    .catch((err) => next(err));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send('unknown endpoint');
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    res.status(400).send('malformatted id');
    return;
  }
  if ((err.name === 'ValidationError')) {
    res.status(400).send(err.message);
    return;
  }
  next(err);
};

app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
