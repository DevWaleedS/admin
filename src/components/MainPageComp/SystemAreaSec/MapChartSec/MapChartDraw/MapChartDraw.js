import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  Marker,
} from "react-simple-maps";

const markers = [
  {
    markerOffset: -0,
    coordinates: [69.82777303392899, 125.47377745046926],
  },
  { markerOffset: 15, coordinates: [29.4972149504693, 29.916852233070163] },
  { markerOffset: 15, coordinates: [-24.826624956562167, 133.55971495046927] },
  { markerOffset: 15, coordinates: [-110.866218006556394, 45] },
  { markerOffset: 15, coordinates: [-74.0721, 4.711] },
  { markerOffset: 15, coordinates: [-78.4678, -0.1807] },
];

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const MapChartDraw = ({ colors }) => {
  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147,
      }}
    >
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />(
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={"rgba(0,0,0,0.15)"}
              />
            );
          })
        }
      </Geographies>
      )
      {markers.map(({ name, coordinates, markerOffset }, idx) => (
        <Marker key={name} coordinates={coordinates}>
          <g
            fill="none"
            stroke={colors[idx]}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(-24, -24), scale(2)"
          >
            <circle cx="12" cy="10" r="3" />
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
          </g>
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {name}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default MapChartDraw;
