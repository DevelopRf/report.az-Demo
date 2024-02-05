import Main from './components/Main/Main';
import { getNews, getVideoLink } from './libs/newsData';


export default async function Home() {
  const data = await getNews()
  const videoLink = await getVideoLink()

  return (
    <Main data={data} videoData={videoLink}/>
  )
}