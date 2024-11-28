import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

export const SearchDialog = (open, handleDialogClose, products) => {
    return (
        <Dialog open={open} onClose={handleDialogClose}>
            <DialogTitle>Search Results</DialogTitle>
            <DialogContent>
                {/* You can customize this to display product details */}
                <div>

                        <ul>

                                <li >{products}</li>
                        </ul>

                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}