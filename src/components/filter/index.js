import React from 'react';
import { Grid, Typography, FormControlLabel, Checkbox } from '@mui/material';

const Filters = ({ filters, handleCheckboxChange }) => {
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
                        />
                    }
                    label="ventes terminées"
                />
            </Grid>
        </>
    );
};

export default Filters;
