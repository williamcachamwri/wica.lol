import { notFound } from "next/navigation";
import { MDX } from "./mdx";
import { getPostBySlug, getAllBlogSlugs } from "~/components/utils/blog";
import BackButton from "~/components/BackButton";
import { Suspense } from "react";
import BlogPostSkeleton from "~/components/BlogPostSkeleton";
import BlogPostClient from "./BlogPostClient";
import BlogStyles from "~/components/BlogStyles";
import TransitionWrapper from "~/components/utils/TransitionWrapper";

// Thiết lập revalidate để ISR hoạt động
export const revalidate = 60;

// Tạo các tham số tĩnh cho tất cả các bài viết blog hiện có
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map(slug => ({ slug }));
}

// Server component cho metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return;
  }

  const publishedTime = formatDate(post.metadata.date);
  const encodedTitle = encodeURIComponent(post.metadata.title);
  const encodedDate = encodeURIComponent(publishedTime);

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      publishedTime,
      type: "article",
      url: `https://wica.lol/blog/${post.slug}`,
      images: [
        {
          url: `https://wica.lol/og/blog?title=${encodedTitle}`,
        },
      ],
    },
    twitter: {
      title: post.metadata.title,
      description: post.metadata.description,
      card: "summary_large_image",
      creator: "@williamcachamwri",
      images: [
        `https://wica.lol/og/blog?title=${encodedTitle}&top=${encodedDate}`,
      ],
    },
  };
}

// Server component wrapper
export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const publishedTime = formatDate(post.metadata.date);
  const encodedTitle = encodeURIComponent(post.metadata.title);
  const encodedDate = encodeURIComponent(publishedTime);

  return (
    <TransitionWrapper>
      <>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.metadata.title,
              datePublished: post.metadata.date,
              dateModified: post.metadata.date,
              description: post.metadata.description,
              image: `https://wica.lol/og/blog?title=${encodedTitle}&top=${encodedDate}`,
              url: `https://wica.lol/blog/${post.slug}`,
              author: {
                "@type": "Person",
                name: "William Cachamwri",
              },
            }),
          }}
        />
        
        <Suspense fallback={<BlogPostSkeleton />}>
          <BlogPostClient slug={post.slug}>
            <section className="max-w-4xl mx-auto px-6 font-mono text-md mt-5 p-8 relative">
              <div className="mb-8">
                <BackButton />
              </div>
              
              <h1 className="text-5xl font-bold mb-4 mt-6 text-white relative inline-block">
                {post.metadata.title}
                <div className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-green-300/0 via-green-300 to-green-300/0 animate-pulse" style={{ animationDuration: '3s' }} />
              </h1>
              
              <div className="mb-12 flex items-center justify-between text-sm">
                <time className="text-gray-400 block flex items-center space-x-2 group relative overflow-hidden">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 mr-2 text-green-400/70 group-hover:text-green-300 transition-colors duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                  </svg>
                  <span className="group-hover:text-green-300/80 transition-colors duration-300">
                    {formatDate(post.metadata.date)}
                  </span>
                  
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                </time>
              </div>
              
              <article className="prose prose-lg dark:prose-invert max-w-none text-gray-300 my-6 leading-relaxed relative">
                <div className="absolute -top-4 left-0 w-16 h-1 bg-gradient-to-r from-green-300/0 via-green-300/50 to-green-300/0 animate-pulse" style={{ animationDuration: '4s' }} />
                
                <div className="mdx-content">
                  <MDX source={post.content} />
                </div>
                
                <div className="absolute -bottom-4 right-0 w-16 h-1 bg-gradient-to-r from-green-300/0 via-green-300/50 to-green-300/0 animate-pulse" style={{ animationDuration: '4s', animationDelay: '2s' }} />
              </article>
            </section>
          </BlogPostClient>
        </Suspense>
        
        <BlogStyles />
      </>
    </TransitionWrapper>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}