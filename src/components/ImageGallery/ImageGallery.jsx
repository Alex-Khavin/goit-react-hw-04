import css from "./ImageGallery.module.css"
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({photos, onImageClick}) {
  return (
 
  <ul className={css.container}>
      {photos.map(photo => (
    <li className={css.item} key={photo.id}>
          <ImageCard data={photo} onImageClick={onImageClick} />
	  </li>   
  ))}
  </ul>
)
}