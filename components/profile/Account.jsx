"use client";
import ProfileCard from "./ProfileCard";

const account = ({ user }) => {
  return (
    <div>
      <ProfileCard user={user} />
    </div>
  );
};

export default account;
