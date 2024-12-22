import React from "react";
import Image from "next/image";
// import Button from "./components/common/Button/Button";
import Button from '@mui/material/Button';



const LandingPage = () => {
  const features = [
    {
      title: "Intuitive Dashboard",
      description:
        "Gain a clear overview of your tasks, deadlines, and productivity metrics in a visually engaging interface.",
      img: "/dashboard.jpg",
    },
    {
      title: "Task Categorization and Filtering",
      description:
        "Organize tasks by categories (e.g., To Do, In Progress, Done). Filter tasks by status, priority, assignee, or due date for efficient management.",
      img: "/cat.webp",
    },
    {
      title: "Collaborative Workspaces",
      description:
        "Seamlessly collaborate with teammates, share updates, and track progress in real-time within shared workspaces.",
      img: "/collab.jpeg",
    },
    {
      title: "Session Management and Security",
      description:
        "Robust user session management ensures proper access control and protects sensitive task data from unauthorized users.",
      img: "/secure.jpg",
    },
  ];
  return (
    <div className="bg-black text-white">
          <div
      className="flex flex-col items-center justify-center text-center text-white h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/back-1.jpg")' }}
    >
      
      {/* navigation bar for landing page */}
              <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-85 flex items-center gap-12 p-4 h-20">
                <Image src="/logo.png" alt="Logo" width={50} height={50} className="rounded-lg ml-12" />
                <h1 className="text-2xl font-bold">TaskMaster</h1>
                <div className="flex-grow flex justify-end gap-8  text-white pr-10">
                  <a href="/login" className="hover:text-red-600 hover:text-base">
                  Login
                  </a>
                  <a href="/signup" className="hover:text-red-600 hover:text-base">
                  SignUp
                  </a>
                  {/* <a href="/login" className="hover:text-red-600 hover:text-base">
                  <Button color="bg-red-400" text="Login"/>
                  </a>
                  <a href="/login" className="hover:text-red-600 hover:text-base">
                  <Button color="bg-red-400" text="SignUp"/>
                  </a> */}
                </div>
              </nav>
              
      {/* content */}
      {/* <h1 className="stro" >hi</h1> */}
      <h4 className="stroke2 text-2xl font-semibold transition duration-1000">Organize. Prioritize. Achieve with ease.</h4>
      <h1 className=" stroke1 text-4xl md:text-6xl font-bold  transition duration-2000 mx-auto w-3/4 pt-10">
      Effortlessly organize, prioritize, and achieve your goals with our intuitive task management solution designed for productivity and simplicity.
      </h1>
      
      <a href="/login">
      {/* <Button color="bg-red-500" text="Get started" /> */}
      <Button
  variant="contained"
  sx={{
    marginTop: '2rem', // Equivalent to Tailwind's mt-8
    backgroundColor: 'red',
    color: 'white',
    '&:hover': { backgroundColor: 'purple' },
  }}
>
  Get started
</Button>
      </a>
      
    </div>

    <section  id="features" className="py-16 bg-black text-white">
      <h1 className="text-4xl font-bold text-center mb-12">Key Features</h1>
      <div className="flex flex-wrap justify-center gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex gap-3 flex-wrap flex-col min-w-96 w-1/4  items-center text-center border border-white/30 rounded-2xl p-5 hover:border-white hover:bg-white/10 transition duration-300"
          >
            <Image
              src={feature.img}
              alt={feature.title}
              width={400}
              height={200}
              className="rounded-lg mb-5"
            />
            <h2 className="text-2xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-lg ">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
    </div>
    
  );
};

export default LandingPage;

