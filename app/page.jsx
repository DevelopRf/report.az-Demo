
import Main from './components/Main/Main';
import { HookProvider } from './Hooks/Hook';
import { getNews, getVideoLink } from './libs/newsData';

export default async function Home() {
  const data = await getNews()
  const videoLink = await getVideoLink()

  return (
    <HookProvider>
      <Main data={data} videoData={videoLink} />
    </HookProvider>
  )
}