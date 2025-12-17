export default function PageDescription({ title, description, descriptionEng }) {
  return (
    <>
      <h1 className="text-4xl pb-4">{title}</h1>
      <p className="pb-4 text-sm">{description}</p>
      <p className="text-emerald-200 text-sm">{descriptionEng}</p>
    </>
  );
}
