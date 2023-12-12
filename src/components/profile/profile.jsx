import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../context/AuthContext";
import '../../css/profile.css'

const UserProfile = () => {
    const auth = useContext(AuthContext);
    const { authState } = auth;
    const [userProfile, setUserProfile] = useState('')
    const [numberOfSong, setNumberOfSong] = useState('')
    console.log(authState)
    useEffect(() => {
        fetch(`${process.env.VITE_API_URL}/user/${authState.userInfo.email}`)
            .then((res) => res.json())
            .then((data) => {
                setNumberOfSong(data.numberOfSong)
                setUserProfile(data.userInfo)
            });
    }, [authState.userInfo._user]);

    const dateFormat = (inputDate) => {
        const dateObject = new Date(inputDate);
        console.log(dateObject.toLocaleString('en-GB'))
        const formattedDate = `${dateObject.getUTCDate()}/${dateObject.getUTCMonth() + 1}/${dateObject.getUTCFullYear()}`;
        return formattedDate
    }

    return (
        <div className='user-profile-wrapper'>
            User Profile

            <img src='/user-placeholder-pics.jpg' alt='user photo' className='user-photo' />
            {userProfile && userProfile.map(user => (
                <div className='user-detail-card'>
                    <div className='user-info' >Nickname: <span>{user.nickName}</span></div>
                    <div className='user-info'>Full name: <span>{user.firstName}</span></div>
                    <div className='user-info'>email: <span>{user.email}</span></div>
                    <div className='user-info'>registered: <span>{dateFormat(user.dataSaved)}</span> </div>
                    <div className='user-info'>number of songs saved: <span>{numberOfSong}</span></div>

                </div>
            )

            )}

        </div>
    )
}

export default UserProfile