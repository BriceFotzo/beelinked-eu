import React, { Component } from 'react';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
        };

    }

    render() {
        return (
            <div className="row1">
                <div className="row align-items-start headJumbo">
                    <div className="jumbotron card">
                        <div className="text-white text-center py-5 px-4">
                            <div>
                                {/* <div className="bee"></div> */}
                                <h2 className="card-title h1-responsive pt-3 mb-5 font-bold jumboTilte"><strong>Beelinked, les ruches connectées</strong></h2>
                                <p className="mx-5 mb-5">
                                </p>
                                <a href="/apiculteurs" className="btn btn-outline-white btn-md"><i className="fas fa-clone left"></i> Mes apiculteurs</a>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}

export default Main