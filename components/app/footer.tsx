import config from "@/config/config";

export default function Footer() {
  return (
    <h2 className="my-10 text-black dark:text-zinc-400 text-center">
      {config.footer}
    </h2>
  );
}
