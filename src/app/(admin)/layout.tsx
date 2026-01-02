import BottomNav from '@/components/BottomNav'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}