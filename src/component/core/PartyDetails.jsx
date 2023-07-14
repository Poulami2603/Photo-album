import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PartyDetails = () => {

  const { id } = useParams()

  const [singledata, setSingledata] = useState()

  const ApiSinglePage = async () => {
    const response = await axios.get(`http://127.0.0.1:3005/party/${id}`)
    setSingledata(response?.data)
  }

  useEffect(() => {
    ApiSinglePage()
  }, [])


  return (
    <>
      {
        singledata &&
        <div className="container">
          <div className="row">
            <div className="col-md-10 mx-auto">
              <Card sx={{ minWidth: 600 }}>
                <CardHeader
                  title={singledata.title}
                  subheader={`${singledata.date} ${singledata.time}`}
                />
                <CardMedia
                  component="img"
                  // height={1500}
                  // width={400}
                  image={`.${singledata.image}`}
                  alt="img"
                />
                <CardContent>
                  <Typography paragraph>{singledata.place}</Typography>
                  <Typography paragraph>{singledata.about}</Typography>
                  <Typography paragraph>{singledata.description}</Typography>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default PartyDetails