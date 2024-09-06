"use client"
import FeaturedArticle from "@/app/_components/FeaturedItems/FeaturedArticle";
import {useState} from "react";
import FeaturedEvent from "@/app/_components/FeaturedItems/FeaturedEvent";

const FeaturedItems = ({headline, items, itemType = 'article'}) => {
    const [itemNumber, setItemNumber] = useState(3);

    const onShowMore = () => {
        if (itemNumber + 3 > items.lenght) {
            return setItemNumber(items.lenght);
        } else {
            return setItemNumber(itemNumber + 3);
        }
    }

  return (
    <section className={"featured-items"}>
        <h3 className="featured-items__Headline">
            {headline || "Our featured articles"}
        </h3>
        <div className="featured-items__container">
            {items
                .slice(0, itemNumber)
                .map((item) => {
                    if (itemType === 'article') {
                        return <FeaturedArticle key={item.slug} article={item}/>
                    } else {
                        return <FeaturedEvent key={item.id} event={item}/>
                    }

                })}
        </div>
        {itemNumber < items.length &&(
            <button className={"btn btn--medium btn--turquoise"} onClick={onShowMore}>See more</button>
        )}
    </section>
  );
}

export default FeaturedItems;