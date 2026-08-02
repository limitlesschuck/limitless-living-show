import showConfig from "@/show.config";

export default function SiteLogo() {
  const [first, ...rest] = showConfig.showNameShort.split(" ");
  return (
    <span className="text-xl font-extrabold tracking-tight text-white">
      {first}{" "}
      <span className="text-brand-gold">{rest.join(" ")}</span>
    </span>
  );
}
