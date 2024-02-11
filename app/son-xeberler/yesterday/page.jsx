import AllLatestNews from "../../components/AllLatestNews/AllLatestNews"
import { getNews } from "../../libs/newsData";
const yesterday = async () => {

    const news = await getNews()

    const today = new Date();
    const yesterday = new Date(today);

    yesterday.setDate(today.getDate() - 1);

    const yesterdayStart = new Date(yesterday);
    yesterdayStart.setHours(0, 0, 0, 0);

    const yesterdayEnd = new Date(yesterday);
    yesterdayEnd.setHours(23, 59, 59, 999);

    const yesterdayNews = news.filter(item => {
        const itemDate = new Date(item.date);
        
        return itemDate >= yesterdayStart && itemDate <= yesterdayEnd;
    })

    console.log(yesterdayNews);

    return <AllLatestNews news={yesterdayNews} />
}

export default yesterday