import Head from "next/head";
import { ReactElement } from "react";

export interface Props {
  title: string;
  keywords: string;
  description: string;
}

const Meta = ({ title, keywords, description }: Props): ReactElement => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "lendsqr assessment",
  keywords:
    "lending Lending-as-a-Service business loan five minutes payments ease lend banks microfinance fintech credit market",
  description:
    "Lendsqr is a LaaS that’s transforming lending in Africa by empowering small to large lenders with the tech stack they need to scale while providing their borrowers with an awesome loan experience.",
};

export default Meta;