import css from './Loader.module.css'
import { GridLoader } from "react-spinners";

export default function Loader() {
    return (
        <p className='loader'><GridLoader size={10} color={"#1853ec"} /></p>
    )
}