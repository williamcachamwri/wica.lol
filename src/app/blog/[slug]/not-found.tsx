import Link from "next/link";
import TransitionWrapper from "~/components/utils/TransitionWrapper";

export default function BlogNotFound() {
  return (
    <TransitionWrapper>
      <div className="container mx-auto px-4 py-16 text-center min-h-screen flex flex-col items-center justify-center">
        <div className="relative">
          {/* Cosmic background effect */}
          <div className="absolute -inset-10 bg-gradient-radial from-green-300/10 to-transparent rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDuration: '4s' }} />
          
          <h1 className="text-5xl font-bold mb-6 text-white relative inline-block">
            404 - Blog Not Found
            <div className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-green-300/0 via-green-300 to-green-300/0 animate-pulse" style={{ animationDuration: '3s' }} />
          </h1>
          
          <p className="text-xl mb-10 text-gray-300 max-w-lg mx-auto">
            The blog post you're looking for has drifted into another dimension or doesn't exist yet.
          </p>
          
          <Link 
            href="/blog" 
            className="px-6 py-3 bg-transparent border border-green-300/50 text-green-300 rounded-lg hover:bg-green-300/10 transition-all duration-300 inline-flex items-center group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </span>
            
            {/* Shine effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </Link>
        </div>
      </div>
    </TransitionWrapper>
  );
}