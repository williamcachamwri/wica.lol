// app/projects/page.tsx

import type { Metadata } from 'next';

// 1. Import metadata TỪ FILE RIÊNG './metadata.ts'
import { metadata as creditPageMetadata } from './metadata';

// 2. Import Client Component (chứa UI và logic tương tác)
import CreditsClient from './CreditsClient';

// 3. Export metadata object ĐỂ NEXT.JS SỬ DỤNG
// Next.js sẽ tự động đọc biến 'metadata' được export từ page.tsx hoặc layout.tsx
export const metadata: Metadata = creditPageMetadata;

// 4. Server Component này chỉ đơn giản là render Client Component
export default function CreditsPage() {
  // Component này chạy trên server, không có state hay effect client-side ở đây
  // Nó chỉ chịu trách nhiệm lấy dữ liệu (nếu cần) và render cấu trúc trang
  return <CreditsClient />;
  // Bạn có thể truyền props từ Server Component xuống Client Component nếu cần
  // Ví dụ: return <ProjectsClient initialProjects={serverFetchedProjects} />;
}