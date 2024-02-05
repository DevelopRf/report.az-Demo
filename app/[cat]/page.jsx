import { getSingleCategory } from "../libs/newsData"
import SubCategories from "../components/SubCategories/SubCategories"

const categories = async ({ params: { cat } }) => {
    const data = await getSingleCategory(cat)
    const categories = data.map(item => item.category)
    const categoryName = [... new Set(categories)]

    const subCat = data.map(item => {
        const id = item.id
        const subCat = item.sub_category
        const catUrl = item.catUrl
        const subCatUrl = item.subCatUrl
        const newData = { id, subCat, catUrl, subCatUrl }
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

    return <SubCategories news={data} categoryName={categoryName} subCats={subCats} />
}

export default categories