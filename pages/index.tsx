import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="Log your income and expenses" />
      </Head>
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Welcome to Expense Tracker</h1>
        <p className="mt-4">Get started by adding your first expense.</p>
      </main>
    </>
  );
}