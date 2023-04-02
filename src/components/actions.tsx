import { ButtonLink } from "./button-link";

export interface ActionsProps {
  actions: Array<{
    title: string;
    description: string;
    link: {
      href: string;
      title: string;
    };
  }>;
}
export function Actions({ actions }: ActionsProps) {
  return (
    <div className="bg-gray-100 border-black border-t-2 p-16">
      <div className="flex justify-center gap-8 m-auto">
        {actions.map(({ title, description, link }) => {
          return (
            <div
              key={title}
              className="flex-shrink-0 max-w-md bg-white border-gray-200 border-2 p-8 rounded-sm flex flex-col gap-8"
            >
              <div>
                <div className="text-lg font-bold">{title}</div>
                <div>{description}</div>
              </div>
              <ButtonLink href={link.href} variant="inverse">
                {link.title}
              </ButtonLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}
