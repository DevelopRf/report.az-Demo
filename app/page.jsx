import Main from './components/Main/Main';
import { getNews } from './libs/newsData';


export default async function Home() {
  const data = await getNews()
  return (
    <Main data={data}/>
  )
}