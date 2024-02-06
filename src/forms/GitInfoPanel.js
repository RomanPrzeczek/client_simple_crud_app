import {Modal} from "react-bootstrap";

function GitInfoPanel({showProps,onHideProps}) {
    return (
    <>
    <Modal
      show={showProps}
      onHide={onHideProps}
    >
      <Modal.Header closeButton>
          <Modal.Title>Source code links on GitHub</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div class="container">      
        <div class="row">
            <a href="https://github.com/RomanPrzeczek/client_simple_crud_app" target="_blank">https://github.com/RomanPrzeczek/client_simple_crud_app</a><br/>
        </div>
        <div class="row">
            <a href="https://github.com/RomanPrzeczek/server_simple_crud_app" target="_blank">https://github.com/RomanPrzeczek/server_simple_crud_app</a><br/>
        </div>
      </div>                
      </Modal.Body>
      <Modal.Footer>                    
      </Modal.Footer>
    </Modal>
    </>
    )
  }
  
  export default GitInfoPanel;