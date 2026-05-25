export async function generateStaticParams() {
  return [
    { lang: 'es' }
  ];
}

export default function LangLayout({ children }) {
  return <>{children}</>;
}
