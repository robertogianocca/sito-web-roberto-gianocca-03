export default function VideoLayout({ children }) {
  return (
    <div className="lg:h-dvh p-1 lg:p-10 flex flex-col lg:grid grid-cols-4 gap-10 border-4 border-red-500">
      {children}
    </div>
  );
}
