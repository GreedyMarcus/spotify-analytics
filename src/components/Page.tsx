import Head from "next/head";
import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export const Page = ({ title, children }: Props) => {
  return (
    <>
      <Head>
        <title>{`${title} | Spotify Analytics`}</title>
      </Head>
      {children}
    </>
  );
};
