import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, MessageCircle, Send, X } from 'lucide-react';
import { useToast } from './Toast';
import { useUserStore } from '../store/useStore';

export default function ReviewSection({ product }) {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [helpful, setHelpful] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [questions, setQuestions] = useState([
    { id: 1, user: "Alex M.", question: "Is this compatible with iPhone 15?", answer: "Yes, it works great with iPhone 15!", answeredBy: "Product Expert", date: "2 days ago", upvotes: 12 },
    { id: 2, user: "Jamie R.", question: "How long does the battery last?", answer: "I get about 6-7 hours of continuous use.", answeredBy: "Verified Buyer", date: "1 week ago", upvotes: 8 },
    { id: 3, user: "Sam K.", question: "Does it come with a warranty?", answer: null, answeredBy: null, date: "3 days ago", upvotes: 3 },
  ]);
  const [newQuestion, setNewQuestion] = useState('');
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const user = useUserStore(s => s.user);
  const toast = useToast();

  const reviews = [
    { id: 1, user: "John D.", rating: 5, title: "Excellent product!", body: "I've been using this for a few weeks and it exceeds expectations. Build quality is outstanding.", date: "March 15, 2024", verified: true, helpful: 24 },
    { id: 2, user: "Sarah M.", rating: 4, title: "Great value for money", body: "Really solid product. The quality is impressive for the price. Only giving 4 stars because packaging could be better.", date: "March 10, 2024", verified: true, helpful: 18 },
    { id: 3, user: "Mike R.", rating: 5, title: "Perfect!", body: "Exactly what I was looking for. Fast shipping, great packaging, works flawlessly.", date: "March 5, 2024", verified: true, helpful: 15 },
    { id: 4, user: "Lisa T.", rating: 3, title: "Good but not great", body: "It works fine for basic use, but I expected a bit more at this price point. Still decent overall.", date: "February 28, 2024", verified: false, helpful: 7 },
  ];

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!rating || !title || !body) {
      toast('Please fill in all required fields', 'error');
      return;
    }
    setSubmitted(true);
    setShowForm(false);
    toast('Review submitted! Thank you for your feedback.');
  };

  const handleHelpful = (reviewId, type) => {
    if (helpful[reviewId]) return;
    setHelpful(prev => ({ ...prev, [reviewId]: type }));
    toast('Thanks for your feedback!');
  };

  const handleAskQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setQuestions(prev => [...prev, {
      id: Date.now(),
      user: user?.name || 'Anonymous',
      question: newQuestion,
      answer: null,
      answeredBy: null,
      date: 'Just now',
      upvotes: 0,
    }]);
    setNewQuestion('');
    setShowQuestionForm(false);
    toast('Question submitted!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 border-t">
      {/* Reviews Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary text-sm flex items-center gap-2"
          >
            <Star size={14} /> Write a Review
          </button>
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="card p-6 mb-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Write Your Review</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Your Rating *</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1"
                    >
                      <Star
                        size={28}
                        fill={star <= (hoverRating || rating) ? '#FFA41C' : 'none'}
                        stroke="#FFA41C"
                        className="transition-transform hover:scale-110"
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Review Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="input-field"
                  placeholder="Summarize your experience"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Your Review *</label>
                <textarea
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  className="input-field h-32 resize-none"
                  placeholder="Tell others about your experience with this product..."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="input-field"
                  placeholder="Display name (optional)"
                />
              </div>
              <button type="submit" className="btn-cart flex items-center justify-center gap-2">
                <Send size={16} /> Submit Review
              </button>
            </form>
          </div>
        )}

        {submitted && (
          <div className="card p-4 mb-6 bg-green-50 border border-green-200">
            <p className="text-sm text-green-700">✅ Your review has been submitted and will appear shortly.</p>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="card p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {review.user[0]}
                </div>
                <span className="text-sm font-medium">{review.user}</span>
                {review.verified && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Verified Purchase</span>
                )}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} size={14} fill={s <= review.rating ? '#FFA41C' : 'none'} stroke="#FFA41C" />
                  ))}
                </div>
                <span className="text-sm font-bold">{review.title}</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Reviewed on {review.date}</p>
              <p className="text-sm text-gray-700 mb-3">{review.body}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-500">{review.helpful + (helpful[review.id] === 'up' ? 1 : 0)} people found this helpful</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleHelpful(review.id, 'up')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs transition-colors ${
                      helpful[review.id] === 'up' ? 'bg-green-100 border-green-300 text-green-700' : 'hover:bg-gray-100'
                    }`}
                    disabled={!!helpful[review.id]}
                  >
                    <ThumbsUp size={12} /> Helpful
                  </button>
                  <button
                    onClick={() => handleHelpful(review.id, 'down')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs transition-colors ${
                      helpful[review.id] === 'down' ? 'bg-red-100 border-red-300 text-red-700' : 'hover:bg-gray-100'
                    }`}
                    disabled={!!helpful[review.id]}
                  >
                    <ThumbsDown size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Q&A Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Questions & Answers</h2>
          <button
            onClick={() => setShowQuestionForm(!showQuestionForm)}
            className="btn-primary text-sm flex items-center gap-2"
          >
            <MessageCircle size={14} /> Ask a Question
          </button>
        </div>

        {showQuestionForm && (
          <div className="card p-6 mb-6 animate-fade-in">
            <form onSubmit={handleAskQuestion} className="flex gap-2">
              <input
                type="text"
                value={newQuestion}
                onChange={e => setNewQuestion(e.target.value)}
                className="input-field flex-1"
                placeholder="Ask a question about this product..."
              />
              <button type="submit" className="btn-cart whitespace-nowrap">Submit</button>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {questions.map(q => (
            <div key={q.id} className="card p-5">
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-gray-900">Q: {q.question}</span>
                </div>
                <p className="text-xs text-gray-500">Asked by {q.user} · {q.date}</p>
              </div>

              {q.answer ? (
                <div className="bg-gray-50 rounded-lg p-4 ml-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-900">A: {q.answer}</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Answered by <span className="font-medium text-blue-600">{q.answeredBy}</span>
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic ml-4">No answers yet</p>
              )}

              <div className="mt-2 flex items-center gap-2">
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors">
                  <ThumbsUp size={12} /> {q.upvotes}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
