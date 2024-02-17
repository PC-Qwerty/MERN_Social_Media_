import { Box } from "@mui/material";

const UserImg = ({ image, size = '60px' }) => {
    return (
        <Box width={size} height={size}>
            <img
                style={{ objectFit: 'cover', borderRadius: "50%" }}
                width={size}
                height={size}
                alt="User"
<<<<<<< HEAD
                src={`${REACT_APP_BACKEND_URL}/assets/${image}`}
=======
                src={`https://mern-social-media-r34j.vercel.app/assets/${image}`}
>>>>>>> 8ef08f51d2da108e8d76ee4889e5d11981ad8026
            />
        </Box>
    );
}

export default UserImg;
