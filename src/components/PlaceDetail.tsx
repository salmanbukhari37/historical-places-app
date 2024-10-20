import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Place } from "../dto/types";
import { Helmet } from "react-helmet";
import { fetchPlacesStart } from "../redux/placesSlice";
import { useEffect } from "react";
import NotFound from "./NotFound";
import Loader from "./Loader";

const PlaceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const place = useSelector((state: RootState) =>
    state.places.places.find((p: Place) => p.id === Number(id))
  );

  const loader = useSelector((state: RootState) => state.places.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlacesStart());
  }, [dispatch]);

  const imageUrl = place
    ? `${process.env.REACT_APP_IMAGE_URL}${place.imageUrl}`
    : "";

  if (loader) return <Loader />;

  if (!place) return <NotFound />;

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-4">
      {/* Helmet for Dynamic Title */}
      <Helmet>
        <title>{place.name} - Historical Places</title>
      </Helmet>

      <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full md:max-w-3xl">
        {/* Image Section */}
        <img
          src={imageUrl}
          alt={place.name}
          className="w-full h-64 object-cover"
        />

        {/* Content Section */}
        <div className="p-6">
          <h2 className="text-4xl font-bold text-gray-800">{place.name}</h2>

          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            {place.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;
