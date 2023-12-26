import Movie from "./components/Movie";

const App = () => {
  return (
    <div className="h-full w-full bg-gray-400 text-white">
      <h1 className="text-xl flex justify-center pt-4">Movie-Details</h1>
      <Movie />
    </div>
  );
};

export default App;
