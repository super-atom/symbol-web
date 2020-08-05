import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import useSWR from "swr";

import CustomLink from "components/common/CustomLink";
import CustomImage from "components/common/CustomImage";
import { usePageDispatch } from "lib/context/PageContext";
import checkLogin from "lib/utils/checkLogin";
import { SERVER_BASE_URL } from "lib/settings/constant";
import storage from "lib/utils/storage";

const FAVORITED_CLASS = "btn btn-sm btn-primary";
const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary";

const ProfilePreview = ({ profile }) => {
  const setPage = usePageDispatch();

  const [preview, setPreview] = React.useState(profile);
  const [hover, setHover] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(-1);

  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);

  const handleClickFavorite = async (slug) => {
    if (!isLoggedIn) {
      Router.push(`/user/login`);
      return;
    }

    setPreview({
      ...preview,
      favorited: !preview.favorited,
      favoritesCount: preview.favorited
        ? preview.favoritesCount - 1
        : preview.favoritesCount + 1,
    });

    try {
      if (preview.favorited) {
        await axios.delete(`${SERVER_BASE_URL}/articles/${slug}/favorite`, {
          headers: {
            Authorization: `Token ${currentUser?.token}`,
          },
        });
      } else {
        await axios.post(
          `${SERVER_BASE_URL}/articles/${slug}/favorite`,
          {},
          {
            headers: {
              Authorization: `Token ${currentUser?.token}`,
            },
          }
        );
      }
    } catch (error) {
      setPreview({
        ...preview,
        favorited: !preview.favorited,
        favoritesCount: preview.favorited
          ? preview.favoritesCount - 1
          : preview.favoritesCount + 1,
      });
    }
  };

  if (!profile) return;

  return (
    <div className="article-preview" style={{ padding: "1.5rem 0.5rem" }}>
      <div className="article-meta">
        <CustomLink href="/profile/[pid]" as={`/profile/${preview.user_id}`}>
          <CustomImage
            src="https://placehold.it/30x30"
            alt="author's profile image"
          />
        </CustomLink>

        <div className="info">
          <CustomLink
            href="/profile/[pid]"
            as={`/profile/${preview.user_id}`}
            className="author"
          >
            <span onClick={() => setPage(0)}>{preview.user_id}</span>
          </CustomLink>
          <span className="date">
            {new Date(preview.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button
            className={
              preview.favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS
            }
            onClick={() => handleClickFavorite(preview.publication_id)}
          >
            <i className="ion-heart" /> {preview.profile_type}
          </button>
        </div>
      </div>

      <CustomLink
        href="/article/[pid]"
        as={`/article/${preview.publication_id}`}
        className="preview-link"
      >
        <h1>{preview.activity_name}</h1>
        <p>프로필 설명 : {preview.profile_description}</p>
        <p>프로필 타입 : {preview.profile_type}</p>
        <span>Read more...</span>
      </CustomLink>
    </div>
  );
};

export default ProfilePreview;
