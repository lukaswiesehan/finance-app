import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preload" href="/fonts/lato-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
          <link rel="preload" href="/fonts/lato-900.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
        </Head>  
        <body style={{WebkitTapHighlightColor: 'transparent'}}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument