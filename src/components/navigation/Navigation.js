import React from 'react';


//pure function with no state
const Navigation = ({ onRouteChange, isSignedIn }) => {
        //if user is signed in, display sign out link
        if(isSignedIn) {
            return (
                //navigation for home screen
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
                </nav>
            );
            
        } else {
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                    <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
                </nav>
            );
        }
}
        

export default Navigation;