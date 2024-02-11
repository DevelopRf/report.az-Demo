import { getSingleSubCategory } from "@/app/libs/newsData"
import SubCategories from "@/app/components/SubCategories/SubCategories"
import SingleNews from "@/app/components/SingleNews/SingleNews"
import { getSingleNews } from "@/app/libs/newsData";
import { getNews } from "@/app/libs/newsData";

const football = async ({ params: { subcat } }) => {
    const data = await getSingleSubCategory(subcat)
    const categories = data.map(item => item.sub_category)
    const categoryName = [... new Set(categories)]
    if (data.length > 0) { return <SubCategories news={data} categoryName={categoryName} /> }

    else {
        const newsData = await getSingleNews(subcat)
        const latestNews = await getNews()
        return <SingleNews singleNews={newsData} latestNews={latestNews} />
    }
}

export default football