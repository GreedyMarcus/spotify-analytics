import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Header } from "@components/Header";
import { Page } from "@components/Page";

export default function Index() {
  return (
    <Page title="Dashboard">
      <main className="main-layout">
        <Header />
      </main>
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    redirect: !session ? { destination: "/login" } : undefined,
    props: {},
  };
};
