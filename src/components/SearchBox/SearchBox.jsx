import {useId} from 'react'
import css from "./SearchBox.module.css"

export default function SearchBox({value, onChange}) {
  const inputId = useId();
  const handleChange = (event) => {
    onChange(event.target.value)
  }
  return (
<div className={css.container}>
      <label id={inputId}>Find contacts by name</label>
      <input className={css.searchInput} type="text" value={value} onChange={handleChange} name="search" id={inputId} />
</div>
)
}