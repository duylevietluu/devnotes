import { SignOutButton } from "@/app/enter/page"

const UserProfile = ({user}) => {
  return (
    <div className="box-center">
      <img src={user.photoURL ?? '/hacker.png'} alt="profile pic" className="card-img-center" />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName}</h1>
      <div className=" max-w-[200] mx-auto">
        <SignOutButton />
      </div>
      
    </div>
  )
}

export default UserProfile