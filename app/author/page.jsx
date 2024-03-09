import SubCategories from "../components/SubCategories/SubCategories"
import { getNews } from "../libs/newsData"
const author = async () => {
    const author = await getNews()
    return <SubCategories author={author} />
}
export default author