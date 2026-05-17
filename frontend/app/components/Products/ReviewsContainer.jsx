"use client";

import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Star, Loader2, Trash2, MessageSquareText } from "lucide-react";
import { postReview, deleteReview } from "../../store/slices/productSlice";

const ReviewsContainer = ({ product, productReviews = [] }) => {
  const { authUser } = useSelector(state => state.auth);
  const { isReviewDeleting, isPostingReview } = useSelector(state => state.product);
  const dispatch = useDispatch();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    dispatch(postReview({ productId: product.id, review: { rating, comment } }));
    setComment("");
    setRating(5);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-black text-foreground flex items-center gap-4">
          Customer Reviews
          <span className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full">
            {productReviews.length}
          </span>
        </h3>
      </div>

      {/* Create Review Form */}
      {authUser ? (
        <form onSubmit={handleReviewSubmit} className="bg-secondary/20 p-8 rounded-3xl border border-border/50 shadow-xl backdrop-blur-sm space-y-6">
          <div>
            <h4 className="text-xl font-bold text-foreground tracking-tight mb-2">Share Your Experience</h4>
            <p className="text-sm text-foreground/50">Your feedback helps others make better choices.</p>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/40 block mb-3">Overall Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-2 transition-all hover:scale-110 active:scale-95`}
                >
                  <Star size={32} className={`transition-colors ${star <= rating ? "fill-primary text-primary" : "text-foreground/20 fill-foreground/10"}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/40 block mb-3">Your Review</label>
            <textarea
              value={comment}
              placeholder="Write something descriptive..."
              rows={4}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-5 bg-background border border-border/50 rounded-2xl text-sm font-medium text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 resize-none transition-all placeholder:text-foreground/30"
            />
          </div>

          <button
            type="submit"
            disabled={isPostingReview || !comment.trim()}
            className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-2xl font-bold tracking-wide shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all disabled:bg-secondary disabled:text-foreground/40 disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isPostingReview ? <Loader2 className="w-5 h-5 animate-spin" /> : <MessageSquareText className="w-5 h-5" />}
            {isPostingReview ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      ) : (
        <div className="bg-secondary/20 p-8 rounded-3xl border border-border/50 flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-4 rounded-full bg-background border border-border/50 text-foreground/40"><MessageSquareText size={24} /></div>
          <div>
            <h4 className="text-lg font-bold text-foreground">Log in to review</h4>
            <p className="text-sm text-foreground/50">You must be logged in to leave a review.</p>
          </div>
        </div>
      )}

      {/* Existing Reviews */}
      {productReviews.length > 0 ? (
        <div className="space-y-6">
          {productReviews.map((review) => (
            <div key={review.review_id} className="group bg-background border border-border/50 p-6 rounded-3xl transition-transform hover:-translate-y-1 shadow-lg shadow-black/5">
              <div className="flex items-start gap-4">

                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-secondary border border-border border-dashed flex-shrink-0">
                  <img
                    src={review.reviewer?.avatar?.url || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&q=80"}
                    alt={review.reviewer?.name || "User"}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h4 className="font-bold text-foreground text-lg truncate">
                      {review.reviewer?.name || "Anonymous User"}
                    </h4>
                    <div className="flex items-center bg-secondary/50 px-3 py-1.5 rounded-full w-fit">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? "fill-primary text-primary" : "text-foreground/20 fill-foreground/10"} />
                      ))}
                    </div>
                  </div>

                  <p className="text-foreground/70 leading-relaxed text-sm">
                    {review.comment}
                  </p>

                  {authUser?.id === review.reviewer?.id && (
                    <button
                      onClick={() => dispatch(deleteReview({ productId: product.id, reviewId: review.review_id }))}
                      disabled={isReviewDeleting}
                      className="mt-6 flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50 text-xs font-bold uppercase tracking-wider"
                    >
                      {isReviewDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border/50 rounded-3xl bg-secondary/10">
          <Star size={40} className="text-foreground/20 mb-4" />
          <h4 className="text-lg font-bold text-foreground mb-1">No Reviews Yet</h4>
          <p className="text-sm text-foreground/50">Be the first to share your thoughts on this product!</p>
        </div>
      )}

    </div>
  );
};

export default ReviewsContainer;
