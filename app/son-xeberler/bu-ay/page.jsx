import AllLatestNews from "../../components/AllNews/AllNews"
import { getNews } from "../../libs/newsData"
const thisMonth = async () => {

    const news = await getNews()

    const d = new Date();
    const monthStart = new Date(d.getFullYear(), d.getMonth(), 1);
    const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    const monthEnd = new Date(lastDay);
    monthEnd.setHours(23, 59, 59, 999);

    console.log(monthEnd);
    const yesterdayNews = news.filter(item => {
        const itemDate = new Date(item.date)

        return itemDate >= monthStart && itemDate <= monthEnd
    })

    return <AllLatestNews news={yesterdayNews} />
}

export default thisMonth