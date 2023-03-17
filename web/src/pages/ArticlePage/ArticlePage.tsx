import { MetaTags } from '@redwoodjs/web'

import ArticleCell from 'src/components/ArticleCell'

type Props = {
  id: number
}

const ArticlePage = ({ id }: Props) => {
  return (
    <>
      <MetaTags title="Article" description="Article page" />
      <ArticleCell id={id} />
    </>
  )
}

export default ArticlePage
