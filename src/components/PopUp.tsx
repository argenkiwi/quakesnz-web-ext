import * as React from "react";
import { Feature } from "../model/Feature";
import { Quake } from "./Quake";
import { fetchQuakes } from "../fetch";

export interface PopUpProps {
    mmi: number;
}

export interface PopUpState {
    features: Feature[];
    error?: string;
}

export class PopUp extends React.Component<PopUpProps, PopUpState> {
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
        return this.state.features.length ? (
            <div>
                {this.state.features.map((feature) =>
                    <Quake key={feature.properties.publicID}
                        geometry={feature.geometry}
                        properties={feature.properties} />
                )}
            </div>
        ) : <p>{this.state.error}</p>;
    }
}