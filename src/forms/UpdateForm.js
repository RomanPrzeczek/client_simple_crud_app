import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';
import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export default function UpdateForm({showProps, setUpdateItemShow, updateItemProps, onComplete}) {
  const defaultForm = {
    name: ""
  };
  const [formData, setFormData] = useState(defaultForm);
  const [itemUpdateCall, setItemUpdateCall] = useState({
    state: 'inactive'
  });

  useEffect(() => {
    if (updateItemProps) {
      setFormData({
        name: updateItemProps.name
      });
    } else {
      setFormData(defaultForm);
    }
  }, [updateItemProps]);

  const handleClose = () => {
    setUpdateItemShow({ state: false });
    setFormData(defaultForm);
  };

  const setField = (name, val) => {
    return setFormData((formData) => {
      const newData = { ...formData };
      newData[name] = val;
      return newData;
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    e.stopPropagation();

    const payload = {
      ...formData,
      id: updateItemProps.id
    };

    setItemUpdateCall({ state: 'pending' });
    //const res = await fetch(`http://localhost:8000/update`, {
    const res = await fetch(`https://romi-simple-crud-server-25938ea88cea.herokuapp.com/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.status >= 400) {
      setItemUpdateCall({ state: "error", error: data });
    } else {
      setItemUpdateCall({ state: "success", data });

      if (updateItemProps && typeof onComplete === 'function') onComplete(data)

      handleClose(); 
    }
  };

  return (
    <>
      <Modal show={showProps} onHide={handleClose}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Modal.Header closeButton>
            <Modal.Title>{'Update'} item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <br />
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setField("name", e.target.value)}
                maxLength={20}
                required
              />
              <Form.Control.Feedback type="invalid">
                Specify name max 20 letters long.
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex flex-row justify-content-between align-items-center w-100">
              <div>
                {itemUpdateCall.state === 'error' &&
                  <div className="text-danger">Error: {itemUpdateCall.error.errorMessage}</div>
                }
              </div>
              <div className="d-flex flex-row gap-2">
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  {itemUpdateCall.state === 'pending' ? (
                    <Icon size={0.8} path={mdiLoading} spin={true} />
                  ) : (
                    'Update'
                  )}
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
