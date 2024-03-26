import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { Product } from "../declarations";
import { AppContext } from "../Context";

interface Props {
  product: Product;
}
export default function ItemModify({ product }: Props) {
  const { handleEditProduct } = useContext(AppContext);
  const [editedFields, setEditedFields] = useState({
    title: product.title,
    price: product.price,
    image: product.image,
    quantity: product.quantity,
    description: product.description,
  });
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFieldChange = (field: string, value: string | number) => {
    setEditedFields((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleEditButtonClick = () => {
    handleEditProduct(product.id, editedFields);
  };

  return (
    <>
      <Button color="inherit" onClick={handleOpen}>
        Modifica
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            type="text"
            placeholder="Titolo"
            value={editedFields.title}
            onChange={(e) => handleFieldChange("title", e.target.value)}
          />
          <TextField
            type="number"
            placeholder="Prezzo"
            value={editedFields.price}
            onChange={(e) =>
              handleFieldChange("price", parseFloat(e.target.value))
            }
          />
          <TextField
            type="number"
            placeholder="Quantità"
            value={editedFields.quantity}
            onChange={(e) =>
              handleFieldChange("quantity", parseInt(e.target.value))
            }
          />
          <TextField
            type="text"
            placeholder="URL Immagine"
            value={editedFields.image}
            onChange={(e) => handleFieldChange("image", e.target.value)}
          />
          <TextField
            type="text"
            placeholder="Descrizione"
            value={editedFields.description}
            onChange={(e) => handleFieldChange("description", e.target.value)}
          />
          <Button onClick={handleClose}>CHIUDI</Button>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ position: "absolute", top: 0, left: 0, zIndex: 999 }}
            onClick={handleEditButtonClick}
          >
            Modifica
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
