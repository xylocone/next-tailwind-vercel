import Head from "next/head";

// Internal dependencies
import Posts from "../components/Posts";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>My homepage</title>
      </Head>
      <div className="container mx-auto bg-blue-100">
        <h1 className="text-center font-sans">Welcome</h1>
        <p>
          And this is some dynamic data from a CMS
          (http://trinculo.coolpage.biz/wp):
        </p>
        <Posts posts={posts} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "http://trinculo.coolpage.biz/wp/wp-json/wp/v2/posts"
  );
  const data = await response.json();

  const posts = data.map((datum) => {
    return {
      id: datum.id,
      title: datum.title.rendered,
    };
  });

  return {
    props: {
      posts,
    },
  };
}
