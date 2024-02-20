import AllLatestNews from "../../components/AllNews/AllNews"
import { getNews } from "../../libs/newsData";
const today = async () => {

    const news = await getNews()

    const today = new Date();
    

    const todayStart = new Date(today);
    todayStart.setHours(0, 0, 0, 0);


    const yesterdayNews = news.filter(item => {
        const itemDate = new Date(item.date);
        
        return itemDate >= todayStart && itemDate <= today;
    })

    return <AllLatestNews news={yesterdayNews} />
}

export default today