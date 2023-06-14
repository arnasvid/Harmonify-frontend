import React, { useState, useEffect } from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import SpotifyDashboardAPI from "../../api/SpotifyDashboardAPI";
import { CircularProgress, Typography, Box } from "@mui/material";

const MonthlyGenres = () => {
  const [topGenres, setTopGenres] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMonthlyGenres();
  }, []);

  const getMonthlyGenres = async () => {
    try {
      const res = await SpotifyDashboardAPI.getMonthlyGenres();
      const sortedGenres = res.sort((a: any, b: any) => b.count - a.count); // Sort genres by count in descending order
      const top5Genres = sortedGenres.slice(0, 5); // Get the top 5 genres
      // console.log("TOP 5 GENRES:", top5Genres);
      setTopGenres(top5Genres);
      setLoading(false);
    } catch (error: any) {
      console.error("error:", error.message);
      setLoading(false);
    }
  };

  const getChartData = (topGenres1: any) => {
    let res = {
      labels: topGenres1.map((genre: any) => genre.genre),
      datasets: [
        {
          data: topGenres1.map((genre: any) => genre.count),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
        },
      ],
    };
    return res;
  };

  return (
    <Box>
      {/* <Typography variant="h6" sx={{ marginBottom: "10px" }}>
        Top 5 Genres
      </Typography> */}
      {loading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "100px" }}
        >
          <CircularProgress size={72} />
        </Box>
      ) : (
        <Box>
          {topGenres.length > 0 ? (
            <Pie data={getChartData(topGenres)} />
          ) : (
            <Typography variant="body1">No genres available.</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default MonthlyGenres;
