import Head from "next/head";

const HeadZone = () => {
  return (
    <>
      <Head>
        <title>Task Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          type="image/png"
          href="/images/task_tracker_icon.png"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/destyle.css@1.0.15/destyle.css"
        />
      </Head>
    </>
  );
};

export default HeadZone;
