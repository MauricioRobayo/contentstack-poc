import Image from "next/image";

export interface SpotlightProps {
  title: string;
  description: string;
  highlights: Array<{
    title: string;
    description: string;
    image: {
      url: string;
      dimensions: {
        width: number;
        height: number;
      };
    };
  }>;
}
export function Spotlight({ title, description, highlights }: SpotlightProps) {
  return (
    <div className="bg-gray-100 p-16">
      <div className="max-w-screen-lg m-auto text-center">
        <div className="text-4xl font-bold mb-4">{title}</div>
        <div>{description}</div>
        <div className="flex gap-8 mt-8">
          {highlights.map((highlight) => (
            <div key={highlight.title}>
              <Image
                src={highlight.image.url}
                alt={highlight.title}
                {...highlight.image.dimensions}
              />
              <div className="font-bold mt-4">{highlight.title}</div>
              <div className="text-sm">{highlight.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
