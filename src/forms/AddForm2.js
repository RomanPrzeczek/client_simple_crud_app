import { useState, useEffect } from "react"
import Icon from "@mdi/react"
import { mdiLoading } from "@mdi/js"
import { Modal, Form, Button } from "react-bootstrap"

export default function AddForm2({
    showProps,
    itemProps,
    setAddItemShowProps,
    onComplete,
}) {
  const defaultForm = {
    name: ""
  }

  const [formData, setFormData] = useState(defaultForm)
  const [addItemCall, setAddItemCall] = useState({
    state: "inactive",
  })

  useEffect(() => {
      setFormData(defaultForm)    
  }, [itemProps])

  const handleClose = () => {
    setAddItemShowProps({ state: false })
    setFormData(defaultForm)
  }

  const setField = (name, val) => {
    return setFormData((formData) => {
      const newData = { ...formData }
      newData[name] = val
      return newData
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()
    e.stopPropagation()

    const payload = {
      ...formData,
      id: null
    }

    setAddItemCall({ state: "pending" })

    const res = await fetch(
      //`http://localhost:8000/create`,
      `https://romi-simple-crud-server-25938ea88cea.herokuapp.com/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )

    const data = await res.json()

    if (res.status >= 400) {
        setAddItemCall({ state: "error", error: data })
    } else {
        setAddItemCall({ state: "success", data })

      if (typeof onComplete === "function") {
        onComplete(data)
      }

      handleClose()
    }
  }

  return (
    <>
      <Modal show={showProps} onHide={handleClose}>
        <Form
          onSubmit={(e) => handleSubmit(e)}
        >
          <Modal.Header closeButton>
            <Modal.Title>{"Add"} item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                Enter a name with a maximum length of 20 characters
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex flex-row justify-content-between align-items-center w-100">
              <div>
                {addItemCall.state === "error" && (
                  <div className="text-danger">
                    Error: {addItemCall.error.errorMessage}
                  </div>
                )}
              </div>
              <div className="d-flex flex-row gap-2">
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={addItemCall.state === "pending"}
                >
                  {addItemCall.state === "pending" ? (
                    <Icon size={0.8} path={mdiLoading} spin={true} />
                  ) : (
                    "Add"
                  )}
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
