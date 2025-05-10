import type { Metadata } from 'next';

// 1. Import metadata TỪ FILE RIÊNG './metadata.ts'
import { metadata as photosPageMetadata } from './metadata';

// 2. Import Client Component (chứa UI và logic tương tác)
import PhotosClient from './PhotosClient';

// 3. Export metadata object ĐỂ NEXT.JS SỬ DỤNG
// Next.js sẽ tự động đọc biến 'metadata' được export từ page.tsx hoặc layout.tsx
export const metadata: Metadata = photosPageMetadata;

// 4. Server Component này chỉ đơn giản là render Client Component
export default function PhotosPage() {
  // Component này chạy trên server, không có state hay effect client-side ở đây
  // Nó chỉ chịu trách nhiệm lấy dữ liệu (nếu cần) và render cấu trúc trang
  return <PhotosClient />;
  // Bạn có thể truyền props từ Server Component xuống Client Component nếu cần
  // Ví dụ: return <PhotosClient initialPhotos={serverFetchedPhotos} />;
}