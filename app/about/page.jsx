'use static';

const AboutPage = () => {
  return (
    <>
        <h1>Welcome to DevNotes!</h1>
        <div className="flex flex-row justify-center">
          <button className="btn-blue" >
            <a href="https://github.com/duylevietluu/devnotes" target="blank">
              Github Repo
            </a>
          </button>
          <button className="btn-red" >
            <a href="https://github.com/duylevietluu" target="blank">
              GitHub Profile
            </a>
          </button>
        </div>
      
        <p className="card">
          DevNotes is a simplistic version of Dev.To, a platform designed for developers to share their knowledge and connect with others in the tech community. As a college student, I embarked on this side project to enhance my coding skills and create a space where developers can easily share their thoughts, ideas, and experiences. 
          <br /><br />
          <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--LIUaBMsX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_775/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nvnn1v19miftcw8krm1q.png" alt="DevTo" className="mx-auto" width="500"/>
          <br /> <br />
          With DevNotes, you can create posts, engage in discussions, and learn from fellow developers. It is a platform where you can contribute your expertise, seek assistance, and foster a supportive community.
        </p>
        
        
        
        <p className="card">
          The technology stack used in building DevNotes includes Next.js for the frontend, Firebase for the backend, and Vercel for deployment. This combination provides a powerful and seamless experience for users.
          <br /> <br />
          <img src="https://blog.logrocket.com/wp-content/uploads/2021/01/full-stack-app-nextjs-firebase-cloud-firestore-nocdn.png" alt="tech stack image" width="500" className="mx-auto" />
          <br /><br />
          As a college student, I am eager to showcase my passion for coding and dedication to expanding my skills. DevNotes represents my commitment to learning and pushing the boundaries of what I can achieve as a developer.
          <br /><br />
          I am constantly working on improving DevNotes and adding new features to enhance the user experience. Thank you for visiting DevNotes! Feel free to explore the platform, create posts, and engage with other developers. If you have any feedback or suggestions, please don't hesitate to reach out. Together, let's build a thriving community of knowledge sharing and innovation.
        </p>
        
        <p className="text-center italic">Happy coding!<br/>Duy Le</p>

    </>
  )
}

export default AboutPage