import AllLatestNews from "../../components/AllNews/AllNews"
import { getNews } from "../../libs/newsData"
const thisMonth = async () => {

    const news = await getNews()

    const today = new Date();
    const currentDayOfWeek = today.getDay();

    // Bu günü baz alarak geçen haftanın başlangıç tarihini bulma
    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(today.getDate() - currentDayOfWeek - 6); // 6 gün çıkartarak geçen haftanın başlangıcını buluyoruz

    // Bu günü baz alarak geçen haftanın bitiş tarihini bulma
    const lastWeekEnd = new Date(today);
    lastWeekEnd.setDate(today.getDate() - currentDayOfWeek); // Bu günü çıkartarak geçen haftanın sonunu buluyoruz

    // Filtreleme işlemi
    const lastWeekNews = news.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= lastWeekStart && itemDate <= lastWeekEnd;
    });

    return <AllLatestNews news={lastWeekNews} />
}

export default thisMonth