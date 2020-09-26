const fs = require("fs");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      return console.log(error);
    }

    const contacts = JSON.parse(data);

    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      return console.log(error);
    }

    const contacts = JSON.parse(data);

    const contact = contacts.find((contact) => {
      if (contact.id === contactId) {
        return console.table(contact);
      }
    });
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      return console.log(error);
    }

    const contacts = JSON.parse(data);
    const newContact = contacts.filter((contact) => contact.id !== contactId);

    if (newContact.length === contacts.length) {
      console.log(
        `Contact with ID "${contactId}" don't removed! ID "${contactId}" not found!`
      );
      return;
    }
    console.table(newContact);

    fs.writeFile(contactsPath, JSON.stringify(newContact), (error) => {
      if (error) {
        return console.log("error :", error);
      }
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      return console.log(error);
    }

    const contacts = JSON.parse(data);

    contacts.push({
      id: contacts.length + 1,
      name: name,
      email: email,
      phone: phone,
    });

    console.table(contacts);

    fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
      if (error) {
        return console.log(error);
      }
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
