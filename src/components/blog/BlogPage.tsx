import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS, BlogCategory, formatDateShort } from '../../data/blogPosts';

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<'All' | BlogCategory>('All');

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return BLOG_POSTS;
    return BLOG_POSTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <section className="relative">
        <div className="mx-auto max-w-[90rem] px-5 py-12 lg:py-16 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-news tracking-tight text-gray-900 leading-[1.05]">
            Blog
          </h1>

          {/* Filters */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {(['All', 'product', 'industry', 'recruiting'] as const).map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={
                    'px-4 py-1.5 text-sm capitalize rounded-full border transition-colors backdrop-blur-sm ' +
                    (isActive
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white/90 text-gray-800 border-gray-300 hover:bg-white')
                  }
                  aria-pressed={isActive}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="relative bg-white">
        <div className="relative mx-auto max-w-[90rem] px-5">
          <div className="mb-4 flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">Latest</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article key={post.id} className="border border-gray-200 shadow-lg bg-white">
                <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  {/* Quick badge example */}
                  <div className="absolute left-3 bottom-3 bg-white/95 border border-gray-200 px-2.5 py-1 text-xs text-gray-900 shadow-sm capitalize">
                    {post.category}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-[11px] uppercase tracking-wider text-gray-500 mb-1">{formatDateShort(post.date)}</div>
                  <h3 className="text-lg font-semibold tracking-tight text-gray-900">
                    <Link to={`/blog/${post.slug}`} className="no-underline hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogPage;


