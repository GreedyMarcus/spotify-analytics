import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Header } from "@components/Header";
import { Page } from "@components/Page";
import { TopArtistsWidget } from "@components/TopArtistsWidget";
import { TopGenresWidget } from "@components/TopGenresWidget";
import { TopTracksWidget } from "@components/TopTracksWidget";

export default function Index() {
  return (
    <Page title="Dashboard">
      <main className="main-layout">
        <Header />
        <div className="hidden-scrollbar grid h-full grid-cols-1 gap-4 overflow-auto px-4 pt-20 pb-4 md:grid-cols-3">
          <TopTracksWidget />
          <TopArtistsWidget />
          <TopGenresWidget />
        </div>
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
