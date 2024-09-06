import axios from "axios";
import Link from "next/link";
import qs from 'qs';

const BASE_URL = process.env.STRAPI_URL || "http://127.0.0.1:1337";

export async function fetchDataFromStrapi(route) {
    const url = `${BASE_URL}/api/${route}`;

    try {
        const response = await axios.get(url)
        return response.data.data;
    } catch (e) {
        console.log(e);
        throw new Error(`Could not fetch data from ${url}`);
    }
}

export function processInfoBlocks(data) {
    const infoBlocksRaw = data.attributes.info_blocks.data;
    return infoBlocksRaw.map((infoBlock) => {
        return {
            ...infoBlock.attributes,
            imageSrc: `${BASE_URL}${infoBlock.attributes.image?.data?.attributes?.url}`,
            id: infoBlock.id,
            button: createInfoBlockButton(infoBlock.attributes.button)
        }
    })
}

function createInfoBlockButton(buttonData) {
    if (!buttonData) {
        return null;
    }

    return (
        <Link href={`/${buttonData.slug}`} className={`btn btn--medium btn--${buttonData.color}`}>
            {buttonData.text}
        </Link>
    );
}

export async function fetchBlogArticles() {
    const blogData = await fetchDataFromStrapi("blog-articles?populate=deep");
    const processBlogArticles = blogData.map(processBlogArticle);

    processBlogArticles.sort(
        (a, z) => new Date(z.publishedAt) - new Date(a.publishedAt)
    )

    return processBlogArticles;
}

function processBlogArticle(article) {
    return {
        ...article.attributes,
        id: article.id,
        featuredImage: `${BASE_URL}${article.attributes?.featuredImage?.data?.attributes?.url}`,
    };
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    };

    return date.toLocaleDateString('en-US', options);
}

export function extractImageUrl(imageData) {
    return BASE_URL + imageData.data?.attributes?.url;
}

export async function fetchIndividualEvent(eventId) {
    const resp = await axios.get(`${BASE_URL}/api/events/${eventId}`);
    return processEventData(resp.data.data);
}

export function processEventData(event) {
    return {
        ...event.attributes,
        image: `${BASE_URL}${event.attributes?.image?.data?.attributes?.url}`,
        id: event.id,
    };
}

export function generateSignupPayload(formData, eventId) {
    if (!eventId) {
        return {
            data: {...formData, isGeneralInterest: true},
        };
    } else {
        return {
            data: {...formData, event: {connect: [eventId]}}
        }
    }
}

export async function fetchAllEvents(eventToExclude = null) {
    const query = createEventQuery(eventToExclude);

    const response = await axios.get(`${BASE_URL}/api/events?${query}`);

    return response.data.data.map(event => processEventData(event))
}

function createEventQuery(eventIdToExclude) {
    const queryObject = {
        pagination: {
            start: 0,
            limit: 12,
        },
        populate: {
            image: {
                populate: "*",
            }
        },
        sort: ["startingDate:asc"],
        filters: {
            startingDate: {
                $qt: new Date(),
            },
            id: {
                $ne: eventIdToExclude || null
            }
        },
    };
    if (eventIdToExclude) {
        queryObject.filters.id = {
            $ne: eventIdToExclude
        }
    }

    return qs.stringify(queryObject, {encodeValuesOnly: true});

}