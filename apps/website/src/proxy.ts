import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const acceptHeader = request.headers.get('accept');
  
  if (acceptHeader && acceptHeader.includes('text/markdown')) {
    const url = request.nextUrl.clone();
    
    // Create headers for internal fetch to avoid infinite loops
    const headers = new Headers(request.headers);
    headers.set('accept', 'text/html');
    
    try {
      const response = await fetch(url.toString(), {
        headers,
        redirect: 'follow',
      });
      
      if (!response.ok) {
        return new NextResponse(`Error fetching page: ${response.status}`, { status: response.status });
      }
      
      const html = await response.text();
      const markdown = htmlToMarkdown(html);
      
      return new NextResponse(markdown, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'X-Markdown-Tokens': 'supported',
          'Link': '</docs>; rel="service-doc"',
        },
      });
    } catch (err) {
      return new NextResponse(`Error converting to markdown: ${err}`, { status: 500 });
    }
  }
  
  const response = NextResponse.next();
  response.headers.set('Link', '</docs>; rel="service-doc"');
  return response;
}

// Simple config to apply to all routes except api, static assets, etc.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - brand-logo.png, sw.js, manifest files etc. (common static files in public)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.json|sw\\.js|.*\\.txt).*)',
  ],
};

function htmlToMarkdown(html: string): string {
  // Strip head, scripts, styles, svg
  let md = html.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
  md = md.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  md = md.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  md = md.replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, '');
  md = md.replace(/<!--[\s\S]*?-->/g, '');

  // Convert headings
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n');
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n');
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n');
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n#### $1\n');

  // Convert links
  md = md.replace(/<a[^>]*href=(['"])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi, (match, q, href, text) => {
    // Clean text of inner tags
    const cleanText = text.replace(/<[^>]+>/g, '').trim();
    if (!cleanText) return '';
    return ` [${cleanText}](${href}) `;
  });

  // Convert strong/bold
  md = md.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**');
  
  // Convert lists
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '\n- $1');
  
  // Remove all other HTML tags
  md = md.replace(/<[^>]+>/g, '');

  // Decode basic HTML entities
  md = md.replace(/&nbsp;/gi, ' ')
         .replace(/&amp;/gi, '&')
         .replace(/&quot;/gi, '"')
         .replace(/&#x27;/gi, "'")
         .replace(/&apos;/gi, "'")
         .replace(/&lt;/gi, '<')
         .replace(/&gt;/gi, '>');

  // Clean up extra spaces/newlines
  md = md.replace(/\n\s*\n\s*\n+/g, '\n\n');
  md = md.trim();

  return md;
}
