import config from "@/config";

export default function Footer() {
    return (
      <h2 className="my-10 text-zinc-400 text-center">{config.footer}</h2>
    )
}