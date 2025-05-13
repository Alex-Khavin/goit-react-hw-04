import css from "./ImageCard.module.css"

export default function ImageCard({data, onImageClick}) {
    
    return (
        <div className={css.container}>
  <img className={css.image} onClick={() => onImageClick(data.urls.regular)} src={data.urls.small} alt={data.alt_description} />
</div>
)
};