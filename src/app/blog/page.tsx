import BlogClient from "./BlogClient";
import { fetchBlogPosts } from "~/components/utils/blog";
import { metadata as blogPageMetadata } from './metadata';
import { Metadata } from "next";
import TransitionWrapper from "~/components/utils/TransitionWrapper";

export const metadata: Metadata = blogPageMetadata;

export const revalidate = 60;

export default async function BlogPage({ 
  searchParams 
}: { 
  searchParams: { page?: string } 
}) {

  const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1;
  const postsPerPage = 5; 

  const allBlogPosts = await fetchBlogPosts();

  const totalPages = Math.ceil(allBlogPosts.length / postsPerPage);

  const blogs = allBlogPosts.map(post => ({
    slug: post.slug,
    title: post.metadata.title,
    date: post.metadata.date,
  }));

  return (
    <TransitionWrapper>
      <BlogClient 
        blogs={blogs} 
        currentPage={currentPage}
        totalPages={totalPages}
        postsPerPage={postsPerPage}
      />
    </TransitionWrapper>
  );
}