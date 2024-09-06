import React, { useState } from "react";
import Imagen from "../Components/Imagen";
import { Box, Typography } from "@mui/material";
import CardGrid from "../Components/CardGrid";
import Zonas from "../Components/Zonas";
import ProvinceSelector from "../Components/ProvinceSelector";
function Home() {
  const [routes, setRoutes] = useState([]);
  const handleRoutesFetched = (fetchedRoutes) => {
    setRoutes(fetchedRoutes);
  };

  return (
    <div>
      <Box
        sx={{
          position: "relative",
          flexGrow: 1,
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <Imagen />
      </Box>

      <Box sx={{ marginTop: 2, padding: 2 }}>
        <ProvinceSelector onRoutesFetched={handleRoutesFetched} />{" "}
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{ marginBottom: 2 }}
        >
          Zonas
        </Typography>

        <Zonas rutas={routes} />
      </Box>

      <Box sx={{ marginTop: 6, padding: 2, marginBottom: 10 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{ marginBottom: 2 }}
        >
          Recomendaciones
        </Typography>
        <CardGrid />
      </Box>
    </div>
  );
}

export default Home;
