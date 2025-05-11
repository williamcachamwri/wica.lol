"use client";

export default function BlogStyles() {
  return (
    <style jsx global>{`
      /* Ultra-enhanced markdown content styling with futuristic design */
      .mdx-content {
        position: relative;
        z-index: 1;
        perspective: 1000px;
      }
      
      /* Heading effect - simplified hover */
      .mdx-content h2 {
        font-size: 2.5rem;
        margin-top: 3.5rem;
        margin-bottom: 1.75rem;
        font-weight: 800;
        color: #f9fafb;
        position: relative;
        display: inline-block;
        text-shadow: 0 0 15px rgba(134, 239, 172, 0.3);
        transition: all 0.3s ease;
        letter-spacing: -0.02em;
      }
      
      .mdx-content h2:hover {
        text-shadow: 0 0 20px rgba(134, 239, 172, 0.5);
        color: #fff;
        transform: translateY(-2px);
      }
      
      .mdx-content h2::after {
        content: '';
        position: absolute;
        bottom: -0.7rem;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, 
          rgba(52, 211, 153, 0), 
          rgba(52, 211, 153, 0.8), 
          rgba(52, 211, 153, 0)
        );
        border-radius: 2px;
        transition: all 0.3s ease;
      }
      
      .mdx-content h2:hover::after {
        height: 3px;
        background: linear-gradient(90deg, 
          rgba(52, 211, 153, 0), 
          rgba(134, 239, 172, 1), 
          rgba(52, 211, 153, 0)
        );
        box-shadow: 0 0 10px rgba(52, 211, 153, 0.3);
        width: 120%;
        left: -10%;
      }
      
      /* Subheading style - simplified hover */
      .mdx-content h3 {
        font-size: 1.85rem;
        margin-top: 2.5rem;
        margin-bottom: 1.25rem;
        font-weight: 700;
        color: #e5e7eb;
        position: relative;
        display: inline-block;
        padding-left: 1.2rem;
        border-left: 3px solid rgba(52, 211, 153, 0.7);
        transition: all 0.3s ease;
        letter-spacing: -0.01em;
      }
      
      .mdx-content h3:hover {
        color: #fff;
        border-left-color: rgba(134, 239, 172, 1);
        padding-left: 1.5rem;
        transform: translateX(5px);
      }
      
      .mdx-content h3::before {
        content: '//';
        position: absolute;
        left: -2.5rem;
        color: rgba(52, 211, 153, 0.7);
        font-weight: 400;
        opacity: 0.8;
        transition: all 0.3s ease;
      }
      
      .mdx-content h3:hover::before {
        color: rgba(134, 239, 172, 1);
        transform: translateX(-5px);
      }
      
      /* Paragraph styling - simplified hover */
      .mdx-content p {
        margin-bottom: 1.75rem;
        line-height: 1.9;
        color: #d1d5db;
        position: relative;
        transition: all 0.3s ease;
        padding: 0.1rem 0;
      }
      
      .mdx-content p:hover {
        color: #f9fafb;
        transform: translateY(-1px);
      }
      
      /* Link styling - simplified hover */
      .mdx-content a {
        color: #86efac;
        text-decoration: none;
        position: relative;
        transition: all 0.3s ease;
        padding: 0 0.2rem;
        z-index: 1;
        font-weight: 500;
      }
      
      .mdx-content a::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 1px;
        background: rgba(134, 239, 172, 0.5);
        transform: scaleX(0);
        transform-origin: bottom right;
        transition: transform 0.3s ease;
      }
      
      .mdx-content a:hover {
        color: #4ade80;
        text-shadow: 0 0 8px rgba(134, 239, 172, 0.5);
      }
      
      .mdx-content a:hover::after {
        transform: scaleX(1);
        transform-origin: bottom left;
        height: 2px;
        background: linear-gradient(90deg, 
          rgba(134, 239, 172, 0.3), 
          rgba(134, 239, 172, 0.8), 
          rgba(134, 239, 172, 0.3)
        );
      }
      
      /* List styling - simplified hover */
      .mdx-content ul, .mdx-content ol {
        margin-bottom: 1.75rem;
        padding-left: 1.75rem;
        position: relative;
      }
      
      .mdx-content li {
        margin-bottom: 0.6rem;
        position: relative;
        transition: all 0.3s ease;
        padding-left: 0.5rem;
      }
      
      .mdx-content li:hover {
        color: #f9fafb;
        transform: translateX(5px);
      }
      
      /* Bullet points - simplified hover */
      .mdx-content ul {
        list-style-type: none;
        padding-left: 1.75rem;
      }
      
      .mdx-content ul li {
        position: relative;
      }
      
      .mdx-content ul li::before {
        content: '';
        position: absolute;
        left: -1.4rem;
        top: 0.5rem;
        width: 0.6rem;
        height: 0.6rem;
        background: linear-gradient(135deg, #86efac, #4ade80);
        border-radius: 2px;
        transform: rotate(45deg);
        transition: all 0.3s ease;
      }
      
      .mdx-content ul li:hover::before {
        transform: rotate(135deg) scale(1.2);
        background: linear-gradient(135deg, #4ade80, #86efac);
        box-shadow: 0 0 8px rgba(134, 239, 172, 0.5);
      }
      
      /* Numbered lists - simplified hover */
      .mdx-content ol {
        counter-reset: custom-counter;
        list-style-type: none;
      }
      
      .mdx-content ol li {
        counter-increment: custom-counter;
        position: relative;
      }
      
      .mdx-content ol li::before {
        content: counter(custom-counter);
        position: absolute;
        left: -2.2rem;
        top: -0.1rem;
        color: rgba(52, 211, 153, 0.9);
        font-weight: 600;
        font-family: monospace;
        background: rgba(52, 211, 153, 0.1);
        border: 1px solid rgba(52, 211, 153, 0.4);
        border-radius: 6px;
        width: 1.7rem;
        height: 1.7rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
        transition: all 0.3s ease;
      }
      
      .mdx-content ol li:hover::before {
        background: rgba(52, 211, 153, 0.2);
        color: #86efac;
        border-color: rgba(134, 239, 172, 0.6);
        transform: scale(1.1) rotate(-3deg);
        box-shadow: 0 0 10px rgba(134, 239, 172, 0.3);
      }
      
      /* Code blocks - enhanced styling */
      .mdx-content pre {
        margin: 2.5rem 0;
        border-radius: 12px;
        overflow: hidden;
        position: relative;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        border: none;
        background: rgba(0, 0, 0, 0.2);
      }
      
      .mdx-content pre:hover {
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(134, 239, 172, 0.2);
        transform: translateY(-5px) scale(1.01);
      }
      
      .mdx-content pre::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, 
          rgba(134, 239, 172, 0), 
          rgba(134, 239, 172, 0.7), 
          rgba(134, 239, 172, 0)
        );
        z-index: 1;
        box-shadow: 0 0 15px rgba(134, 239, 172, 0.5);
      }
      
      .mdx-content pre::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, 
          rgba(134, 239, 172, 0), 
          rgba(134, 239, 172, 0.3), 
          rgba(134, 239, 172, 0)
        );
        z-index: 1;
      }
      
      .mdx-content pre code {
        display: block;
        padding: 1.5rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.95rem;
        line-height: 1.7;
        color: #e5e7eb;
        background-color: rgba(0, 0, 0, 0.7);
        transition: all 0.3s ease;
        text-shadow: 0 0 2px rgba(255, 255, 255, 0.1);
      }
      
      .mdx-content pre:hover code {
        color: #f9fafb;
        text-shadow: 0 0 3px rgba(255, 255, 255, 0.2);
      }
      
      /* Code header styling */
      .code-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 1rem;
        background: rgba(0, 0, 0, 0.8);
        border-bottom: 1px solid rgba(134, 239, 172, 0.2);
      }
      
      .code-language {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
        color: rgba(134, 239, 172, 0.8);
        font-weight: 500;
        letter-spacing: 0.05em;
      }
      
      .copy-button {
        background: transparent;
        border: none;
        color: rgba(134, 239, 172, 0.6);
        cursor: pointer;
        padding: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: all 0.2s ease;
      }
      
      .copy-button:hover {
        background: rgba(134, 239, 172, 0.1);
        color: rgba(134, 239, 172, 0.9);
      }
      
      .copy-button svg {
        width: 16px;
        height: 16px;
      }
      
      .copy-button .check-icon {
        display: none;
      }
      
      .copy-button.copied .copy-icon {
        display: none;
      }
      
      .copy-button.copied .check-icon {
        display: block;
        color: #4ade80;
      }
      
      /* Blockquotes - simplified hover */
      .mdx-content blockquote {
        margin: 2.5rem 0;
        padding: 1.5rem 1.75rem;
        border-left: 4px solid rgba(134, 239, 172, 0.5);
        background: rgba(134, 239, 172, 0.05);
        border-radius: 0 8px 8px 0;
        position: relative;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
      }
      
      .mdx-content blockquote:hover {
        background: rgba(134, 239, 172, 0.08);
        border-left-width: 5px;
        transform: translateX(5px);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2), 0 0 10px rgba(134, 239, 172, 0.1);
      }
      
      .mdx-content blockquote::before {
        content: '"';
        position: absolute;
        top: -0.5rem;
        left: 0.5rem;
        font-size: 3rem;
        color: rgba(134, 239, 172, 0.2);
        font-family: Georgia, serif;
        line-height: 1;
        transition: all 0.3s ease;
      }
      
      .mdx-content blockquote:hover::before {
        color: rgba(134, 239, 172, 0.3);
        transform: scale(1.1);
      }
      
      .mdx-content blockquote p {
        font-style: italic;
        color: #d1d5db;
        position: relative;
        z-index: 1;
      }
      
      /* Enhanced Tables - with better styling and hover effects */
      .mdx-content table {
        margin: 2.5rem 0;
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        overflow: hidden;
        border-radius: 12px;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3), 0 0 10px rgba(134, 239, 172, 0.1);
        position: relative;
        transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        border: 1px solid rgba(134, 239, 172, 0.2);
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
      }
      
      .mdx-content table:hover {
        box-shadow: 0 8px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(134, 239, 172, 0.2);
        border-color: rgba(134, 239, 172, 0.4);
        transform: translateY(-5px) scale(1.01);
      }
      
      /* Table header styling */
      .mdx-content thead {
        background: rgba(134, 239, 172, 0.1);
        position: relative;
      }
      
      .mdx-content thead::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, 
          rgba(134, 239, 172, 0.1), 
          rgba(134, 239, 172, 0.6), 
          rgba(134, 239, 172, 0.1)
        );
        z-index: 1;
      }
      
      .mdx-content th {
        color: #f9fafb;
        font-weight: 600;
        text-align: left;
        padding: 1.2rem 1.5rem;
        position: relative;
        transition: all 0.3s ease;
        font-size: 1rem;
        letter-spacing: 0.02em;
        border-bottom: none;
        text-shadow: 0 0 10px rgba(134, 239, 172, 0.3);
      }
      
      .mdx-content th:hover {
        color: #86efac;
        background: rgba(134, 239, 172, 0.08);
      }
      
      /* Table cell styling */
      .mdx-content td {
        padding: 1.2rem 1.5rem;
        border-bottom: 1px solid rgba(134, 239, 172, 0.1);
        transition: all 0.3s ease;
        position: relative;
        color: #d1d5db;
        font-size: 0.95rem;
      }
      
      /* Table row hover effect */
      .mdx-content tbody tr {
        transition: all 0.3s ease;
        position: relative;
      }
      
      .mdx-content tbody tr:hover {
        background: rgba(134, 239, 172, 0.05);
      }
      
      .mdx-content tbody tr:hover td {
        color: #f9fafb;
      }
      
      /* Last row styling */
      .mdx-content tbody tr:last-child td {
        border-bottom: none;
      }
      
      /* Alternating row colors */
      .mdx-content tbody tr:nth-child(even) {
        background: rgba(134, 239, 172, 0.02);
      }
      
      /* Table cell hover effect */
      .mdx-content td:hover {
        background: rgba(134, 239, 172, 0.08);
      }
      
      /* Table caption styling */
      .mdx-content table caption {
        margin-bottom: 1rem;
        font-style: italic;
        color: rgba(134, 239, 172, 0.7);
        text-align: center;
        font-size: 0.9rem;
      }
      
      /* Table border styling */
      .mdx-content table::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 12px;
        padding: 1px;
        background: linear-gradient(
          135deg, 
          rgba(134, 239, 172, 0.3) 0%, 
          rgba(134, 239, 172, 0.1) 50%, 
          rgba(134, 239, 172, 0.3) 100%
        );
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
        opacity: 0.5;
        transition: opacity 0.3s ease;
      }
      
      .mdx-content table:hover::before {
        opacity: 1;
      }
      
      /* Table responsive styling */
      @media (max-width: 768px) {
        .mdx-content table {
          display: block;
          overflow-x: auto;
          white-space: nowrap;
        }
        
        .mdx-content th, 
        .mdx-content td {
          padding: 1rem;
        }
      }
      
      /* Horizontal rule - simplified hover */
      .mdx-content hr {
        margin: 3rem 0;
        height: 1px;
        border: none;
        background: linear-gradient(90deg, 
          rgba(134, 239, 172, 0), 
          rgba(134, 239, 172, 0.5), 
          rgba(134, 239, 172, 0)
        );
        position: relative;
        transition: all 0.3s ease;
      }
      
      .mdx-content hr::before {
        content: '✧';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #000;
        padding: 0 1.5rem;
        color: rgba(134, 239, 172, 0.7);
        font-size: 1.2rem;
        transition: all 0.3s ease;
      }
      
      .mdx-content hr:hover::before {
        color: rgba(134, 239, 172, 0.9);
        transform: translate(-50%, -50%) rotate(180deg) scale(1.2);
        text-shadow: 0 0 10px rgba(134, 239, 172, 0.5);
      }
      
      /* Inline code - enhanced styling */
      .mdx-content code:not(pre code) {
        font-family: 'JetBrains Mono', monospace;
        background: rgba(134, 239, 172, 0.1);
        color: #86efac;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-size: 0.9em;
        border: 1px solid rgba(134, 239, 172, 0.2);
        transition: all 0.3s ease;
        margin: 0 0.2rem;
        white-space: nowrap;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      
      .mdx-content code:not(pre code):hover {
        background: rgba(134, 239, 172, 0.15);
        color: #4ade80;
        border-color: rgba(134, 239, 172, 0.4);
        transform: translateY(-1px);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 0 5px rgba(134, 239, 172, 0.2);
      }
      
      /* Image styling - simplified hover */
      .mdx-content img {
        border-radius: 8px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        max-width: 100%;
        height: auto;
        margin: 2.5rem 0;
        position: relative;
        border: 1px solid rgba(134, 239, 172, 0.1);
      }
      
      .mdx-content img:hover {
        transform: scale(1.02);
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(134, 239, 172, 0.2);
        border-color: rgba(134, 239, 172, 0.3);
      }
      
      /* Details/summary - simplified hover */
      .mdx-content details {
        margin: 2.5rem 0;
        border: 1px solid rgba(134, 239, 172, 0.2);
        border-radius: 8px;
        overflow: hidden;
        background: rgba(134, 239, 172, 0.03);
        transition: all 0.3s ease;
        position: relative;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
      }
      
      .mdx-content details:hover {
        background: rgba(134, 239, 172, 0.05);
        border-color: rgba(134, 239, 172, 0.4);
        transform: translateY(-3px);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15), 0 0 10px rgba(134, 239, 172, 0.1);
      }
      
      .mdx-content summary {
        padding: 1.25rem 1.5rem;
        cursor: pointer;
        position: relative;
        font-weight: 600;
        color: #e5e7eb;
        transition: all 0.3s ease;
        background: rgba(134, 239, 172, 0.05);
        border-bottom: 1px solid transparent;
        display: flex;
        align-items: center;
        outline: none;
      }
      
      .mdx-content summary::-webkit-details-marker,
      .mdx-content summary::marker {
        display: none;
      }
      
      .mdx-content summary:before {
        content: '▸';
        margin-right: 0.75rem;
        font-size: 1.2rem;
        color: rgba(134, 239, 172, 0.7);
        transition: all 0.3s ease;
        display: inline-block;
      }
      
      .mdx-content details[open] summary:before {
        transform: rotate(90deg);
      }
      
      .mdx-content summary:hover {
        color: #f9fafb;
        background: rgba(134, 239, 172, 0.08);
      }
      
      .mdx-content details[open] summary {
        border-bottom: 1px solid rgba(134, 239, 172, 0.2);
      }
      
      .mdx-content details > div {
        padding: 1.5rem;
        position: relative;
        z-index: 1;
        background: linear-gradient(to bottom, 
          rgba(134, 239, 172, 0.03),
          transparent
        );
      }
      
      /* Code block styling for mobile */
      .mdx-content pre {
        overflow-x: auto;
        white-space: pre-wrap;
        word-wrap: break-word;
        padding: 1rem;
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.8);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        margin: 1.5rem 0;
      }

      .mdx-content pre code {
        display: block;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9rem;
        line-height: 1.6;
        color: #e5e7eb;
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        .mdx-content pre {
          white-space: pre;
          overflow-x: scroll;
        }
      }
      
      /* Reduced motion preferences */
      @media (prefers-reduced-motion: reduce) {
        .mdx-content *, .mdx-content *::before, .mdx-content *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `}</style>
  );
}