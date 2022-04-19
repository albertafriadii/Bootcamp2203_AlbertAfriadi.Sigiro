import React, {Component} from 'react';

class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count:0
        }
    }

    render() {
        return(
        <React.Fragment>
            <div>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    Tambah
                </button>
                <button onClick={() => this.setState({ count: this.state.count - 1 })}>
                    Kurang
                </button>
                <p>Quantity = {this.state.count}</p>
            </div>
        </React.Fragment>
        )
    }
}

export default Add