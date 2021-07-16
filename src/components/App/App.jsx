import { useState, useEffect } from 'react';
import Section from 'components/Section/Section';
import ContactsForm from 'components/ContactsForm/ContactsForm';
import ContactsList from 'components/ContactsList/ContactsList';
import Filter from 'components/Filter/Filter';
import { Container } from 'components/App/App.styled';

function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    const parsedSavedContacts = JSON.parse(savedContacts);
    if (parsedSavedContacts) {
      setContacts(parsedSavedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    contacts.some(({ name }) => name === newContact.name)
      ? alert(`Contact ${newContact.name} already exists`)
      : setContacts([newContact, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId),
    );
  };

  const getFilterValue = event => setFilter(event.target.value);

  const filteredContacts = () => {
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizeFilter) ||
        contact.number.includes(normalizeFilter),
    );
  };

  const filtered = filteredContacts();
  return (
    <Container>
      <Section title="Phonebook">
        <ContactsForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter filter={filter} onChange={getFilterValue} />
        <ContactsList contacts={filtered} onDeleteClick={deleteContact} />
      </Section>
    </Container>
  );
}

export default App;
