import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Page } from "@components/Page";

export default function Index() {
  return (
    <Page title="Dashboard">
      <h1>DASHBOARD</h1>
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
