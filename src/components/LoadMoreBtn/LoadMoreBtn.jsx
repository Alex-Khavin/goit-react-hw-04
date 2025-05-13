import css from "./LoadMoreBtn.module.css"
import { IoSearch } from "react-icons/io5";

export default function LoadMoreBtn({nextPage}) {
    return (
    <button onClick={nextPage} className='btn'><IoSearch />Load more</button>
    )
}