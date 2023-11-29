import React from 'react'
import '../css/profile.css'

const UserProfile = () => {
    return (
        <div className='user-profile-wrapper'>
            Profile User

            <img src='/user-placeholder-pics.jpg' alt='user photo' className='user-photo' />

            <div className='user-detail-card'>
                <div className='user-info' >Nickname: <span>Davide</span></div>
                <div className='user-info'>Full name: <span>Davide Naccarati</span></div>
                <div className='user-info'>email: <span>davgio7@gmail.com</span></div>
                <div className='user-info'>registered: <span>28/11/2023</span> </div>
                <div className='user-info'>number of songs saved: <span>4</span></div>

            </div>
        </div>
    )
}

export default UserProfile