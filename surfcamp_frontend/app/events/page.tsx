import SignupForm from "@/app/_components/Events/SignupForm";
import {fetchAllEvents} from "@/utils/strapi.utils";
import FeaturedItems from "@/app/_components/FeaturedItems/FeaturedItems";

export default async function Page() {
    const allEvents = await fetchAllEvents();

    const infoText = (
        <>
            <p className={"copy"}>🌊 Discover the Thrill of the Ocean
                Ever dreamt of riding the waves but didn't know where to start? Our Beginner's Bootcamp is your passport
                to the exciting world of surfing. We've designed a 3-day immersive experience to turn your aspirations
                into real ocean adventures.</p>
            <p className={"copy"}>
                🏄‍♂️ What You'll Learn:
                Ocean Awareness: Dive deep into understanding the sea, its moods, and what makes a spot perfect for
                surfing.
                Board Basics: Get familiar with your board, from nose to tail, and understand the different types.
                Safety First: Learn essential safety protocols, from handling rip currents to surf etiquette.
                Catching Your First Wave: Experience the thrill as you paddle out, spot your wave, and enjoy your first
                ride towards the shore.</p>
            <p className={"copy"}>Why Choose Our Bootcamp?
                Expert Instructors: Our certified professionals are passionate about the sport and dedicated to ensuring
                you catch your first wave with confidence.
                Personalized Attention: We believe in a student-focused approach. With small group sizes, we ensure
                everyone gets the guidance they need.
                Top-Notch Equipment: We provide the latest and safest gear to set you on the path to becoming an adept
                surfer.</p>
            <p className={"copy"}> Extras:
                Refreshing beachside snacks and drinks.
                Capture the moment: Complimentary photos of your first wave.
                A certificate of completion to commemorate your journey.</p>
            <p className={"copy"}>🌴 Join Us and Make Waves
                Embark on a journey of discovery, fun, and excitement. The ocean is calling, and the waves are waiting.
                Sign up today and ride the wave of a lifetime</p>
        </>
    );

    const headline = "You want to stay tuned for our events?"

    return <main className={"events-page"}>
        <SignupForm infoText={infoText} headline={headline}></SignupForm>
        <FeaturedItems items={allEvents} itemType={"event"}/>
    </main>
}