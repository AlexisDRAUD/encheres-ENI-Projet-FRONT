import {Checkbox, FormControlLabel, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";

const Filters = ({ filters, handleCheckboxChange }) => {
    const [categoryDisabled, setCategoryDisabled] = useState({
        sales: false,
        bids: false,
    });

    useEffect(() => {
        const { openBids, ongoingBids, wonBids } = filters;
        const { ongoingSales, notStartedSales, completedSales } = filters;

        // Si un des filtres d'enchères est coché, désactiver les filtres de ventes
        setCategoryDisabled((prevDisabled) => ({
            ...prevDisabled,
            sales: openBids || ongoingBids || wonBids,
        }));

        // Si un des filtres de ventes est coché, désactiver les filtres d'enchères
        setCategoryDisabled((prevDisabled) => ({
            ...prevDisabled,
            bids: ongoingSales || notStartedSales || completedSales,
        }));
    }, [filters]);

    return (
        <>
            <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                    Achats
                </Typography>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filters.openBids}
                            onChange={handleCheckboxChange}
                            name="openBids"
                            disabled={categoryDisabled.bids} // Désactiver si un filtre d'enchères est coché
                        />
                    }
                    label="enchères ouvertes"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filters.ongoingBids}
                            onChange={handleCheckboxChange}
                            name="ongoingBids"
                            disabled={categoryDisabled.bids} // Désactiver si un filtre d'enchères est coché
                        />
                    }
                    label="mes enchères en cours"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filters.wonBids}
                            onChange={handleCheckboxChange}
                            name="wonBids"
                            disabled={categoryDisabled.bids} // Désactiver si un filtre d'enchères est coché
                        />
                    }
                    label="mes enchères remportées"
                />
            </Grid>
            <Grid item xs={6}>
                <Typography variant="subtitle1" gutterBottom>
                    Mes ventes
                </Typography>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filters.ongoingSales}
                            onChange={handleCheckboxChange}
                            name="ongoingSales"
                            disabled={categoryDisabled.sales} // Désactiver si un filtre de ventes est coché
                        />
                    }
                    label="mes ventes en cours"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filters.notStartedSales}
                            onChange={handleCheckboxChange}
                            name="notStartedSales"
                            disabled={categoryDisabled.sales} // Désactiver si un filtre de ventes est coché
                        />
                    }
                    label="ventes non débutées"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filters.completedSales}
                            onChange={handleCheckboxChange}
                            name="completedSales"
                            disabled={categoryDisabled.sales} // Désactiver si un filtre de ventes est coché
                        />
                    }
                    label="ventes terminées"
                />
            </Grid>
        </>
    );
};

export default Filters;