import Link from "next/link";

export default function Posts({ posts }) {
  return (
    <div className="container bg-slate-300 rounded p-6 flex gap-4 flex-col">
      {posts.map(({ id, title }) => (
        <Post key={id} id={id} title={title} />
      ))}
    </div>
  );
}

function Post({ id, title }) {
  return (
    <div className="w-full p-6 bg-slate-700 text-white rounded">
      <Link href={`/posts/${id}`}>
        <p>{title}</p>
      </Link>
    </div>
  );
}
