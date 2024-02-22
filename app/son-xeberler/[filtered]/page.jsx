import AllLatestNews from "../../components/AllNews/AllNews"
import { getNews } from "../../libs/newsData"

const filteredNews = async ({ params: { filtered } }) => {

    const news = await getNews()

    const d = new Date();

    let filteredNews

    switch (filtered) {
        case "dunen":
            const yesterday = new Date(d);

            yesterday.setDate(d.getDate() - 1);

            const yesterdayStart = new Date(yesterday);
            yesterdayStart.setHours(0, 0, 0, 0);

            const yesterdayEnd = new Date(yesterday);
            yesterdayEnd.setHours(23, 59, 59, 999);

            filteredNews = news.filter(item => {
                const itemDate = new Date(item.date);

                return itemDate >= yesterdayStart && itemDate <= yesterdayEnd;
            })
            break;

        case "bu-gun":
            const todayStart = new Date(d);
            todayStart.setHours(0, 0, 0, 0);

            filteredNews = news.filter(item => {
                const itemDate = new Date(item.date);

                return itemDate >= todayStart && itemDate <= today;
            })
            break;

        case "bu-hefte":
            const weekStart = new Date(d)
            const weekEnd = new Date(d)


            weekStart.setDate(d.getDate() - d.getDay()) //Həftə bazar günündən başladığı üçün üzərinə 1 əlavə etdim ki 1-ci gündən başlasın. Günün nömrəsindən həftənin nömrəsi çıxılır və üzərinə 1 əlavə olunaraq həftənin əvvəli tapılır
            weekEnd.setDate(weekStart.getDate() + 6) // həftənin əvvəlinin üzərinə 7 əlavə etməklə həftənin sonu tapılır


            filteredNews = news.filter(item => {
                const itemDate = new Date(item.date)

                return itemDate >= weekStart && itemDate <= weekEnd
            })
            break;

        case "kecen-hefte":
            const currentDayOfWeek = d.getDay();

            // Bu günü baz alarak geçen haftanın başlangıç tarihini bulma
            const lastWeekStart = new Date(d);
            lastWeekStart.setDate(d.getDate() - currentDayOfWeek - 6); // 6 gün çıkartarak geçen haftanın başlangıcını buluyoruz

            // Bu günü baz alarak geçen haftanın bitiş tarihini bulma
            const lastWeekEnd = new Date(d);
            lastWeekEnd.setDate(d.getDate() - currentDayOfWeek); // Bu günü çıkartarak geçen haftanın sonunu buluyoruz

            // Filtreleme işlemi
            filteredNews = news.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate >= lastWeekStart && itemDate <= lastWeekEnd;
            });
            break;

        case "bu-ay":
            const monthStart = new Date(d.getFullYear(), d.getMonth(), 1);
            const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);
            const monthEnd = new Date(lastDay);
            monthEnd.setHours(23, 59, 59, 999);


            filteredNews = news.filter(item => {
                const itemDate = new Date(item.date)

                return itemDate >= monthStart && itemDate <= monthEnd
            })
            break;
        case "kecen-ay":
            const startDate = new Date()
            startDate.setMonth(startDate.getMonth() - 1);
            startDate.setDate(1);
            startDate.setHours(0, 0, 0, 0);

            // Geçen ayın bitiş tarihi
            const endDate = new Date();
            endDate.setDate(0); // Ayın son gününe git
            endDate.setHours(23, 59, 59, 999);

            // Haberleri geçen ay içinde filtrele
            filteredNews = news.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate >= startDate && itemDate <= endDate;
            });
        default: filteredNews = news
            break;
    }

    return <AllLatestNews news={filteredNews} />
}

export default filteredNews