import Head from "next/head";
import { motion } from "framer-motion";

// Internal dependencies
import Posts from "../components/Posts";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>My homepage</title>
      </Head>
      <motion.div
        className="container mx-auto bg-blue-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="text-center font-sans">Welcome</h1>
        <p>
          And this is some dynamic data from a CMS
          (http://trinculo.coolpage.biz/wp):
        </p>
        <Posts posts={posts} />
      </motion.div>
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
