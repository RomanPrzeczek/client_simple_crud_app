import React, { useState, useEffect} from "react";
import {Card, Button} from "react-bootstrap";
import Icon from "@mdi/react";
import {
  mdiLoading,
  mdiInformationOutline 
} from "@mdi/js";

import DetailForm from "./forms/DetailForm";
import AddForm2 from "./forms/AddForm2";
import DeleteForm from "./forms/DeleteForm";
import UpdateForm from "./forms/UpdateForm";
import InfoPanel from "./forms/InfoPanel";

function MyDisplay2() {

  //// PARAMS -----------------------------------------------------------------------------------------------------------------
  // params of show list and detail
  const [detailModalShow, setDetailModalShow] = useState(false);
  const [item,setItem] = useState({
    id:"",
    name:""
  });
  const [listItemsCall, setListItemsCall] = useState({
    state: "inactive",
  });

  //const urlList = "http://localhost:8000/list";
  const urlList = "https://romi-simple-crud-server-25938ea88cea.herokuapp.com/list";

    //params of delete item
    const [delItem,setDelItem] = useState({
        id:"",
        name:""
    });

    //params of add item
    const [limit, setLimit] = useState("100");
    const [addItemShow, setAddItemShow] = useState({
      state: false,
    })

    //params of update item
    const [updateItemShow, setUpdateItemShow] = useState({
      state: false
    });

    // params of info panel showing
    const [infoShow, setInfoShow] = useState(false);

  //// HANDLERS -----------------------------------------------------------------------------------------------------------------
  // handler of show list 
  useEffect(() => {
    fetchList();
    fetchLimit();
    }
  , []);

  function fetchList () {
    fetch(urlList, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setListItemsCall({ state: "error", error: responseJson });
      } else {
        setListItemsCall({ state: "success", data: responseJson });
      }
    });
  }

  function fetchLimit () {
    //fetch("http://localhost:8000/limit")
    fetch("https://romi-simple-crud-server-25938ea88cea.herokuapp.com/limit")
      .then((res) => res.json())
      .then((data) => setLimit(data.BElimit));
  }

  function getItemsList() {
      switch (listItemsCall.state) {
      case "pending":
        return (
            <Icon size={1} path={mdiLoading} spin={true} /> 
      );   
      case "success":
        return (
          <div>
            {listItemsCall.data.map((dataObj) => {
              return (
                <Card>
                  <Card.Body>
                    <div class="container">
                      <div class="row">
                        <div class="col">
                          <span class="fs-3">{dataObj.name}</span>
                        </div>
                        <div class="col">
                          <Button
                            type="button" 
                            class="btn btn-primary"
                            onClick={() => handleDetail(dataObj.id)}
                          >
                            SHOW DETAIL
                          </Button>
                        </div>
                        <div class="col">
                          <Button 
                            type="button" 
                            class="btn btn-primary"
                            onClick={() => handleUpdateItemShow(dataObj)} // v origu se predava objekt ne id  
                          >
                            UPDATE
                          </Button>
                        </div>
                        <div class="col">
                        <DeleteForm
                          onDelete={() => handleDelete(dataObj.id)}
                          delItemProps={dataObj}
                        >
                          DELETE
                        </DeleteForm>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              )
          })}
        </div>
      );      
      default:
        return null;
    }
  };

  // handler show detail
  const handleShowDetail = () => setDetailModalShow(true);
  const handleCloseDetail = () => setDetailModalShow(false);

  const getResponse = async(id) => {
    //const response = await fetch(`http://localhost:8000/get/${id}`);
    const response = await fetch(`https://romi-simple-crud-server-25938ea88cea.herokuapp.com/get/${id}`);
    const body = await  response.json();
    //console.log("gotItem BODY>")
    //console.log(body);

    return body;
  }

  const handleDetail = async(id) => {
    const item = await getResponse(id);
    setItem(item);
    handleShowDetail();
 };

  // handler add item
  const handleAddGradeShow = (data) => {
    if (listItemsCall.state === "success" && listItemsCall.data.length < limit)
    setAddItemShow({ state: true, data }) 
    else alert(`Items amount (${listItemsCall.data.length}) has reached storage limit: ${limit}. Please delete any item.`)   
  }

  const handleGradeAdded = (addedItem) => {
    if (listItemsCall.state === "success") {
      let afterAdditemsList = [...listItemsCall.data]

      if (addedItem.id) {
        afterAdditemsList = afterAdditemsList.filter((g) => g.id !== addedItem.id)
        afterAdditemsList.push(addedItem);
        afterAdditemsList.sort(
          function(a, b) {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA > nameB) {
              return -1;
            }
            if (nameA < nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          }
        )
      }

      setListItemsCall({
        state: "success",
        data: [...afterAdditemsList],
      })
    }
  }

  // handler update item
  const handleUpdateItemShow = (data) => {
    setUpdateItemShow({ state: true, data });
  };

  const handleItemUpdated = (inUpdatedItem) => {
    if (listItemsCall.state === "success") {
      let updatedItemsList = [...listItemsCall.data];

      if (inUpdatedItem.id) {
        updatedItemsList = updatedItemsList.filter((g) => g.id !== inUpdatedItem.id);
        updatedItemsList.push(inUpdatedItem);
        updatedItemsList.sort(
          function(a, b) {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA > nameB) {
              return -1;
            }
            if (nameA < nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          }
        )
      }

      setListItemsCall({
        state: "success",
        data: [...updatedItemsList]
      });
    }
  }

  // handler delete item
  const getDelResponse = async(id) => {
    //const response = await fetch(`http://localhost:8000/get/${id}`);
    const response = await fetch(`https://romi-simple-crud-server-25938ea88cea.herokuapp.com/get/${id}`);
    const body = await  response.json();
    //console.log(`MyDisplay getDelResponse / fetch get id: ${body}`)
    return body;
  }

  const handleDelete = async(id) => {
    const item = await getDelResponse(id);
    setDelItem(item);
    //console.log(`MyDisplay handleDelete / delItem: ${delItem.name}`);
    fetchList()
 };

 // handler info card
 const handleShowInfo = () => setInfoShow(true);
 const handleCloseInfo = () => setInfoShow(false);

  return (
    <div>
      <DetailForm
        showProps={detailModalShow}
        onHideProps={handleCloseDetail}
        itemProps={item}
      />
      <AddForm2
        showProps={addItemShow.state}
        itemProps={addItemShow.data}
        setAddItemShowProps={setAddItemShow}
        onComplete={(grade) => handleGradeAdded(grade)}
      />
      <UpdateForm
        showProps={updateItemShow.state}
        updateItemProps={updateItemShow.data}
        setUpdateItemShow={setUpdateItemShow}
        onComplete={(updatedItem) => handleItemUpdated(updatedItem)}
      />
      <InfoPanel
        showProps={infoShow}
        onHideProps={handleCloseInfo}
      />
        <div class="container" >
          <center>
            <span class="fs-4">
              Simple JavaScript CRUD presentation.
            </span>
              <Button
                type="button"
                class="btn btn-outline-dark btn-sm"
                onClick={()=>handleShowInfo()}
              >
                <Icon path={mdiInformationOutline} size={1} />
              </Button>
           {getItemsList()}
            <div class="row height">
              <Button
                type="button"
                class="btn btn-primary btn-lg"
                variant="success" 
                onClick={() => handleAddGradeShow()}
              >
                ADD
              </Button>            
             </div>
          </center>
        </div>
    </div>)};
export default MyDisplay2;
