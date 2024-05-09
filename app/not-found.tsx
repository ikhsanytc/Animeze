import Navbar from "./components/Navbar";
import Provider from "./components/Provider";

function NotFound() {
  return (
    <Provider center>
      <Navbar back={-1} />
      <div className="bg-black w-full md:w-1/2 p-3 rounded-lg text-white text-center">
        <h1 className="text-2xl lg:text-3xl font-bold">Sorry, Not Found!</h1>
        <p className="pt-2">The page you are looking for is not found.</p>
      </div>
    </Provider>
  );
}

export default NotFound;
