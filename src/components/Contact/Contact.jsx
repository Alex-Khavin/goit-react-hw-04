import css from "./Contact.module.css"
import { ImPhone } from "react-icons/im";
import { FaUser } from "react-icons/fa6";

export default function Contact({ data: {name, number, id}, onDelete }) {
    
    return (
        <>
            <div className={css.container}>
                <div className={css.wrapper}>
                    <FaUser /><p className={css.text}>{name}</p>
                </div>
                <div className={css.wrapper}>
                    <ImPhone /><p className={css.text}>{number}</p>
                </div>
                <button className={css.btnDelete} onClick={() => onDelete(id)}>Delete</button>
            </div>
        </>
    )
};