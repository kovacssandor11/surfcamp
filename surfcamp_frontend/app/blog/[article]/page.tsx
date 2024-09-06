import {fetchBlogArticles, fetchDataFromStrapi} from "@/utils/strapi.utils";
import ArticleIntro from "@/app/_components/Blog/ArticleIntro";
import ArticleOverview from "@/app/_components/Blog/ArticleOverview";
import ArticleComponent from "@/app/_components/Blog/ArticleComponent";
import FeaturedItems from "@/app/_components/FeaturedItems/FeaturedItems";

export default async function Page({params}) {
    const {article: slug} = params;

    const articles = await fetchBlogArticles();
    const article = articles.find((article) => article.slug === slug);

    const moreArticles = articles.filter((article) => article.slug !== slug);

    return (
        <main>
            <ArticleIntro article={article} />
            <section className="article-section">
                <ArticleOverview article={article}/>
                {article.articleContent3.map((component) => (
                    <ArticleComponent key={component.id} component={component} />
                ))}
            </section>
            <FeaturedItems headline={"Explore our other articles"} items={moreArticles} />
        </main>
    );
}

export async function generateStaticParams() {
    try {
        const articles = await fetchDataFromStrapi("blog-articles");

        return articles.map((article) => ({
            article: article.attributes.slug,
        }));
    } catch (e) {
        console.log("Error fetching slugs for events",e);
    }
}

export const revalidate = 300;