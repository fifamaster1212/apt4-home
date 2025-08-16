import { Link, useParams } from 'react-router-dom';
import { getPostBySlug, formatDateLong } from '../../data/blogPosts';

export function PostPage() {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-2xl font-semibold text-gray-900">Post not found</h1>
        <p className="mt-2 text-gray-600">We couldn’t find that article.</p>
        <div className="mt-6">
          <Link to="/blog" className="text-blue-600 hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <article className="space-y-8">
      <header className="mx-auto max-w-4xl px-5 pt-6 sm:pt-10">
        <div className="text-xs text-gray-500">{formatDateLong(post.date)}</div>
        <h1 className="mt-2 text-3xl sm:text-5xl font-news tracking-tight text-gray-900 leading-[1.05]">
          {post.title}
        </h1>
      </header>

      <div className="mx-auto max-w-5xl px-5">
        <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden border border-gray-200">
          {post.imageUrl && (
            <img src={post.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
          )}
        </div>
      </div>

      <section className="mx-auto max-w-3xl px-5 pb-16 prose prose-gray prose-p:leading-relaxed">
        {(post.content && post.content.length > 0 ? post.content : [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices, nibh a pulvinar placerat, purus dui maximus risus, eget aliquet arcu neque ac erat.',
          'Mauris vel molestie lorem. In euismod volutpat purus, at sagittis tortor malesuada nec. Integer efficitur gravida sem, ut tristique est pretium a.'
        ]).map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </section>
    </article>
  );
}

export default PostPage;


