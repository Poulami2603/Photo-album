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


const Collage = () => {

    const [data, setData] = useState([])

    const ApiFetchData = async () => {
        const response = await axios.get(`http://127.0.0.1:3005/collage`)
        setData(response?.data)
    }

    useEffect(() => {
        ApiFetchData()
    }, [])


    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 5,
        slidesToScroll: 3,
        arrows: true,
        // autoplay: true,
        // autoplaySpeed: 1500
    };

    return (
        <>
            <Typography variant='h4' className='text-center my-5'>
                Collage Memories
            </Typography>
            <div className="container">
                <Slider {...settings}>
                    {
                        data?.map((item) => {
                            return (
                                <>
                                    <div className="col-md-4">
                                        <Link to={`/collage/${item.id}`}>
                                            <Card sx={{ minWidth: 200 }}>
                                                <CardMedia
                                                    component="img"
                                                    height={300}
                                                    width={100}
                                                    image={item.image}
                                                    alt="Cake1"
                                                />
                                                <CardContent>
                                                    <Typography variant="h6" align='center' color="text.secondary">
                                                        {item.title.slice(0, 10)}...
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

export default Collage