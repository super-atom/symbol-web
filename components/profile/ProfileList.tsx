import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import ProfilePreview from "components/profile/ProfilePreview";
import ErrorMessage from "../common/ErrorMessage";
import LoadingSpinner from "../common/LoadingSpinner";
import Maybe from "../common/Maybe";
import Pagination from "../common/Pagination";
import { usePageState } from "../../lib/context/PageContext";
import {
  usePageCountState,
  usePageCountDispatch,
} from "../../lib/context/PageCountContext";
import useViewport from "../../lib/hooks/useViewport";
import { SYMBOL_API_URL, DEFAULT_LIMIT } from "../../lib/settings/constant";
import fetcher from "../../lib/utils/fetcher";

const ProfileList = () => {
  const page = usePageState();
  const pageCount = usePageCountState();
  const setPageCount = usePageCountDispatch();
  const lastIndex =
    pageCount > 480 ? Math.ceil(pageCount / 20) : Math.ceil(pageCount / 20) - 1;

  const { vw } = useViewport();
  const router = useRouter();
  const { asPath, pathname, query } = router;
  const { favorite, follow, tag, pid } = query;

  const isProfilePage = pathname.startsWith(`/profile`);

  let fetchURL;
  if (isProfilePage) {
    fetchURL = `${SYMBOL_API_URL}/profiles?page=0&limit=3&order=ASC&sortBy=updatedAt`;
  }

  const { data, error } = useSWR(fetchURL, fetcher);
  console.log("FETCH", data, fetchURL);

  if (error) {
    return (
      <div className="col-md-9">
        <div className="feed-toggle">
          <ul className="nav nav-pills outline-active"></ul>
        </div>
        <ErrorMessage message="Cannot load recent articles..." />
      </div>
    );
  }

  if (!data) return <LoadingSpinner />;

  const { count } = data;
  setPageCount(count);

  if (data.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }

  return (
    <>
      {data.data.rows?.map((profile) => (
        <ProfilePreview key={profile.profile_id} profile={profile} />
      ))}

      <Maybe test={count && count > 20}>
        <Pagination
          total={pageCount}
          limit={20}
          pageCount={vw >= 768 ? 10 : 5}
          currentPage={page}
          lastIndex={lastIndex}
          fetchURL={fetchURL}
        />
      </Maybe>
    </>
  );
};

export default ProfileList;
