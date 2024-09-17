import React from "react";
import { signIn } from "../../auth";
import {GoogleButton} from '@/components/ui/googleButton'

export async function GoogleAuth(){
    return (
        <form  action={async () => {
            "use server"
            await signIn("google",{redirectTo:"/home"})
          }}>
            <GoogleButton />
        </form>
    )
}
