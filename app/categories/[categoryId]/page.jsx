import { getNewsCategory } from "@/app/libs/newsData";

const NewsCategory = async ({ params: { cat_id } }) => {
    const catNews = await getNewsCategory(cat_id)
    return (
        catNews && catNews.map(item => {
            <h2>{item.title}</h2>
        })
    )

}

export default NewsCategory