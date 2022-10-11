import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Search(initalData) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Search results for: {router.query.searchTerm}</title>
        <meta name="description" content={initalData.dataJson.map((each, index) => each.title + ' ')}></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <p>Go <Link href="/"><a>home</a></Link></p>
      <h1>Search results for: {router.query.search}</h1>
      <div className="giphy-search-results-grid">
        {console.log("fff", initalData.dataJson)}
        {initalData.dataJson.map((d, i) => {
          return (
            <div key={i}>
              <h3>{d.title}</h3>
              <img src={d.images.original.url} alt={d.title} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const searchTerm = context.query.search;
  const data = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=iCIC6iazhZ0uqy8IqKhkgOlPnAgXPjkj&limit=10`
  );
  const dataJson = await data.json();
  return {
    props: { dataJson: dataJson.data },
  };
}
