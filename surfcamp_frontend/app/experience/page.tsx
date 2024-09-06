import HeroSection from "@/app/_components/HeroSection";
import {Fragment} from "react";
import InfoBlock from "@/app/_components/InfoBlock";
import {fetchDataFromStrapi, processInfoBlocks} from "@/utils/strapi.utils";

export default async function Home() {
    const data = await fetchDataFromStrapi("infoblock-experience?populate=deep");
    const infoBlockData = processInfoBlocks(data);

    const heroHeadLine = (
        <>
            <h1>barrel.</h1>h
            <h1>your.</h1>
            <h1>happiness.</h1>
        </>
    );

    return (
        <main>
            <HeroSection imgSrc={"assets/hero-experience.png"} headline={heroHeadLine} theme={"orange"}/>
            {infoBlockData.map(data => <InfoBlock key={data.id} data={data} />)}
        </main>
    );
}
export const revalidate = 300;