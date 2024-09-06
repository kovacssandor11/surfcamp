import HighlightArticle from "@/app/_components/Blog/HighlightArticle";
import SubscribeToNewsletter from "@/app/_components/Blog/SubscribeToNewsletter";
import FeaturedItems from "@/app/_components/FeaturedItems/FeaturedItems";
import {fetchBlogArticles, fetchDataFromStrapi} from "@/utils/strapi.utils";

export default  async function Page() {
    const data = await fetchBlogArticles();

    const highlightArticleData = data.find((article) => article.isHighlightArticle) || data[0];

    const featuredArticles = data.filter((article) => !article.isHighlightArticle)

    return (
        <main className={"blog-page"}>
            <HighlightArticle data={highlightArticleData}/>
            <SubscribeToNewsletter/>
            <FeaturedItems items={featuredArticles}/>
        </main>
    );
}