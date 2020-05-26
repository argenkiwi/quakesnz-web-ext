import * as React from "react";
import Feature from "../model/Feature";
import { fetchQuakes } from "../fetch";
import Quake from "./Quake";

interface PopUpProps {
    mmi: number;
}

const PopUp = (props: PopUpProps) => {
    const [features, setFeatures] = React.useState<Feature[]>([])
    const [error, setError] = React.useState<string>(null)

    React.useEffect(() => {
        fetchQuakes(props.mmi, features => {
            setFeatures(features)
            setError(null)
        }, error => {
            setFeatures([])
            setError(error)
        });
    }, [])

    return features.length ? (
        <div>
            {features.map(feature =>
                <Quake feature={feature} />
            )}
        </div>
    ) : <p>{error}</p>
}

export default PopUp;
