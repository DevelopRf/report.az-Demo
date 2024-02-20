import AllLatestNews from "../../components/AllNews/AllNews"
import { getNews } from "../../libs/newsData"
const thisWeek = async () => {

    const news = await getNews()

    const today = new Date()
    const weekStart = new Date(today)
    const weekEnd = new Date(today)


    weekStart.setDate(today.getDate() - today.getDay() + 1) //Həftə bazar günündən başladığı üçün üzərinə 1 əlavə etdim ki 1-ci gündən başlasın. Günün nömrəsindən həftənin nömrəsi çıxılır və üzərinə 1 əlavə olunaraq həftənin əvvəli tapılır
    weekEnd.setDate(weekStart.getDate() + 7) // həftənin əvvəlinin üzərinə 7 əlavə etməklə həftənin sonu tapılır


    const yesterdayNews = news.filter(item => {
        const itemDate = new Date(item.date)

        return itemDate >= weekStart && itemDate <= weekEnd
    })

    console.log(yesterdayNews)

    return <AllLatestNews news={yesterdayNews} />
}

export default thisWeek