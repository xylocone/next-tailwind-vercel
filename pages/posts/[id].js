import { motion } from "framer-motion";

export default function Post({ content }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      dangerouslySetInnerHTML={{ __html: content }}
    ></motion.p>
  );
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `http://trinculo.coolpage.biz/wp/wp-json/wp/v2/posts?include[]=${params.id}&_fields=content`
  );
  const data = await response.json();

  return {
    props: {
      content: data[0].content.rendered,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch(
    `http://trinculo.coolpage.biz/wp/wp-json/wp/v2/posts?_fields=id`
  );
  const data = await response.json();

  return {
    paths: data.map((datum) => {
      return {
        params: { id: datum.id + "" },
      };
    }),
    fallback: false,
  };
}
