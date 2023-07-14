import React from 'react'
import Profile from '../component/core/Profile';
import Hobby1 from '../component/core/Hobby1';
import Hobby2 from '../component/core/Hobby2';
import Party from '../component/core/Party';
import Collage from '../component/core/Collage';
import Friends from '../component/core/Friends';
import AddFavourite from './AddFavourite';


const Main = () => {

    return (
        <>
       <AddFavourite/>
       <Profile/>
       <Hobby1/>
       <Hobby2/>
       <Collage/>
       <Party/>
       <Friends/>
     </>
    )
}

export default Main