import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch(); // used to update (the details of the posts) in the redux store
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    // data.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    dispatch(setPosts({ posts: data }));
  };
  const getUserPosts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.log(data);
    // data.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    // maybe used for making api calls
    if (isProfile) getUserPosts();
    else getPosts();
    //here empty array is used to make API call once when rendering the page
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
