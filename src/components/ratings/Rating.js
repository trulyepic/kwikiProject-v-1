import { useEffect, useState } from "react";
import { addRating, getAverageRating, getTotalRatings } from "../../api/api";
import { Button, message, Rate } from "antd";
import "./Rating.css";

const Rating = ({ seriesId }) => {
  const [userRating, setUserRating] = useState(0); // User's selected rating
  const [loading, setLoading] = useState(true);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const avgRating = await getAverageRating(seriesId); // Fetch average rating
        const count = await getTotalRatings(seriesId); // Fetch total ratings count
        setUserRating(avgRating || 0);
        setTotalRatings(count || 0);
      } catch (error) {
        message.error("Failed to fetch average rating.");
        console.error("Failed to fetch average rating.");
      } finally {
        setLoading(false);
      }
    };

    fetchAverageRating();
  }, [seriesId]);

  const handleRatingChange = async (value) => {
    try {
      setUserRating(value);
      await addRating(seriesId, value); // Submit the rating automatically
      const avgRating = await getAverageRating(seriesId); // Refresh the average rating if needed
      const count = await getTotalRatings(seriesId); // Refresh total ratings count
      setUserRating(avgRating || 0); // Update displayed rating
      setTotalRatings(count || 0); // Update total ratings count
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
        <div>
          <Rate
            allowHalf
            value={userRating}
            style={{ color: "white" }}
            tooltips={descriptions}
            onChange={handleRatingChange}
          />
          <span className="rating-total-number">({totalRatings})</span>
        </div>
      )}
    </div>
  );
};

export default Rating;
