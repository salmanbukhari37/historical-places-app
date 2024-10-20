import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlacesStart, updateVisitedStart } from "../redux/placesSlice";
import { Place } from "../dto/types";
import PlaceItem from "./PlaceItem";
import { RootState } from "../redux/store";
import Loader from "./Loader";

const PlaceList = () => {
  const places = useSelector((state: any) => state.places.places);
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.places.loading);
  const [shuffledPlaces, setShuffledPlaces] = useState<Place[]>([]);
  const error = useSelector((state: RootState) => state.places.error);

  useEffect(() => {
    dispatch(fetchPlacesStart());
  }, [dispatch]);

  useEffect(() => {
    setShuffledPlaces(places);
  }, []);

  const markVisited = (id: number) => {
    dispatch({ type: "places/markVisited", payload: id });
    const place: Place = places.find((place: Place) => place.id === id);
    dispatch(updateVisitedStart({ id, visited: !place.visited }));
  };

  const suggestRandomPlace = () => {
    if (places.length === 0) return;

    const shuffledList = [...places].sort(() => 0.5 - Math.random());
    setShuffledPlaces(shuffledList);
  };

  if (loading) return <Loader />;

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="flex justify-center mb-6">
        <button
          onClick={suggestRandomPlace}
          className="bg-[#8B4513] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#6f3610] transition-colors duration-200 shadow-md"
        >
          Suggest Random Place
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6">
        {(shuffledPlaces.length > 0 ? shuffledPlaces : places).map(
          (place: Place) => (
            <PlaceItem key={place.id} place={place} markVisited={markVisited} />
          )
        )}
      </div>
    </>
  );
};

export default PlaceList;
