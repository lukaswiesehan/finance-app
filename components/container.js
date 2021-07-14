import Head from 'next/head'
import {useRouter} from 'next/router'

export const Container = ({children, requiresAuth, ...customMeta}) => {
  const router = useRouter()
  const meta = {
    title: 'Finance App',
    description: '',
    url: 'https://finance.lukaswiesehan.de',
    name: 'Finance App',
    image: 'https://lukaswiesehan.de/images/banner.jpg',
    type: 'website',
    ...customMeta
  }
  const jsonLd = {
    '@context': "http://www.schema.org",
    '@type': 'WebSite',
    'name': meta.name,
    'url': meta.url
  }

  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index"/>
        <meta content={meta.description} name="description"/>
        <meta property="og:url" content={`${meta.url}${router.asPath}`}/>
        <link rel="canonical" href={`${meta.url}${router.asPath}`}/>
        <meta property="og:type" content={meta.type}/>
        <meta property="og:site_name" content={meta.name}/>
        <meta property="og:description" content={meta.description}/>
        <meta property="og:title" content={meta.title}/>
        <meta property="og:image" content={meta.image}/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content={meta.title}/>
        <meta name="twitter:description" content={meta.description}/>
        <meta name="twitter:image" content={meta.image}/>
        <link rel="icon" href="/favicon.ico"/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
      </Head>
      <main>
        {children}
      </main>
    </div>
  )
}