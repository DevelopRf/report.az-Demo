import SubCategories from "../components/SubCategories/SubCategories"
import { getNews } from "../libs/newsData"
const author = async () => {
    const author = await getNews()
    return (
        <main>
            <SubCategories author={author} />
        </main>
    )
}
export default author