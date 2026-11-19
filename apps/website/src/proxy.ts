import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AGENT_LINK_HEADER =
  '</docs>; rel="service-doc", </llms.txt>; rel="alternate"; type="text/plain", </llms-full.txt>; rel="alternate"; type="text/plain", </.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"';

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
        return new NextResponse(`Error fetching page: ${response.status}`, {
          status: response.status,
          headers: { 'Vary': 'Accept' },
        });
      }

      const html = await response.text();
      const markdown = htmlToMarkdown(html);

      return new NextResponse(markdown, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept',
          'X-Markdown-Tokens': 'supported',
          'Link': AGENT_LINK_HEADER,
        },
      });
    } catch (err) {
      return new NextResponse(`Error converting to markdown: ${err}`, {
        status: 500,
        headers: { 'Vary': 'Accept' },
      });
    }
  }

  const response = NextResponse.next();
  response.headers.set('Link', AGENT_LINK_HEADER);
  response.headers.append('Vary', 'Accept');
  return response;
}

// Apply to HTML routes only — skip API, Next internals, static assets, sitemap, service workers, and .well-known
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|\\.well-known|downloads|favicon\\.ico|sitemap\\.xml|robots\\.txt|llms(?:-full)?\\.txt|sw\\.js|workbox-.*\\.js|.*\\.(?:png|jpg|jpeg|webp|svg|ico|json|txt|xml|woff2|dmg|exe)).*)',
  ],
};

function htmlToMarkdown(html: string): string {
  // Prefer <main> content when present so LLMs get clean content without nav/footer boilerplate
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  let md = mainMatch ? mainMatch[1] : html;

  // Strip head, nav, footer, scripts, styles, svg, comments
  md = md.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
  md = md.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '');
  md = md.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
  md = md.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  md = md.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  md = md.replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, '');
  md = md.replace(/<!--[\s\S]*?-->/g, '');

  // Convert headings
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n\n# $1\n\n');
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n\n## $1\n\n');
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n\n### $1\n\n');
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n\n#### $1\n\n');

  // Convert FAQ <summary> tags cleanly
  md = md.replace(/<summary[^>]*>([\s\S]*?)<\/summary>/gi, '\n\n### $1\n');

  // Convert links
  md = md.replace(/<a[^>]*href=(['"])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi, (_match, _q, href, text) => {
    const cleanText = text.replace(/<[^>]+>/g, '').trim();
    if (!cleanText || href === '#') return cleanText;
    return ` [${cleanText}](${href}) `;
  });

  // Convert strong/bold and paragraphs/breaks
  md = md.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**');
  md = md.replace(/<br\s*\/?>/gi, '\n');
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '\n- $1');
  md = md.replace(/<\/(p|div|section|header|article|details|tr)>/gi, '\n\n');

  // Remove remaining HTML tags
  md = md.replace(/<[^>]+>/g, '');

  // Decode basic HTML entities
  md = md
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#x27;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&rarr;/gi, '->')
    .replace(/&mdash;/gi, '—')
    .replace(/&copy;/gi, '©');

  // Normalize whitespace
  md = md.replace(/[ \t]+\n/g, '\n');
  md = md.replace(/\n[ \t]+/g, '\n');
  md = md.replace(/\n{3,}/g, '\n\n').trim();

  if (titleMatch && !md.startsWith('# ')) {
    const cleanTitle = titleMatch[1].replace(/<[^>]+>/g, '').trim();
    if (cleanTitle) {
      md = `# ${cleanTitle}\n\n${md}`;
    }
  }

  return md;
}
