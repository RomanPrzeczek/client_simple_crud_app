import {Modal} from "react-bootstrap";

function InfoPanel({showProps,onHideProps}) {
    return (
    <>
    <Modal
      show={showProps}
      onHide={onHideProps}
    >
      <Modal.Header closeButton>
          <Modal.Title>Application info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div class="container">      
        <div class="row">
            <p class="fs-5">
              Application demonstrates basic CRUD operation on the list of items.<br/>
              Items have only 1 parameter: name.<br/>
              Name is validated on its length.<br/>
              Amount of stored items is limited on BE side.
            </p>
        </div>
        <div class="row">
            <span class="fs-3">
              <h2>Used technologies:</h2>
            </span>
        </div>
        <div class="row">
          <div class="col">
            <span class="fs-3">
              <h3>FE:</h3>
            </span>
          </div>
          <div class="col">
            <span class="fs-3">
              React in-built FETCH API, BOOTSTRAP, MDI icons
            </span>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span class="fs-3">
              <h3>BE:</h3>
            </span>
          </div>
          <div class="col">
            <span class="fs-3">
              Node, Express, FileSystem local storage
            </span>
          </div>
        </div>
      </div>                
      </Modal.Body>
      <Modal.Footer>                    
      </Modal.Footer>
    </Modal>
    </>
    )
  }
  
  export default InfoPanel;