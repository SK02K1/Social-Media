import { PostCard } from 'components';
import { useSelector } from 'react-redux';

export const PostsListing = ({ posts }) => {
  const { user } = useSelector((store) => store.user);
  const { avatarURL, firstName, lastName, bio, siteLink } = user;
  return (
    <>
      {posts.map((postData) => {
        return (
          <PostCard
            key={postData._id}
            postData={
              postData.username === user.username
                ? { ...postData, avatarURL, firstName, lastName, bio, siteLink }
                : postData
            }
          />
        );
      })}
    </>
  );
};
