import { cache } from 'react';

export type Metadata = {
  title: string;
  description: string;
  date: string;
  discussionId?: string;
};

export type FrontmatterParseResult = {
  metadata: Metadata;
  content: string;
};

export type MDXFileData = FrontmatterParseResult & {
  slug: string;
};

// Hàm fetch dữ liệu từ GitHub API được cache
export const fetchBlogPosts = cache(async (): Promise<MDXFileData[]> => {
  try {
    // Fetch danh sách các file từ GitHub API
    const response = await fetch(
      'https://api.github.com/repos/williamcachamwri/blog-data/contents',
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 60 }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const files = await response.json();
    
    // Lọc chỉ lấy các file markdown
    const mdFiles = files.filter((file: any) => 
      file.name.endsWith('.md') && file.type === 'file'
    );

    // Fetch nội dung của từng file
    const postsPromises = mdFiles.map(async (file: any) => {
      const contentResponse = await fetch(file.download_url, {
        next: { revalidate: 60 }
      });
      
      if (!contentResponse.ok) {
        throw new Error(`Failed to fetch file content: ${contentResponse.status}`);
      }
      
      const content = await contentResponse.text();
      const { metadata, content: mdContent } = parseFrontmatter(content);
      
      return {
        slug: file.name.replace(/\.md$/, ''),
        metadata,
        content: mdContent
      };
    });

    const posts = await Promise.all(postsPromises);
    
    // Sắp xếp bài viết theo ngày giảm dần
    return posts.sort((a, b) => {
      if (new Date(a.metadata.date) < new Date(b.metadata.date)) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
});

// Hàm lấy tất cả các slug của blog
export const getAllBlogSlugs = cache(async (): Promise<string[]> => {
  const posts = await fetchBlogPosts();
  return posts.map(post => post.slug);
});

// Hàm lấy bài viết theo slug
export const getPostBySlug = cache(async (slug: string): Promise<MDXFileData | null> => {
  console.log("Fetching post for slug:", slug);
  
  const posts = await fetchBlogPosts();
  console.log(
    "Available posts:",
    posts.map((p) => p.slug)
  );
  
  const foundPost = posts.find((post) => post.slug === slug) ?? null;
  console.log("Found post:", foundPost);
  
  return foundPost;
});

// Hàm parse frontmatter từ nội dung markdown
function parseFrontmatter(fileContent: string): FrontmatterParseResult {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    throw new Error("No frontmatter found");
  }

  const frontmatter = match[1];

  if (!frontmatter) {
    throw new Error("No frontmatter found");
  }

  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontmatterLines = frontmatter.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontmatterLines.forEach((line) => {
    const [key, ...values] = line.split(": ");
    let value = values.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1");
    if (key && value) {
      metadata[key.trim() as keyof Metadata] = value;
    }
  });

  return { metadata: metadata as Metadata, content };
}