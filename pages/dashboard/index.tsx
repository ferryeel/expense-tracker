import Head from 'next/head';
import dynamic from 'next/dynamic';

// Dynamically import dashboard content to avoid SSR issues with Clerk
const DashboardContent = dynamic(() => import('@/components/DashboardContent'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-screen">Loading...</div>,
});

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard - Expense Tracker</title>
        <meta name="description" content="Your expense dashboard" />
      </Head>
      <DashboardContent />
    </>
  );
}
