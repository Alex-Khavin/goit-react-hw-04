import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import './App.css'
import ContactList from './ContactList/ContactList'
import SearchBox from './SearchBox/SearchBox'
import ContactForm from './ContactForm/ContactForm'

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const savedObjects = localStorage.getItem("saved-contacts");

    if (savedObjects !== null) {
      const parseData = JSON.parse(savedObjects);
      return parseData
    }

    return [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }
    ]
  });

  const addContact = (newContact) => {
    setContacts((prevContacts) => {
      return [...prevContacts, newContact]
    })
  };
  
  const deleteContact = (contactId) => {
    setContacts(prevContacts => {
      return prevContacts.filter((contact) => contact.id !== contactId)
    })
  };
  
  useEffect(() => {
    localStorage.setItem("saved-contacts", JSON.stringify(contacts));
  }, [contacts])

  const [searchInput, setSearchInput] = useState('')
  const [debounceInputValue] = useDebounce(searchInput, 1000);

  const searchContacts = useMemo(() => {
    return contacts.filter((contact) => contact.name.toLowerCase().includes(debounceInputValue.toLowerCase()));
  }, [debounceInputValue, contacts])

  return (
    <>
    <div>
      <h1 className="title">Phonebook</h1>
        <ContactForm onContact={addContact} />
        <SearchBox value={searchInput} onChange={setSearchInput} />
        <ContactList contacts={searchContacts} onDelete={deleteContact} />
    </div>
    </>
  );
};