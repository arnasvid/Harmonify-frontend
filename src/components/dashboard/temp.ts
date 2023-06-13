
// <TabPanel value={value} index={1}>
//   <Box
//     sx={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       padding: "20px",
//       backgroundColor: "#f9f9f9",
//     }}
//   >
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "row",
//         alignItems: "flex-start", // Adjust alignment if needed
//         justifyContent: "center",
//         marginBottom: "20px",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           marginRight: "40px",
//         }}
//       >
//         <Typography variant="h6">Top 5 Artists</Typography>
//         {monthlyArtist && (
//           <Box sx={{ display: "flex" }}>
//             {monthlyArtist.items.map((artist: ArtistObject, index: number) => (
//               <div
//                 key={index}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   marginRight: "20px", // Add margin if needed
//                   marginBottom: "10px",
//                 }}
//               >
//                 <Typography
//                   sx={{ marginRight: "10px", fontWeight: "bold" }}
//                 >
//                   {index + 1}
//                 </Typography>
//                 <div>
//                   <Typography>{artist.name}</Typography>
//                   <img
//                     src={artist.images[0].url}
//                     alt={artist.name}
//                     style={{ width: "100px", height: "100px" }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </Box>
//         )}
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Typography variant="h6">Top 5 Songs</Typography>
//         {monthlySong && (
//           <Box sx={{ display: "flex" }}>
//             {monthlySong.items.map((song: TrackObject, index: number) => (
//               <div
//                 key={index}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   marginRight: "20px", // Add margin if needed
//                   marginBottom: "10px",
//                 }}
//               >
//                 <Typography
//                   sx={{ marginRight: "10px", fontWeight: "bold" }}
//                 >
//                   {index + 1}
//                 </Typography>
//                 <div>
//                   <Typography>{song.name}</Typography>
//                   <img
//                     src={song.album.images[0].url}
//                     alt={song.name}
//                     style={{ width: "100px", height: "100px" }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </Box>
//         )}
//       </Box>
//     </Box>
//   </Box>
// </TabPanel>
