import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Icon from "@mdi/react";
import {
  mdiClose
} from "@mdi/js";


export default function AddUpdateForm({itemProps, showProps, onHideProps, onComplete, setaddUpdateModalShowProps}) {
  
  const defaultForm = {
    name: ""
  };
  const [formData, setFormData] = useState(defaultForm);



  const handleClose = () => {
    setaddUpdateModalShowProps({ state: false });
    setFormData(defaultForm);
  };


  const setField = (name, val) => {
    return setFormData((formData) => {
      const newData = { ...formData };
      newData[name] = val;
      return newData;
    });
  };

  const fetchCreate = async(payload) => await fetch(`http://localhost:8000/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });

  const handleSubmit = async (item,e) => {

    e.preventDefault();
    e.stopPropagation();

    const payload = {
      ...formData,
    };

    fetchCreate(payload);

    if (item && typeof onComplete === 'function') onComplete(item)

    handleClose();
  };

  return (
    <>
      <Modal 
        show={showProps}
        onHide={onHideProps}
        item={itemProps}
        class={"hidden"}
      >
      <Modal.Header closeButton>
        <Modal.Title>{'Add'} item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Item name:</Form.Label>
          <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setField("name", e.target.value)}
                minLength={1}
                required
          />
          <Form.Control.Feedback type="invalid">
            Name can not be empty.
          </Form.Control.Feedback>
        </Form.Group>      
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button" 
          class="btn btn-primary"
          onClick={
            (e) => handleSubmit(formData,e)
          }
        >
          SUBMIT
        </Button>  
        <div className="d-flex flex-row gap-2">
            <Button
              variant="light"
              className="text-muted"
              onClick={onHideProps}
            >
              <div className="d-flex flex-row gap-1 align-items-center">
                <Icon path={mdiClose} size={1}></Icon>
                <span>Close</span>
              </div>
            </Button>
            </div>                
      </Modal.Footer>  
      </Modal>
    </>
  );
}
