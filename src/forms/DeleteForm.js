import Icon from '@mdi/react';
import Confirmation from './Confirmation';
import { mdiTrashCanOutline } from '@mdi/js';
import { Button } from 'react-bootstrap';

export default function ItemDelete({ onDelete, delItemProps }) {
    
    const performDelete = async () => {
        console.log(`DelForm performDelete / delItemProps: ${delItemProps.name}`)

        const res = await fetch(`https://serversimplecrudapp-production.up.railway.app/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: delItemProps.id })
        });

        if (res.status >= 400) {
            console.log(`res error status >=400`); 

        } else {
            if (typeof onDelete === 'function') {
                onDelete(delItemProps.id);
            }
        }
    }

    return (
        <Confirmation
            title="Delete item"
            message="Do you really want to delete this item?"
            confirmText="Delete"
            onConfirm={performDelete}
        >
            <div>
                <Button
                    type="button" 
                    class="btn btn-primary"
                >
                    <Icon
                        path={mdiTrashCanOutline}
                        style={{ cursor: 'pointer', color: 'red' }}
                        size={0.8}
                    ></Icon>
                </Button>
            </div>
        </Confirmation>
    )
}