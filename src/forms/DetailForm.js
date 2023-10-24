import {Modal} from "react-bootstrap";

function DetailForm({showProps,onHideProps,itemProps}) {
    return (
    <>
    <Modal
      show={showProps}
      onHide={onHideProps}
      item={itemProps}
      class={"hidden"}
    >
      <Modal.Header closeButton>
          <Modal.Title>Item detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
            <div>
                <span className="text-muted">Id: </span>
                <b>{itemProps.id}</b>
            </div>
            <div>
                <span className="text-muted">Name: </span>
                <b class="fs-3">{itemProps.name}</b>
            </div>
        </div>                
      </Modal.Body>
      <Modal.Footer>                    
      </Modal.Footer>
    </Modal>
    </>
    )
  }
  
  export default DetailForm;