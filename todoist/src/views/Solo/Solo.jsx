import React, {Component} from 'react'
import MasterLayout from '../../components/layouts/Master'
import Tasks from '../../components/Task/Tasks'

class Solo extends Component {

    render() {
        return (
            <MasterLayout>

                <Tasks/>

            </MasterLayout>
        )
    }

}

export default Solo