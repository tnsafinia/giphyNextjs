import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Image from "next/image";

export default function Home(initialData) {
  const [searchTerm, setSearchTerm] = useState("cats");
  const [searchResult, setSearchResult] = useState([]);

  const search = async (event) => {
    event.preventDefault();
    const data = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=iCIC6iazhZ0uqy8IqKhkgOlPnAgXPjkj&limit=10`
    );

    const dataJson = await data.json();
    setSearchResult(dataJson.data);
  };

  useEffect(() => {
    setSearchResult(initialData.catGiphyJson.data);
  }, [initialData]);

  const hanldeInput = (e) => {
    setSearchTerm((searchTerm = e.target.value));
  };
  const handleSubmit = (e) => {
    alert(searchTerm);
    e.preventDefault();
  };

  return (
    <div className="container">
      <Head>
        <title>Giphy Search App</title>
        <meta
          name="description"
          content="Love giphys? We do too. Use our advanced giphy search to find the perfect giphy for any occation"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <div className="logo-container">
        {/* <Image
          src="/logo.png"
          layout="fill"
          alt="logo"
          unsized="true"
        /> */}
      </div>
      <h1>Giphy Search App</h1>
      <form onSubmit={search}>
        <input name="searchTerm" type="text" onChange={hanldeInput} />
        <button>Search</button>
      </form>
      <h1>Search results for: {searchTerm}</h1>

      <Link href="/search/[pid]" as={`/search/${searchTerm}`}>
        <a>{`http://localhost:3000/search/${searchTerm}`}</a>
      </Link>

      <div className="giphy-search-results-grid">
        {searchResult.map((d, i) => (
          <div key={i}>
            <img src={d.images.original.url} />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps(context) {
  let catGiphy = await fetch(
    "https://api.giphy.com/v1/gifs/search?q=cats&api_key=iCIC6iazhZ0uqy8IqKhkgOlPnAgXPjkj&limit=10"
  );
  let catGiphyJson = await catGiphy.json();
  return {
    props: { catGiphyJson: catGiphyJson }, // will be passed to the page component as props
  };
}
