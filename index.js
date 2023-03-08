const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(cors());

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

//app.use(requestLogger);

let contacts = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(contacts);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const contact = contacts.find((con) => con.id === id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).end();
  }
});

app.get("/info", (req, res) => {
  res.send(
    `<div><p>Phonebook has ${
      contacts.length
    } people</p><h1>${new Date()}</h1></div>`
  );
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  contacts = contacts.filter((con) => con.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const contact = req.body;
  if (contact.name == undefined) {
    res.status(400).send({ error: "No name given" });
    return;
  }

  if (contact.number == undefined) {
    res.status(400).send({ error: "No number given" });
    return;
  }

  if (contacts.find((con) => con.name == contact.name)) {
    res.status(400).send({ error: "Name already exists" });
    return;
  }
  contact.id = calculateId();
  contacts = contacts.concat(contact);
  res.json(contact);
});

const calculateId = () => {
  return Math.floor(Math.random() * 10000);
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("connected");
});
