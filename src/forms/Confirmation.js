import { Popover, OverlayTrigger, Button } from 'react-bootstrap';

export default function Confirmation({ title, message, confirmText, onConfirm, children }) {
    const handleConfirm = () => {
        if (typeof onConfirm === "function") {
            onConfirm();
            handleClose();
        }
    }

    const handleClose = () => document.body.click();
    
    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">{title}</Popover.Header>
            <Popover.Body>
                {message}
{/*                 <div className='d-flex flex-column gap-2 mt-3 w-100'>
 */}                <div class="m-2">
                    <Button
                        type="button" class="btn btn-danger"
                        onClick={handleConfirm}
                    >
                        {confirmText}
                    </Button>

                    <Button 
                        variant='light'
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </div>
            </Popover.Body>
        </Popover>
    );

    return (
        <>
            <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={popover}
                rootClose
            >
                {children}
            </OverlayTrigger>
        </>
    );
}