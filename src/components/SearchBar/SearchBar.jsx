import toast, { Toaster } from 'react-hot-toast';
import { IoSearch } from "react-icons/io5";
import css from "./SearchBar.module.css"

export default function SearchBar({onSearch}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const search = form.elements.search.value;

     if (form.elements.search.value.trim() === "") {
      //  alert("Please enter search term!");
       toast.error("Please enter search term!")
      return;
    }
    onSearch(search);
    form.reset();
  }
  return (
<header className={css.container}>
  <form className={css.form} onSubmit={handleSubmit}>
    <input className={css.searchInput} 
      type="text"
      name="search"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
        />
      <button className={css.btn} type="submit"><IoSearch />Search</button>
      <Toaster
  position="top-right"
  reverseOrder={false}
/>
  </form>
</header>
)
}