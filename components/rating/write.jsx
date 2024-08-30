import { useState } from "react";
import { useRouter } from "next/navigation";
import Stars from "./stars";

const WriteReview = ({ Id }) => {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [result, setResult] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (rating === 0 || feedback.length === 0) {
      setResult("Please rate the hall!");
      setTimeout(() => {
        setResult("");
      }, 3000);

      return;
    }

    setSubmitting(true);

    const data = { Id, rating, feedback };

    try {
      const res = await fetch("/api/review/new", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (res.status === 404) {
        router.push("/signin");
      } else if (res.status === 200) {
        setResult("Done!!");
        setTimeout(() => {
          setResult("");
        }, 5000);
      }
    } catch (error) {
      setResult(error.message || "Error :(");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRating = (rating) => {
    setRating(rating);
  };

  return (
    <div>
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >
        <div className="relative">
          <textarea
            placeholder="Give your Feedback"
            value={feedback}
            rows={8}
            onChange={(event) => setFeedback(event.target.value)}
            className="p-3 w-full outline rounded-xl resize-none"
            required
          />
          <div className="absolute top-3 right-3">
            <Stars onRatingChange={handleRating} />
          </div>
          {submitting ? (
            <div className="absolute right-0 bottom-0 m-3 text-md">
              Submitting...
            </div>
          ) : result ? (
            <div className="absolute right-0 bottom-0 p-2 border-2 border-black text-lg rounded-md  m-3 text-md">
              {result}
            </div>
          ) : (
            <button
              type="submit"
              className="absolute right-0 bottom-0 m-3 text-lg text-white bg-black p-2 rounded-md cursor-pointer"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default WriteReview;
