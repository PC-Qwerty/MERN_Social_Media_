import { Box } from "@mui/material";

const UserImg = ({ image , size ='60px'}) =>{
    return (
        <Box width={size} height={size}>
            <img 
                style= {{objectFit:'cover' , borderRadius:"50%"}}
                width={size}
                height={size}
                alt="User"
                src={`http://localhost:8888/assets/${image}`}
            />
        </Box>
    );
}

export default UserImg;
