import { Box, useMediaQuery } from "@mui/material";
import AddWidget from "Scenes/Widgets/AddWidget";
import FriendsListWidget from "Scenes/Widgets/FriendListWidget";
import MyPostWidget from "Scenes/Widgets/MyPostWidget";
import PostsWidget from "Scenes/Widgets/PostsWidget";
import UserWidget from "Scenes/Widgets/UserWidget";
import NavBar from "Scenes/navBar";
import { useSelector } from "react-redux";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>

        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AddWidget />
            <Box m='2rem 0' />
            <FriendsListWidget userId={_id}/>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
