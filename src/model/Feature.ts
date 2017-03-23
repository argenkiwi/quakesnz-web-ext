import { Geometry } from "./Geometry";
import { Properties } from "./Properties";

export interface Feature {
    geometry: Geometry;
    properties: Properties;
}