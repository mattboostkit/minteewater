import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      rating: 5,
      text: "Mintee has become my go-to after meals. The peppermint is refreshing and really helps with digestion. Love that it's zero calories too!",
      author: "Sarah M., London"
    },
    {
      rating: 5,
      text: "As someone who suffers from occasional digestive issues, Mintee has been a game-changer. Much more convenient than brewing tea!",
      author: "James T., Manchester"
    },
    {
      rating: 5,
      text: "I love that Mintee is sustainably sourced and the packaging is recyclable. Tastes great and I feel good about my purchase!",
      author: "Emma R., Birmingham"
    }
  ];

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex text-yellow-400">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`w-5 h-5 ${star <= rating ? 'fill-current' : ''}`} />
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="gazpacho-black text-4xl md:text-5xl text-green-800 mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of happy customers who've made Mintee part of their daily wellness routine.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-green-50 p-6 rounded-2xl">
              <div className="flex items-center mb-4">
                <StarRating rating={testimonial.rating} />
              </div>
              <p className="text-gray-700 mb-4">
                "{testimonial.text}"
              </p>
              <p className="text-green-700 font-semibold">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
