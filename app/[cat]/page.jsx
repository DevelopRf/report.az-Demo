import { getSingleCategory, getSingleSubCategory, getNews, getCategories } from "@/app/libs/newsData"
import SubCategories from "@/app/components/SubCategories/SubCategories"
import NotFound from "../components/NotFound/NotFound"

export async function generateMetadata({ params: { cat } }) {
    const dataNews = await getCategories()
    const dataCat = dataNews.find(item => item.catUrl === cat)
    const dataSubCat = dataNews.find(item => item.subCatUrl === cat)

    if (dataCat) {
        return {
            title: `${dataCat.cat_meta_title} | Report.az`
        }
    }
    else if (dataSubCat) {
        return {
            title: `${dataSubCat.subcat_meta_title} | Report.az`
        }
    }
}

const category = async ({ params: { cat } }) => {
    let data = ""
    let categories = ""
    let categoryName = ""
    const dataNews = await getNews()
    const dataCat = dataNews.filter(item => item.catUrl === cat)
    const dataSubCat = dataNews.filter(item => item.subCatUrl === cat)

    const subCat = dataCat.map(item => {
        const id = item.id
        const subCat = item.sub_category
        const subCatUrl = item.subCatUrl
        const newData = { id, subCat, subCatUrl }
        return newData
    })

    const removeDublicate = (array, cat) => {
        const uniqueCat = new Set()

        const subCat = array.filter(item => {
            if (!uniqueCat.has(item[cat])) {
                uniqueCat.add(item[cat])
                return true
            }
            return false
        })

        return subCat
    }

    const subCats = removeDublicate(subCat, "subCat")

    if (dataCat.length > 0) {
        data = await getSingleCategory(cat)
        categories = data.map(item => item.category)
        categoryName = [... new Set(categories)]
        return <SubCategories news={data} categoryName={categoryName} subCats={subCats} />
    }
    else if (dataSubCat.length > 0) {
        data = await getSingleSubCategory(cat)
        categories = data.map(item => item.sub_category)
        categoryName = [... new Set(categories)]
        return <SubCategories news={data} categoryName={categoryName} />
    }
    else {
        return <NotFound />
    }
}

export default category