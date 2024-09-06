import Link from "next/link";

const HeroSection = ({imgSrc, theme = "turquoise", headline}) => {
    return (
        <section className={"hero"}>
            <div className={"hero__background"}>
                <img src={imgSrc || "/assets/hero-home.png"} alt={"Surf bg"} />
            </div>
            <div className={`hero__headline hero__headline--${theme}`}>
                {headline}
            </div>
            <button className={`btn btn--medium btn--${theme}`}>
                <Link href={"/events"}>BOOK NOW</Link>
            </button>
            <img className={`hero__logo hero__logo--${theme}`} src={"/assets/logo.svg"} alt={"Logo"} />
        </section>
    );
}
export default HeroSection;