import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Place } from "../dto/types";

interface PlaceItemProps {
  place: Place;
  markVisited: (id: number) => void;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ place, markVisited }) => {
  const [enabled, setEnabled] = useState(place.visited);

  const imageUrl = place
    ? `${process.env.REACT_APP_IMAGE_URL}${place.imageUrl}`
    : "";

  useEffect(() => {
    setEnabled(place.visited);
  }, [place.visited]);

  return (
    <Link to={`/place/${place.id}`} className="block">
      <div className="relative rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
        {/* Image */}
        <img
          src={imageUrl}
          alt={place.name}
          className="w-full h-64 object-cover"
        />

        {/* Overlay with title and switch */}
        <div className="absolute top-0 left-0 w-full bg-black bg-opacity-60 p-4 flex justify-between items-center">
          {/* Title Link */}
          <Link
            to={`/place/${place.id}`}
            className="text-white hover:text-blue-400"
          >
            <h3 className="text-xl font-bold">{place.name}</h3>
          </Link>

          {/* Switch for marking visited */}
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm">
              {enabled ? "Marked as Visited" : "Mark as Visited"}
            </span>
            <Switch
              checked={enabled}
              onChange={(checked) => {
                setEnabled(checked);
                markVisited(place.id);
              }}
              className={`${
                enabled ? "bg-blue-600" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
            >
              <span
                className={`${
                  enabled ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaceItem;
