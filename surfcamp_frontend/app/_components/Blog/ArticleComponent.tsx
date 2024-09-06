import ArticleHeadline from "@/app/_components/Blog/ArticleHeadline";
import ImageTextComponent from "@/app/_components/Blog/ImageTextComponent";
import ArticleParagraph from "@/app/_components/Blog/ArticleParagraph";
import LandscapeImage from "@/app/_components/Blog/LandscapeImage";

const ArticleComponent = ({component}) => {
    const componentType =  component.__component.split("blog-article.")[1];
    switch (componentType) {
        case 'headline3':
            return <ArticleHeadline headline={component} />;
        case "paragraph-with-image5":
            return <ImageTextComponent component={component} />;
        case "paragraph":
            return <ArticleParagraph paragraph={component} />;
        case "landscape-image":
            return <LandscapeImage imageData={component} />;
        default:
            return <h1>Component not found</h1>;
    }
}

export default ArticleComponent