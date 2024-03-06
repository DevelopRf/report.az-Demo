import AllNews from "../../components/AllNews/AllNews"
import { getNews, getUser } from "../../libs/newsData"
import { convertChars } from "../../libs/newsData"

const filteredNews = async ({ params: { filtered } }) => {

    const news = await getNews()
    const userInfo = await getUser()

    const d = new Date();

    let filteredNews

    switch (filtered) {
        case "dunen":
            const yesterday = new Date(d);
            yesterday.setDate(d.getDate() - 1);

            const yesterdayStart = new Date(yesterday);
            yesterdayStart.setHours(4, 0, 0, 0);

            const yesterdayEnd = new Date(yesterday);
            yesterdayEnd.setHours(3, 59, 59, 999);

            filteredNews = news.filter(item => {
                const itemDate = new Date(item.date);

                return itemDate >= yesterdayStart && itemDate <= yesterdayEnd;
            })
            break;

        case "bu-gun":
            const todayStart = new Date(d);
            todayStart.setHours(0, 0, 0, 0);
            const todayEnd = new Date(d)
            todayEnd.setHours(3, 59, 59, 999)

            filteredNews = news.filter(item => {
                const itemDate = new Date(item.date);

                return itemDate >= todayStart && itemDate <= todayEnd;
            })
            break;

        case "bu-hefte":

            const weekStart = new Date(d)

            weekStart.setDate(d.getDate() - ((d.getDay() + 6) % 7))

            const weekEnd = new Date(weekStart)
            weekEnd.setDate(weekStart.getDate() + 6)

            filteredNews = news.filter(item => {
                const itemDate = new Date(item.date)

                return itemDate >= weekStart && itemDate <= weekEnd
            })
            break;

        case "kecen-hefte":
            const lastWeekStart = new Date(d);
            lastWeekStart.setDate(d.getDate() - ((d.getDay() + 6) % 7) - 7);
            lastWeekStart.setHours(4, 0, 0, 0)

            const lastWeekEnd = new Date(lastWeekStart);
            lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
            lastWeekEnd.setHours(3, 59, 59, 999)

            filteredNews = news.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate >= lastWeekStart && itemDate <= lastWeekEnd;
            });
            break;

        case "bu-ay":
            const monthStart = new Date(d.getFullYear(), d.getMonth(), 1);
            const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);
            const monthEnd = new Date(lastDay);
            monthEnd.setHours(3, 59, 59, 999);


            filteredNews = news.filter(item => {
                const itemDate = new Date(item.date)

                return itemDate >= monthStart && itemDate <= monthEnd
            })
            break;
        case "kecen-ay":
            const startDate = new Date(d.getFullYear(), d.getMonth() - 1, 1)

            startDate.setHours(4, 0, 0, 0).toLocaleString();


            const endDate = new Date(d);
            endDate.setDate(0);
            endDate.setHours(3, 59, 59, 999);

            filteredNews = news.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate >= startDate && itemDate <= endDate;
            })
            break;
        default: filteredNews = news
            break;
    }

    return <AllNews news={filteredNews} userInfo={userInfo} />
}

export default filteredNews