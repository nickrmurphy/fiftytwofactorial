import Markdown from "react-markdown";

export function Title(props: { children: React.ReactNode }) {
  return (
    <h1 className="text-4xl text-center p-4 py-6 font-bold tracking-wider">{props.children}</h1>
  );
}

export function Paragraph(props: { children: string }) {
  return (
    <Markdown components={{ p: ({ children }) => <P>{children}</P> }}>{props.children}</Markdown>
  );
}

function P(props: { children: React.ReactNode }) {
  return <p className="text-base text-center px-4 py-2 leading-6">{props.children}</p>;
}
