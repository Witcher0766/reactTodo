import React, { useEffect, useState } from "react";
import todo from "../images/todo.jpg";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';


const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    
    if(list) {
        return JSON.parse(localStorage.getItem('lists'));
    }
    else {
        return [];
    }
}

const Todo = () => {

    const [initial, update] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [toggle, settoggle] = useState(true);

    const [isEditItem, setEditItem] = useState(null);

    const changeEvent = (e) =>{
        update(e.target.value);
    }


    // add items
    const addItems = () => {
        if(!initial){
            alert("Add some todo");
        }
        else if(initial && !toggle) {
            setItems(
                items.map((elem) => {
                    if(elem.id === isEditItem){
                        return {...elem, name: initial}
                    }
                    return elem;
                })
            )
            settoggle(true);
            update('');
            setEditItem(null);
        }
        else {
            const alldata = {id: new Date().getTime().toString(), name:initial};
            setItems([...items, alldata]);
            // setItems([...items, initial]);
            update('');
        }
    }

    // delete items
    const deleteItem = (index) => {
        const updateItems = items.filter((elem) => {
            return index != elem.id;
        });
        setItems(updateItems);
    }

    // remove all 
    const removeAll = () => {
        setItems([]);
    }


    // edit item

    const edititem = (id) =>{
        let newEditItem = items.find((elem) => {
            return elem.id === id;
        });
        // console.log(newEditItem);
        settoggle(false);
        update(newEditItem.name);
        setEditItem(id);
    }

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);

    return (
        <>
        <div className="main-div">
        <div className="child-div">
            <figure>
                <img src={todo} alt="todo-img" />
                <figcaption>Add some todo 🤞</figcaption>
            </figure>


            <div className="add-items">
                <input type="text" placeholder= "✍️ Add items" value={initial} onChange={changeEvent} />

                {
                    toggle ? <span className="add" onClick={addItems}  ><AddToPhotosIcon/></span>:
                <span className="add" onClick={addItems} ><DriveFileRenameOutlineIcon/></span>
                }
            </div>

            <div className="show-items" >
            {
                items.map((elem) => {
                    return (
                        <div className="each-item" key={elem.id}>
                <h3>{elem.name}</h3>
                <span className="delete" onClick={() => deleteItem(elem.id)} ><DeleteIcon/></span>
                <span className="edit" onClick={() => edititem(elem.id)} ><DriveFileRenameOutlineIcon/></span>
            </div>
                    )
                })
            }
            </div>

            <div className="show-items">
                <button className="btn" onClick={removeAll}><span>Remove All</span></button>
            </div>
        </div>

        </div>
        </>
    )
}

export default Todo;