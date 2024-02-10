import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserImg from "components/UserImg";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false); // acts as switch for image icon clicked or not to open image dropping (essentially acts as a switch to open/close the dropzone)
  const [image, setImage] = useState(null); // actual image when  dropped
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user); // can be used to fetch the user info from backend
  const token = useSelector((state) => state.token); // can be used to know the user is authenticated to do the actions
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const medium = palette.neutral.medium;
  const mediumMain = palette.neutral.mediumMain;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    // posts the image to the backend
    const response = await fetch(`http://localhost:8888/api/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json(); // gets all posts made in the backend
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImg image={picturePath} />
        <InputBase
          placeholder="Make a post..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg, .jpeg ,.png"
            multiple={false}
            onDrop={
              (acceptedFiles) => setImage(acceptedFiles[0]) // here picture is uploaded to the backend as 'picture' which is used in it as 'upload.single()'.
            }
          >
            {/* here parameters are from DropZone component */}
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  // here getRootProps are passed to the div under it essentially initial values are passed
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main} `}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { curser: "pointer" } }}
                >
                  <input {...getInputProps} />{" "}
                  {/* here input values are taken from input component */}
                  {!image ? (
                    <p>
                      Add a <b>Photo</b> here..
                    </p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>

                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Photo
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
            disabled={!post}
            onClick={handlePost}
            sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius : '3rem'
            }}
        >
            Post
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
