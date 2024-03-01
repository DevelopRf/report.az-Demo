
import Main from './components/Main/Main';
import { HookProvider } from './Hooks/Hook';
import { getNews, getVideoLink } from './libs/newsData';

export const metadata = {
  title: "Azərbaycanın aparıcı xəbər saytı | Report.az"
}
export default async function Home() {
  const data = await getNews()
  const videoLink = await getVideoLink()

  return (
      <Main data={data} videoData={videoLink} />
  )
}