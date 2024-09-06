import SignupForm from "@/app/_components/Events/SignupForm";
import {fetchAllEvents, fetchDataFromStrapi, fetchIndividualEvent} from "@/utils/strapi.utils";
import ReactMarkdown from "react-markdown";
import FeaturedItems from "@/app/_components/FeaturedItems/FeaturedItems";

export default async function Page({params}) {
    const {eventId} = params;
    const event = await fetchIndividualEvent(eventId);
    const otherEvents = await fetchAllEvents(eventId);

    const descriptionMarkdown = <ReactMarkdown className={"copy"}>
        {event.description}
    </ReactMarkdown>

    const pricing = {singlePrice: event.singlePrice, sharedPrice: event.sharedPrice};

    return <main className={"events-page"}>
        <SignupForm headline={event.name}
                    infoText={descriptionMarkdown}
                    buttonLabel={"Sign up"}
                    pricing={pricing}
                    eventId={eventId}
        />
        <FeaturedItems items={otherEvents} itemType={"event"} headline={"Explore our other events"} />
    </main>
}

export async function generateStaticParams() {
    try {
        const events = await fetchDataFromStrapi("events");
        return events.map(event => ({
            event: String(event.id),
        }));
    } catch (e) {
        console.log("Error fetching slugs for events",e);
    }
}