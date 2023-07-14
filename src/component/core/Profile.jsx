import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = () => {

    const [data, setData] = useState([])

    const ApiFetchData = async () => {
        const response = await axios.get(`http://127.0.0.1:3005/own`)
        setData(response?.data)
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 5,
        slidesToScroll: 3,
        arrows: true,
        // autoplay: true,
        // autoplaySpeed: 1000
    };

    useEffect(() => {
        ApiFetchData()
    }, [])

    return (
        <>
            <Typography variant='h4' className='text-center my-5'>
                It's Me
            </Typography>
            <div className="container">
                <Slider {...settings}>
                    {
                        data?.map((e) => {
                            return (
                                <>
                                    <div className="col-md-4 my-3">
                                        <Link to={`/${e.id}`}>
                                            <Card sx={{ minWidth: 200 }}>
                                                <CardMedia
                                                    component="img"
                                                    height={300}
                                                    width={100}
                                                    image={e.image}
                                                    alt="Cake1"
                                                    style={{ 'objectFit': "cover" }}
                                                />
                                                <CardContent>
                                                    <Typography variant="h6" align='center' color="text.secondary">
                                                        {e.title.slice(0, 10)}...
                                                    </Typography>
                                                </CardContent>
                                                <CardActions disableSpacing>
                                                    <IconButton aria-label="add to favorites">
                                                        <FavoriteIcon />
                                                    </IconButton>
                                                </CardActions>
                                            </Card>
                                        </Link>
                                    </div>
                                </>
                            )
                        })
                    }
                </Slider>
            </div>
        </>
    )
}

export default Profile