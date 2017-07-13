import Geometry from "./Geometry";
import Properties from "./Properties";

interface Feature {
    geometry: Geometry;
    properties: Properties;
}

export default Feature;