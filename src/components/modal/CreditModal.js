import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import UtilisateurService from "../../service/utilisateurService";

function CreditModal({ open, onClose, userId }) {
    const [credit, setCredit] = useState(0);

    useEffect(() => {
        if (open) {
            setCredit(0);
        }
    }, [open]);

    const handleSubmit = () => {
        const money = {
            id: userId,
            money: parseInt(credit)
        };

        UtilisateurService.addcredit(money)
            .then(() => {
                onClose();
                alert('Crédit ajouté avec succès');
            })
            .catch(error => {
                alert('Erreur lors de l\'ajout de crédit: ' + error.message);
            });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4 }}>
                <Typography variant="h6" component="h2">
                    Ajouter Crédits a {userId}
                </Typography>
                <TextField
                    fullWidth
                    label="Nombre de crédits"
                    type="number"
                    value={credit}
                    onChange={e => setCredit(e.target.value)}
                    margin="normal"
                />
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Soumettre
                </Button>
            </Box>
        </Modal>
    );
}

export default CreditModal;
