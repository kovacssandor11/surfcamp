import {extractImageUrl} from "@/utils/strapi.utils";

const LandscapeImage = ({imageData}) => {
    const { image, imageCaption}  = imageData;

  return <div className={"article-image"}>
      <img src={extractImageUrl(image)} alt={"Image"} />
      {imageData && (
          <p className="copy article-image__caption copy-small">
          {imageCaption}
      </p>
      )}
  </div> ;
}

export default LandscapeImage;