import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImg from "./UserImg";
import { useNavigate } from "react-router-dom";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId); // checks if an user is already friend or not

  const patchFriend = async () => {
    // depending on the above isFriend actions change like adding or removing from the friend list
    const response = await fetch(
<<<<<<< HEAD
      `${REACT_APP_BACKEND_URL}/api/users/${_id}/${friendId}`,
=======
      `https://mern-social-media-r34j.vercel.app/api/users/${_id}/${friendId}`,
>>>>>>> 8ef08f51d2da108e8d76ee4889e5d11981ad8026
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <>
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserImg image={userPicturePath} size="55px" />
          <Box
            onClick={() => {
              navigate(`/profile/${friendId}`);
              navigate(0); // ((refreshes the page)) used because an error occurs when an user vists a friend from his friend in his friend list... This causes to update the link(localhost:... ) but the page doesnot rerender and so to make the page also updated the process might become a complex and therfore this navigate(0) is used to refresh the page with the updated link
            }}
          >
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {name}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
              {subtitle}
            </Typography>
          </Box>
        </FlexBetween>
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      </FlexBetween>
      <Divider sx={{ marginTop: '1rem' }} />
    </>
  );
};

export default Friend;
