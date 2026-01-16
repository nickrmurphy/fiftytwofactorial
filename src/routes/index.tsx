import { getCount } from "@/data/count";
import { createFileRoute } from "@tanstack/react-router";
import { useCounter } from "@/hooks/use-counter";
import { Button } from "@/components/button";
import { Count } from "@/components/count";
import { Paragraph, Title } from "@/components/content";
import { factorialBig, formatNumber } from "@/utils";
import { Progress } from "@/components/progress";

const FIFTY_TWO_FACTORIAL = factorialBig(52n);
const FIFTY_TWO_FACTORIAL_STRING = `+${formatNumber(FIFTY_TWO_FACTORIAL)}.`;

const LEADING_PARAGRAPHS: string[] = [
  "Ever shuffled a deck of cards? You've likely created an order that's **never existed before. Anywhere. Ever.**",
  "Seriously.",
  "The number of ways to arrange 52 cards is so mind-bogglingly vast that every thorough shuffle is almost certainly a cosmic first. It's a number with 68 digits!",
  "To be precise...",
];

const TRAILING_PARAGRAPHS: string[] = [
  "Imagine the Roman Colosseum, packed with 60,000 people. Every person has a button. Each time someone presses their button, a shared counter ticks up by one. If everyone presses their button once per second—nonstop—it would still take 426,275,659 × 10^55 years to count all the way to 52 factorial.",
  "Don't believe it? Go ahead and try!",
];

export const Route = createFileRoute("/")({ component: App, loader: () => getCount() });

function App() {
  return (
    <main className="mb-36 max-w-5xl mx-auto">
      <Title>Shuffle a deck. Make history.</Title>
      {LEADING_PARAGRAPHS.map((p, index) => (
        <Paragraph key={index}>{p}</Paragraph>
      ))}
      <p className="text-center text-4xl py-4 leading-13 mx-auto wrap-anywhere font-mono w-[4ch] flex flex-col text-wrap  justify-center items-center">
        {FIFTY_TWO_FACTORIAL_STRING}
      </p>
      {TRAILING_PARAGRAPHS.map((p, index) => (
        <Paragraph key={index}>{p}</Paragraph>
      ))}
      <Counter />
    </main>
  );
}

function Counter() {
  const { count: initialCount } = Route.useLoaderData();
  const { count, increment } = useCounter(initialCount);

  return (
    <div className="fixed bottom-4 inset-x-4 lg:inset-x-[calc(50%-28rem)] bg-slate-900/80 border space-y-3 border-slate-200/10 backdrop-blur-lg rounded-2xl p-2.5">
      <Progress count={BigInt(count)} total={FIFTY_TWO_FACTORIAL} />
      <div className="flex justify-between">
        <div className="flex items-center justify-center pl-2">
          <Count count={count} />
        </div>
        <div className="flex justify-center">
          <Button onClick={increment}>Click me</Button>
        </div>
      </div>
    </div>
  );
}
