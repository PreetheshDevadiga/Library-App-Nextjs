import React from "react";
import EditProfile from "../../../components/profile/editProfile";
import { fetchUserDetails } from "../../../lib/action";
import { IMember } from "../../../models/member.model"

export default async function editProfile() {
    const userDetails = await  fetchUserDetails();
    const userInformation : IMember | undefined =userDetails?.userDetails;

    return (
        
        <>
        <EditProfile userInformation={userInformation}/>
        </>
    )
}
