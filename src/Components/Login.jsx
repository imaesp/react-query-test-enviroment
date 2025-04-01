import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function Login() {
  return (
    <div className='Login-modal'>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="sign-in-button">Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
    </div>
  )
}

export default Login