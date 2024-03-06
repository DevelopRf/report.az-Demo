import { getCategories, getNews, getNewsType, getUser } from "../libs/newsData"
import AddNews from "../components/AddNews/AddNews"

const addNews = async () => {
    const cat = await getCategories()
    const type = await getNewsType()
    const userInfo = await getUser()
    const news = await getNews()
    const removeDublicate = (array, property) => {
        const uniqueValues = new Set()

        const categories = array.filter(item => {
            if (!uniqueValues.has(item[property])) {
                uniqueValues.add(item[property])
                return true
            }
            else return false
        })
        return categories
    }

    const category = removeDublicate(cat, "cat")

    const data = category.sort((a, b) => {
        if (a.cat > b.cat) return 1
        if (a.cat < b.cat) return -1
        return 0
    })

    const count = news && news.filter(item => item.slider)

    return <AddNews categories={data} catData={cat} newsType={type} userInfo={userInfo} count={count} />

}

export default addNews