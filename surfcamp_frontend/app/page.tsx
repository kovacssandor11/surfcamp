import HeroSection from "@/app/_components/HeroSection";
import {Fragment} from "react";
import {fetchDataFromStrapi, processInfoBlocks} from "@/utils/strapi.utils";
import InfoBlock from "@/app/_components/InfoBlock";
import BlogPreview from "@/app/_components/BlogPreview/BlogPreview";

export default async function Home() {
    const data = await fetchDataFromStrapi("infoblock-landing?populate=deep");
    const infoBlockData = processInfoBlocks(data);

    const heroHeadLine = (
        <>
            <h1>barrel.</h1>
            <h1>your.</h1>
            <h1>happiness.</h1>
        </>
    );

    return (
        <main>
            <HeroSection headline={heroHeadLine}/>
            {infoBlockData.map(data => <InfoBlock key={data.id} data={data} />)}
            <BlogPreview />
        </main>
    );
}
export const revalidate = 300;
