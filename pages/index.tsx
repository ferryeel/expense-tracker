import Head from 'next/head';
import dynamic from 'next/dynamic';

// Dynamically import the home content to avoid SSR issues with Clerk
const HomeContent = dynamic(() => import('@/components/HomeContent'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-screen">Loading...</div>,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="Track your income and expenses with real-time analytics" />
      </Head>
      <HomeContent />
    </>
  );
}