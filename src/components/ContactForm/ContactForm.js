import { addContact } from 'redux/operations/operations';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors/selectors';
import { toast } from 'react-toastify';
import css from '../ContactForm/ContactForm.module.css';

export function ContactForm() {
  const dispatch = useDispatch();
  const currentContacts = useSelector(getContacts);

  const handleFormSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    const names = currentContacts.map(contact => contact.name.toLowerCase());
    if (names.includes(name.toLowerCase())) {
      return toast.warning(
        `Subscriber ${name.toUpperCase()} is already in the phonebook`
      );
    }
    dispatch(addContact({ name, number }));
    form.reset();
  };
  return (
    <div>
      <form className={css.form} onSubmit={handleFormSubmit} id="form">
        <label className={css.form__label}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.form__label}>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button className={css.form__btn} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
}
