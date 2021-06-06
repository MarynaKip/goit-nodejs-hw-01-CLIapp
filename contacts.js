const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    const contact = result.find((contact) => contact.id === contactId);
    console.log(contact);
    return contact;
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    const updatedContacts = result.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    const resultData = await fs.readFile(contactsPath);
    console.log(JSON.parse(resultData));
  } catch (err) {
    console.log(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    const id = result.length + 1;
    await fs.writeFile(
      contactsPath,
      JSON.stringify([
        ...result,
        {
          id,
          name,
          email,
          phone,
        },
      ])
    );
    const resultData = await fs.readFile(contactsPath);
    console.log(JSON.parse(resultData));
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
