import BlogClient from "./BlogClient";
import { fetchBlogPosts } from "~/components/utils/blog";
import { metadata as blogPageMetadata } from './metadata';
import { Metadata } from "next";
import TransitionWrapper from "~/components/utils/TransitionWrapper";

export const metadata: Metadata = blogPageMetadata;

// Thiết lập revalidate để ISR hoạt động
export const revalidate = 60;

export default async function BlogPage({ 
  searchParams 
}: { 
  searchParams: { page?: string } 
}) {
  // Lấy tham số trang từ URL, mặc định là trang 1
  const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1;
  const postsPerPage = 5; // Số bài viết mỗi trang
  
  // Fetch dữ liệu blog từ GitHub API
  const allBlogPosts = await fetchBlogPosts();
  
  // Tính toán tổng số trang
  const totalPages = Math.ceil(allBlogPosts.length / postsPerPage);
  
  // Chuyển đổi dữ liệu để phù hợp với BlogClient
  const blogs = allBlogPosts.map(post => ({
    slug: post.slug,
    title: post.metadata.title,
    date: post.metadata.date,
  }));

  // Bọc BlogClient trong TransitionWrapper
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