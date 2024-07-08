import HomeImg from '../../assets/Home.jpeg'

export default function Hero(props) {
  return (
    <div className="relative h-screen overflow-hidden">
      <img
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
        src={HomeImg}
        alt="hero-background"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-400 to-pink-500 text-transparent bg-clip-text animate-pulse">
            GitFinder
          </span>
        </h1>
        <h4 className="text-xl md:text-2xl text-blue-200 font-light mb-12">
          Show <span className="font-serif italic">what</span> you are,{" "}
          <span className="font-serif italic">where</span> it is needed.
        </h4>
        <div className="space-y-8">
          <h3 className="text-2xl text-blue-300 font-semibold">
            Feeling Excited?
          </h3>
          <button
            onClick={props.authenticateUser}
            className="px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full hover:from-pink-600 hover:to-purple-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Let's go! 🚂
          </button>
        </div>
      </div>
    </div>
  );
}