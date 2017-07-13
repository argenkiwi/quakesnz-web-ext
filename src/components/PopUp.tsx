import * as React from "react";
import Feature from "../model/Feature";
import { fetchQuakes } from "../fetch";
import Quake from "./Quake";

interface PopUpProps {
    mmi: number;
}

interface PopUpState {
    features: Feature[];
    error?: string;
}

class PopUp extends React.Component<PopUpProps, PopUpState> {
    constructor(props: PopUpProps) {
        super(props);
        this.state = {
            features: []
        };
    }

    componentDidMount() {
        fetchQuakes(this.props.mmi, features => this.setState({
            features: features,
            error: null
        }), error => this.setState({
            features: [],
            error: error
        }));
    }

    render() {
        const { features, error } = this.state;
        return features.length ? (
            <div>
                {features.map(feature =>
                    <Quake feature={feature} />
                )}
            </div>
        ) : <p>{error}</p>;
    }
}

export default PopUp;
