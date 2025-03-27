import { useContext, useEffect, useState } from "react";
import { addRating, getAverageRating, getTotalRatings, hasUserRatedSeries } from "../../api/api";
import { Button, message, Rate, Tooltip } from "antd";
import "./Rating.css";
import { UserContext } from "../../login/UserContext";

const Rating = ({ seriesId }) => {
  const [userRating, setUserRating] = useState(0); // User's selected rating
  const [loading, setLoading] = useState(true);
  const [totalRatings, setTotalRatings] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [lastSubmittedRating, setLastSubmittedRating] = useState(null);


  const { user } = useContext(UserContext);


  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const avgRating = await getAverageRating(seriesId); // Fetch average rating
        const count = await getTotalRatings(seriesId); // Fetch total ratings count
        setUserRating(avgRating || 0);
        setTotalRatings(count || 0);

        if (user) {
          const isAdminUser = user.roles?.includes("ROLE_ADMIN");
          setIsAdmin(isAdminUser);
  
          if (!isAdminUser) {
            const rated = await hasUserRatedSeries(seriesId);
            setHasRated(rated);
          }
        }
      } catch (error) {
        message.error("Failed to load rating data.");
        console.error("Failed to fetch average rating.");
      } finally {
        setLoading(false);
      }
    };

    fetchAverageRating();
  }, [seriesId, user]);

  const handleRatingChange = async (value) => {
     // Prevent accidental clear-click (AntD sends 0 if you click the same rating again)
  if (value === 0) {
    message.info("Click a different rating to update your feedback.");
    return;
  }

   // Optional: prevent submitting the same rating twice in a row
   if (value === lastSubmittedRating && isAdmin) {
    message.info("You've already submitted this rating.");
    return;
  }

    try {
      console.log("Sending rating to backend:", value);

      setLastSubmittedRating(value);
      setUserRating(value);
      await addRating(seriesId, value); // Submit the rating automatically
      const avgRating = await getAverageRating(seriesId); // Refresh the average rating if needed
      const count = await getTotalRatings(seriesId); // Refresh total ratings count
      setUserRating(avgRating || 0); // Update displayed rating
      setTotalRatings(count || 0); // Update total ratings count

      if (!isAdmin) {
        setHasRated(true);
      }
      //   message.success("Thank you for your feedback!");
    } catch (error) {
      message.error("Failed to submit rating.");
    }
  };

  const descriptions = [
    "Terrible, wasted time",
    "Disappointing, could be better",
    "Decent, watchable",
    "Great, worth watching",
    "Amazing, must-watch",
  ];



  return (
    <div style={{ textAlign: "center", marginTop: 15 }}>
      {!loading && (
        <Tooltip title={
    !user
      ? "Please log in to rate this series."
      : hasRated && !isAdmin
      ? "You’ve already rated this series."
      : ""
  }>
        <div>
          <Rate
            allowHalf
            value={userRating}
            style={{ color: "white" }}
            tooltips={descriptions}
            onChange={handleRatingChange}
            disabled={!user || (hasRated && !isAdmin)}
          />
          <span className="rating-total-number">({totalRatings})</span>
        </div>
        </Tooltip>
      )}
    </div>
  );
};

export default Rating;
