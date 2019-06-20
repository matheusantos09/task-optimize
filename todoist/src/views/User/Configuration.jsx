import React, {Component} from 'react'
import MasterLayout from "../../components/layouts/Master";

class Configuration extends Component{

    render() {
        return(
            <MasterLayout>
                <form action="">

                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input type="text" name="name" id="name"/>
                </div>

                </form>
            </MasterLayout>
        )
    }
}

export default Configuration