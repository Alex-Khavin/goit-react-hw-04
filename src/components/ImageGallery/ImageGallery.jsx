import css from "./ImageGallery.module.css"
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({photos, onImageClick}) {
  return (
 
  <ul className={css.container}>
      {photos.map(photo => (
    <li className={css.item} key={photo.id} onClick={() => onImageClick(photo.urls.regular)}>
          <ImageCard data={photo} />
	  </li>   
  ))}
  </ul>
)
}