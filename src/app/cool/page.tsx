export default function Kewl() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#decaff] text-white ">
      {/* 
      Write something unique about you here! 
      It could be a club you're part of, a weird skill you have, or something special that happened to you.
      Feel free to put links, images, whatever! 
      Don't worry about styling- we aren't grading you on this- it's just to get to know you better! :) 
      */}
      <div className="m-20 text-[#0D0E0E] flex flex-col gap-2">
        <p className="text-xl text-[#0D0E0E]">This was my intro card I made last semester which I am proud of. The main point is that I like making papercrafts (3d paper models) some of which are on my portfolio:</p>
        <a className="underline text-3xl mx-auto hover:text-primary" href="https://hebe3834.github.io/#/crafts">💥❗💥❗ LINK 💥❗💥❗</a>
      </div>
      <img src="/HebeCard.png" alt="hb" className="mb-10"/>

    </div>
  );
}
