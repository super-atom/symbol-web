import Head from "next/head";
import React from "react";

import Banner from "components/home/Banner";
import ProfileList from "components/profile/ProfileList";

const Home = () => (
  <>
    <Head>
      <title>HOME | NEXT REALWORLD</title>
      <meta
        name="description"
        content="Next.js + SWR codebase containing realworld examples (CRUD, auth, advanced patterns, etc) that adheres to the realworld spec and API"
      />
    </Head>
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">profile</div>
      </div>
      <ProfileList />
    </div>
  </>
);

export default Home;
