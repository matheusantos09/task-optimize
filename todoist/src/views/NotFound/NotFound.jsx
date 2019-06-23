import React, {Component} from 'react'
import MasterLayout from "../../components/layouts/Master";

class NotFound extends Component {


    render() {
        return (
            <MasterLayout>
                <div className="pageNotFound">
                    <p className="zoom-area">Não encontramos o que você estava procurando. <br/> Use o menu lateral para ver as opções disponível </p>
                    <section className="error-container">
                        <span className="four"><span className="screen-reader-text">4</span></span>
                        <span className="zero"><span className="screen-reader-text">0</span></span>
                        <span className="four"><span className="screen-reader-text">4</span></span>
                    </section>
                </div>
            </MasterLayout>
        )
    }

}

export default NotFound